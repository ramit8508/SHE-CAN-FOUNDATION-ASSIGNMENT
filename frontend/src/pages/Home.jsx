import { Heart, Users, BookOpen, Award, ArrowRight, Star, Zap, Globe } from 'lucide-react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const missionCards = [
  {
    icon: <BookOpen size={22} />,
    title: 'Education & Skills',
    desc: 'Providing access to quality education and vocational training to empower women with skills for a better tomorrow.',
  },
  {
    icon: <Users size={22} />,
    title: 'Community Support',
    desc: 'Building strong support networks where women uplift each other through mentorship, guidance, and shared experiences.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Leadership & Growth',
    desc: 'Nurturing confident leaders who challenge barriers and drive positive change in their families and communities.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Global Outreach',
    desc: 'Expanding our reach across India and beyond, creating a global sisterhood united by purpose and resilience.',
  },
  {
    icon: <Award size={22} />,
    title: 'Recognition',
    desc: 'Celebrating achievements of women who break barriers and inspire generations through awards and spotlights.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Health & Wellness',
    desc: 'Ensuring women have access to mental health support, wellness resources, and a safe nurturing environment.',
  },
];

const Home = () => {
  return (
    <main>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-glow" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />

        <div className="container">
          <div className="hero-content">
            {/* Left */}
            <div>
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                Empowering Women Since 2010
              </div>

              <h1 className="hero-title">
                She Can.{' '}
                <span className="line-accent">She Will.</span>{' '}
                She Does.
              </h1>

              <p className="hero-description">
                She Can Foundation is dedicated to empowering women through education,
                mentorship, and community support — helping every woman discover her
                true potential and build the life she deserves.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary btn-lg">
                  <Heart size={18} />
                  Get Involved
                </a>
                <a href="#mission" className="btn btn-outline btn-lg">
                  Our Mission
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">10K+</span>
                  <span className="hero-stat-label">Women Empowered</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">50+</span>
                  <span className="hero-stat-label">Cities Reached</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">14</span>
                  <span className="hero-stat-label">Years of Impact</span>
                </div>
              </div>
            </div>

            {/* Right - Visual Card */}
            <div className="hero-visual">
              <div className="hero-card-stack">
                <div className="hero-main-card">
                  <div className="hero-card-icon">
                    <Heart size={28} color="white" />
                  </div>
                  <h2 className="hero-card-title">Join Our Mission</h2>
                  <p className="hero-card-sub">Be a part of the change you want to see</p>

                  <ul className="hero-feature-list">
                    {[
                      'Free skill-development workshops',
                      'Mentorship from industry leaders',
                      '1-on-1 career counseling sessions',
                      'Access to scholarship programs',
                      'Safe & supportive community network',
                    ].map((item) => (
                      <li key={item} className="hero-feature-item">
                        <div className="hero-feature-check">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="floating-badge floating-badge-1">
                  <Star size={14} style={{ color: '#f97316' }} />
                  <span>4.9★ Rated Foundation</span>
                </div>

                <div className="floating-badge floating-badge-2">
                  <Users size={14} style={{ color: '#c026d3' }} />
                  <span>10,000+ Active Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section" id="mission">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Heart size={13} />
              What We Do
            </div>
            <h2 className="section-title">
              Our Mission &{' '}
              <span className="gradient-text">Impact Areas</span>
            </h2>
            <p className="section-subtitle">
              We work tirelessly across six key pillars to create lasting change
              in the lives of women and girls across India and beyond.
            </p>
          </div>

          <div className="mission-grid">
            {missionCards.map((card) => (
              <div key={card.title} className="mission-card">
                <div className="mission-card-icon">{card.icon}</div>
                <h3 className="mission-card-title">{card.title}</h3>
                <p className="mission-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Mail size={13} />
              Reach Out
            </div>
            <h2 className="section-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle">
              Have a question, want to volunteer, or just want to say hello?
              We'd love to hear from you!
            </p>
          </div>

          <div className="contact-wrapper">
            {/* Left info */}
            <div className="contact-info">
              <h3 className="contact-info-title">
                Let's Build Something{' '}
                <span className="gradient-text">Beautiful Together</span>
              </h3>
              <p className="contact-info-desc">
                Whether you're a woman seeking support, a mentor wanting to give back,
                a corporate partner, or simply someone who believes in our cause —
                we'd love to connect with you.
              </p>

              <ul className="contact-detail-list">
                <li className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Email Us</span>
                    <span className="contact-detail-value">hello@shecanfoundation.org</span>
                  </div>
                </li>
                <li className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Call Us</span>
                    <span className="contact-detail-value">+91 98765 43210</span>
                  </div>
                </li>
                <li className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="contact-detail-label">Office</span>
                    <span className="contact-detail-value">Connaught Place, New Delhi — 110001</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="navbar-logo">S</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                She Can Foundation
              </span>
            </div>
            <p className="footer-text">
              Made with <span className="footer-love">♥</span> for every woman who dares to dream.
            </p>
            <p className="footer-text">© {new Date().getFullYear()} She Can Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
