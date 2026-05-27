const Loader = ({ size = 'sm', text }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div className={`spinner ${size === 'lg' ? 'spinner-lg' : ''}`} />
      {text && <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{text}</span>}
    </div>
  );
};

export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="page-loader">
    <div className="spinner spinner-lg" />
    <span>{text}</span>
  </div>
);

export default Loader;
