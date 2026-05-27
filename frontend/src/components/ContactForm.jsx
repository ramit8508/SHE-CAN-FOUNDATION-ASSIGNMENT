import { useState } from 'react';
import { User, Mail, MessageSquare, Send, AlertCircle } from 'lucide-react';
import API from '../api/axios';
import SuccessModal from './SuccessModal';
import Loader from './Loader';

const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required';
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  else if (!/^[a-zA-Z\s]+$/.test(fields.name)) errors.name = 'Name can only contain letters and spaces';

  if (!fields.email.trim()) errors.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = 'Please enter a valid email address';

  if (!fields.message.trim()) errors.message = 'Message is required';
  else if (fields.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  else if (fields.message.trim().length > 1000) errors.message = 'Message cannot exceed 1000 characters';

  return errors;
};

const ContactForm = () => {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate(fields);
    setErrors(prev => ({ ...prev, [name]: errs[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setLoading(true);
    setServerError('');

    try {
      await API.post('/form/submit', fields);
      setShowSuccess(true);
      setFields({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (name) => {
    let cls = 'form-input';
    if (touched[name] && errors[name]) cls += ' error';
    else if (touched[name] && fields[name] && !errors[name]) cls += ' success';
    return cls;
  };

  const msgLen = fields.message.length;

  return (
    <>
      <div className="form-card">
        <div className="form-card-header">
          <h3 className="form-card-title">Send Us a Message</h3>
          <p className="form-card-subtitle">We'd love to hear from you. Fill in the form below!</p>
        </div>

        {serverError && (
          <div className="login-error-alert" style={{ marginBottom: '1.25rem' }}>
            <AlertCircle size={16} />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate id="contact-form">
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name <span className="form-label-required">*</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="name"
                name="name"
                type="text"
                className={getInputClass('name')}
                placeholder="e.g. Priya Sharma"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
              />
              <User size={16} className="form-input-icon" />
            </div>
            {touched.name && errors.name && (
              <p className="form-error">
                <AlertCircle size={13} />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address <span className="form-label-required">*</span>
            </label>
            <div className="form-input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                className={getInputClass('email')}
                placeholder="e.g. priya@example.com"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              <Mail size={16} className="form-input-icon" />
            </div>
            {touched.email && errors.email && (
              <p className="form-error">
                <AlertCircle size={13} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message <span className="form-label-required">*</span>
            </label>
            <div className="form-input-wrapper">
              <textarea
                id="message"
                name="message"
                className={`${getInputClass('message')} form-textarea`}
                placeholder="Tell us how you'd like to get involved, or anything else you'd like to share..."
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
              />
              <MessageSquare size={16} className="form-input-icon form-textarea-icon" />
            </div>
            <p className={`form-char-count ${msgLen > 900 ? 'danger' : msgLen > 700 ? 'warning' : ''}`}>
              {msgLen} / 1000
            </p>
            {touched.message && errors.message && (
              <p className="form-error">
                <AlertCircle size={13} />
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={loading}
            id="submit-form-btn"
          >
            {loading ? (
              <Loader size="sm" text="Submitting..." />
            ) : (
              <>
                <Send size={17} />
                Submit Message
              </>
            )}
          </button>
        </form>
      </div>

      {showSuccess && (
        <SuccessModal
          submitterName={fields.name || 'Friend'}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
};

export default ContactForm;
