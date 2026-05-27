const { validationResult } = require('express-validator');
const FormSubmission = require('../models/FormSubmission');

// @desc    Submit contact form
// @route   POST /api/form/submit
// @access  Public
const submitForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email, message } = req.body;

  try {
    const submission = await FormSubmission.create({
      name,
      email,
      message,
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
    });

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully! We will get back to you soon.',
      data: {
        id: submission._id,
        name: submission.name,
        email: submission.email,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// @desc    Get all submissions (paginated)
// @route   GET /api/form/all
// @access  Private (Admin)
const getAllSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';
    const skip = (page - 1) * limit;

    const query = status ? { status } : {};

    const [submissions, total] = await Promise.all([
      FormSubmission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      FormSubmission.countDocuments(query),
    ]);

    // Count by status
    const [newCount, readCount, repliedCount] = await Promise.all([
      FormSubmission.countDocuments({ status: 'new' }),
      FormSubmission.countDocuments({ status: 'read' }),
      FormSubmission.countDocuments({ status: 'replied' }),
    ]);

    res.status(200).json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        new: newCount,
        read: readCount,
        replied: repliedCount,
      },
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching submissions.',
    });
  }
};

// @desc    Update submission status
// @route   PATCH /api/form/:id/status
// @access  Private (Admin)
const updateStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['new', 'read', 'replied'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be: new, read, or replied',
    });
  }

  try {
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: submission,
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating status.',
    });
  }
};

// @desc    Delete a submission
// @route   DELETE /api/form/:id
// @access  Private (Admin)
const deleteSubmission = async (req, res) => {
  try {
    const submission = await FormSubmission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting submission.',
    });
  }
};

// @desc    Get a single submission
// @route   GET /api/form/:id
// @access  Private (Admin)
const getSubmission = async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Auto-mark as read when viewed
    if (submission.status === 'new') {
      submission.status = 'read';
      await submission.save();
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching submission.',
    });
  }
};

module.exports = {
  submitForm,
  getAllSubmissions,
  updateStatus,
  deleteSubmission,
  getSubmission,
};
