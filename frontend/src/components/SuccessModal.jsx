import { CheckCircle, X, Sparkles } from 'lucide-react';

const SuccessModal = ({ onClose, submitterName }) => {
  return (
    <div className="modal-overlay animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card animate-scale-in">
        <div className="modal-glow" />

        <div className="modal-icon-wrap">
          <div className="modal-icon-ring" />
          <CheckCircle size={36} strokeWidth={1.5} />
        </div>

        <h2 className="modal-title">
          🎉 Form Submitted Successfully!
        </h2>

        <p className="modal-subtitle">
          Thank you, <strong style={{ color: 'var(--primary-light)' }}>{submitterName}</strong>!
          We've received your message and our team will get back to you shortly.
          Together we make a difference! 💜
        </p>

        <div style={{
          background: 'rgba(192, 38, 211, 0.06)',
          border: '1px solid rgba(192, 38, 211, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <Sparkles size={16} style={{ color: 'var(--primary-light)', flexShrink: 0 }} />
          Expect a response within 24–48 hours on business days.
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={onClose}>
          Close
        </button>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
