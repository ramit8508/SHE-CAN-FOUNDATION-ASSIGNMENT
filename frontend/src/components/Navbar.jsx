import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Shield } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">S</div>
            <span className="navbar-brand-text">
              <span>She Can</span> Foundation
            </span>
          </Link>

          <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#mission">Mission</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="navbar-actions">
            <Link to="/admin/login" className="btn btn-outline btn-sm">
              <Shield size={14} />
              Admin
            </Link>
            <a href="#contact" className="btn btn-primary btn-sm">
              <Heart size={14} />
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
