import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Inbox, LogOut, Trash2, Eye, X,
  ChevronLeft, ChevronRight, RefreshCw, Users, Mail,
  CheckCircle, MessageSquare, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { PageLoader } from '../components/Loader';

const STATUS_MAP = {
  new: { label: 'New', cls: 'badge-new' },
  read: { label: 'Read', cls: 'badge-read' },
  replied: { label: 'Replied', cls: 'badge-replied' },
};

const AdminDashboard = () => {
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState(null); // detail modal
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState('');

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const fetchSubmissions = useCallback(async (page = 1, status = filterStatus) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 8 });
      if (status) params.set('status', status);
      const { data } = await API.get(`/form/all?${params}`);
      setSubmissions(data.data);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchSubmissions(1, filterStatus); }, [filterStatus]);

  const handleStatusChange = async (id, status) => {
    setActionLoading(id + status);
    try {
      await API.patch(`/form/${id}/status`, { status });
      setSubmissions(prev =>
        prev.map(s => s._id === id ? { ...s, status } : s)
      );
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
      fetchSubmissions(pagination.page);
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setActionLoading('');
    }
  };

  const handleDelete = async (id) => {
    setActionLoading('del_' + id);
    try {
      await API.delete(`/form/${id}`);
      setDeleteId(null);
      setSelected(null);
      fetchSubmissions(pagination.page);
    } catch (err) {
      alert('Failed to delete.');
    } finally {
      setActionLoading('');
    }
  };

  const handleView = async (sub) => {
    setSelected(sub);
    if (sub.status === 'new') {
      handleStatusChange(sub._id, 'read');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div className="navbar-logo" style={{ width: 34, height: 34, fontSize: '0.9rem' }}>S</div>
          <div className="admin-sidebar-brand">
            She Can Foundation
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-item active">
            <LayoutDashboard size={17} />
            Dashboard
          </div>
          <div className="admin-nav-item">
            <Inbox size={17} />
            Submissions
            {stats.new > 0 && (
              <span style={{
                marginLeft: 'auto', background: 'var(--gradient-primary)',
                color: 'white', fontSize: '0.7rem', fontWeight: 700,
                borderRadius: '999px', padding: '1px 7px', minWidth: '20px', textAlign: 'center'
              }}>{stats.new}</span>
            )}
          </div>
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-lg)' }}>
          <div style={{
            background: 'rgba(192, 38, 211, 0.08)',
            border: '1px solid rgba(192, 38, 211, 0.15)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            marginBottom: '1rem',
          }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Signed in as</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-light)' }}>@{admin?.username}</p>
          </div>
          <button className="admin-nav-item" onClick={handleLogout} style={{ width: '100%', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar-title">Dashboard</h1>
            <p className="admin-topbar-subtitle">Manage all form submissions from She Can Foundation</p>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => fetchSubmissions(pagination.page)}
            id="refresh-btn"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          {[
            { label: 'Total Submissions', value: stats.total, icon: <Users size={20} />, cls: 'purple' },
            { label: 'New Messages', value: stats.new, icon: <Mail size={20} />, cls: 'blue' },
            { label: 'Read', value: stats.read, icon: <Eye size={20} />, cls: 'orange' },
            { label: 'Replied', value: stats.replied, icon: <CheckCircle size={20} />, cls: 'green' },
          ].map((s) => (
            <div key={s.label} className="admin-stat-card">
              <div className={`admin-stat-icon ${s.cls}`}>{s.icon}</div>
              <div>
                <div className="admin-stat-value">{s.value}</div>
                <div className="admin-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2 className="admin-table-title">
              <MessageSquare size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Form Submissions
            </h2>
            <div className="admin-filter-group">
              {['', 'new', 'read', 'replied'].map((s) => (
                <button
                  key={s || 'all'}
                  className={`admin-filter-btn ${filterStatus === s ? 'active' : ''}`}
                  onClick={() => setFilterStatus(s)}
                  id={`filter-${s || 'all'}`}
                >
                  {s ? STATUS_MAP[s].label : 'All'}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-table-wrap">
            {loading ? (
              <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
                <PageLoader text="Loading submissions..." />
              </div>
            ) : submissions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Inbox size={28} />
                </div>
                <h3 className="empty-state-title">No submissions yet</h3>
                <p className="empty-state-desc">Form submissions will appear here once users send messages.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub._id}>
                      <td className="td-name">{sub.name}</td>
                      <td className="td-email">{sub.email}</td>
                      <td className="td-message">{sub.message}</td>
                      <td>
                        <span className={`badge ${STATUS_MAP[sub.status].cls}`}>
                          {STATUS_MAP[sub.status].label}
                        </span>
                      </td>
                      <td className="td-date">{formatDate(sub.createdAt)}</td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn btn-ghost btn-sm"
                            title="View"
                            onClick={() => handleView(sub)}
                            id={`view-${sub._id}`}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            title="Mark Replied"
                            onClick={() => handleStatusChange(sub._id, 'replied')}
                            disabled={sub.status === 'replied' || actionLoading === sub._id + 'replied'}
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Delete"
                            onClick={() => setDeleteId(sub._id)}
                            id={`delete-${sub._id}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="admin-pagination">
              <p className="admin-pagination-info">
                Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </p>
              <div className="admin-pagination-btns">
                <button
                  className="pagination-btn"
                  disabled={pagination.page <= 1}
                  onClick={() => fetchSubmissions(pagination.page - 1)}
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`pagination-btn ${p === pagination.page ? 'active' : ''}`}
                    onClick={() => fetchSubmissions(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="pagination-btn"
                  disabled={pagination.page >= pagination.pages}
                  onClick={() => fetchSubmissions(pagination.page + 1)}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay animate-fade-in" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="detail-modal-card animate-scale-in">
            <div className="detail-modal-header">
              <div>
                <h2 className="detail-modal-title">Submission Details</h2>
                <span className={`badge ${STATUS_MAP[selected.status].cls}`} style={{ marginTop: 6, display: 'inline-flex' }}>
                  {STATUS_MAP[selected.status].label}
                </span>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="detail-field">
              <div className="detail-field-label">Full Name</div>
              <div className="detail-field-value">{selected.name}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Email Address</div>
              <div className="detail-field-value">{selected.email}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Message</div>
              <div className="detail-field-value">{selected.message}</div>
            </div>
            <div className="detail-field">
              <div className="detail-field-label">Submitted At</div>
              <div className="detail-field-value">{formatDate(selected.createdAt)}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {['new', 'read', 'replied'].map(s => (
                <button
                  key={s}
                  className={`btn btn-sm ${selected.status === s ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleStatusChange(selected._id, s)}
                  disabled={selected.status === s}
                >
                  Mark {STATUS_MAP[s].label}
                </button>
              ))}
              <button
                className="btn btn-danger btn-sm"
                style={{ marginLeft: 'auto' }}
                onClick={() => { setDeleteId(selected._id); setSelected(null); }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-card animate-scale-in" style={{ maxWidth: 380 }}>
            <div className="modal-icon-wrap" style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              <AlertCircle size={32} />
            </div>
            <h2 className="modal-title" style={{ fontSize: '1.2rem' }}>Confirm Delete</h2>
            <p className="modal-subtitle">This submission will be permanently deleted. This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => handleDelete(deleteId)}
                disabled={actionLoading === 'del_' + deleteId}
                id="confirm-delete-btn"
              >
                {actionLoading === 'del_' + deleteId ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
