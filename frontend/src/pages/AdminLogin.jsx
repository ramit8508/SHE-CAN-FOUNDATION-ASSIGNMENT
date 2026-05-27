import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const AdminLogin = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    const result = await login(form.username, form.password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <div className="admin-login-logo-icon">
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>S</span>
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">She Can Foundation — Secure Access</p>
        </div>

        {error && (
          <div className="login-error-alert">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} id="admin-login-form">
          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-username">Username</label>
            <div className="form-input-wrapper">
              <input
                id="admin-username"
                name="username"
                type="text"
                className="form-input"
                placeholder="Enter admin username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <User size={16} className="form-input-icon" />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="form-input-wrapper">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                style={{ paddingRight: '2.8rem' }}
              />
              <Lock size={16} className="form-input-icon" />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{
            background: 'rgba(192, 38, 211, 0.06)',
            border: '1px solid rgba(192, 38, 211, 0.15)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 0.9rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
          }}>
            🔑 Default credentials: <strong style={{ color: 'var(--text-secondary)' }}>admin / admin123</strong>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={loading}
            id="admin-login-btn"
          >
            {loading ? <Loader size="sm" text="Signing in..." /> : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
