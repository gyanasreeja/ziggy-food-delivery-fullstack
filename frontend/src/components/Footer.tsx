import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Company Info */}
        <div style={styles.section}>
          <h3 style={styles.logo}>🍔 Ziggy</h3>
          <p style={styles.tagline}>
            Your favorite food delivered fast & fresh
          </p>
          <div style={styles.social}>
            <a href="#" style={styles.socialIcon}>📘</a>
            <a href="#" style={styles.socialIcon}>📷</a>
            <a href="#" style={styles.socialIcon}>🐦</a>
            <a href="#" style={styles.socialIcon}>💼</a>
          </div>
        </div>

        {/* Company Links */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Company</h4>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link}>About Us</a></li>
            <li><a href="#" style={styles.link}>Careers</a></li>
            <li><a href="#" style={styles.link}>Team</a></li>
            <li><a href="#" style={styles.link}>Blog</a></li>
          </ul>
        </div>

        {/* For Partners */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>For Partners</h4>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link}>Partner with Us</a></li>
            <li><a href="#" style={styles.link}>Become a Rider</a></li>
            <li><a href="#" style={styles.link}>Restaurant Owner</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Legal</h4>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link}>Terms & Conditions</a></li>
            <li><a href="#" style={styles.link}>Privacy Policy</a></li>
            <li><a href="#" style={styles.link}>Cookie Policy</a></li>
            <li><a href="#" style={styles.link}>Refund Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Contact Us</h4>
          <ul style={styles.contactList}>
            <li style={styles.contactItem}>
              📧 <a href="mailto:support@ziggy.com" style={styles.link}>support@ziggy.com</a>
            </li>
            <li style={styles.contactItem}>
              📞 <a href="tel:+1234567890" style={styles.link}>+1 (234) 567-890</a>
            </li>
            <li style={styles.contactItem}>
              📍 123 Food Street, NY 10001
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.container}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © 2026 Ziggy. All rights reserved.
            </p>
            <div style={styles.payment}>
              <span style={styles.paymentText}>We accept:</span>
              <span style={styles.paymentIcon}>💳</span>
              <span style={styles.paymentIcon}>🏧</span>
              <span style={styles.paymentIcon}>💰</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  tagline: {
    fontSize: '14px',
    color: '#999',
    margin: 0,
  },
  social: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'transform 0.3s',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'white',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  contactItem: {
    fontSize: '14px',
    color: '#999',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  bottomBar: {
    borderTop: '1px solid #333',
    marginTop: '32px',
  },
  bottomContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
  copyright: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  payment: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  paymentText: {
    fontSize: '14px',
    color: '#666',
  },
  paymentIcon: {
    fontSize: '20px',
  },
};

export default Footer;
