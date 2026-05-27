const express = require('express');
const router = express.Router();
const {
  submitForm,
  getAllSubmissions,
  updateStatus,
  deleteSubmission,
  getSubmission,
} = require('../controllers/formController');
const { protect } = require('../middleware/authMiddleware');
const { validateFormSubmission } = require('../middleware/validateMiddleware');

// Public route
router.post('/submit', validateFormSubmission, submitForm);

// Protected admin routes
router.get('/all', protect, getAllSubmissions);
router.get('/:id', protect, getSubmission);
router.patch('/:id/status', protect, updateStatus);
router.delete('/:id', protect, deleteSubmission);

module.exports = router;
