import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    // Name validation (5-20 characters)
    if (formData.name.length < 5 || formData.name.length > 20) {
      newErrors.name = 'Name must be between 5-20 characters';
    }

    // Phone validation (exactly 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else {
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*...)';
      }
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'customer'
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      const errorDetail = err.response?.data?.detail;
      if (typeof errorDetail === 'string') {
        setServerError(errorDetail);
      } else if (Array.isArray(errorDetail)) {
        setServerError(errorDetail.map((e: any) => e.msg).join(', '));
      } else {
        setServerError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join Food Delivery today</p>
        </div>
        
        {serverError && <div style={styles.error}>{serverError}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={errors.name ? styles.inputError : styles.input}
              placeholder="Enter your full name (5-20 characters)"
              minLength={5}
              maxLength={20}
            />
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={errors.phone ? styles.inputError : styles.input}
              placeholder="Enter 10 digit phone number"
              maxLength={10}
            />
            {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={errors.password ? styles.inputError : styles.input}
              placeholder="Create a password"
              minLength={8}
            />
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            <div style={styles.passwordHints}>
              <span style={styles.hint}>• Min 8 characters</span>
              <span style={styles.hint}>• 1 uppercase letter</span>
              <span style={styles.hint}>• 1 number</span>
              <span style={styles.hint}>• 1 special character</span>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={errors.confirmPassword ? styles.inputError : styles.input}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '480px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    border: '1px solid #fcc',
  },
  form: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontSize: '14px',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  inputError: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #f44336',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box' as const,
    outline: 'none',
  },
  errorText: {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block',
  },
  passwordHints: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  hint: {
    fontSize: '11px',
    color: '#999',
    backgroundColor: '#f5f5f5',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '8px',
    transition: 'background-color 0.3s',
  },
  footer: {
    textAlign: 'center' as const,
    paddingTop: '24px',
    borderTop: '1px solid #e0e0e0',
  },
  footerText: {
    color: '#666',
    fontSize: '14px',
    margin: 0,
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default Register;
