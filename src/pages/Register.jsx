import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        role: 'student',
        fullName: '',
        email: '',
        studentId: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Password strength calculation
    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, label: 'Enter a password', color: 'var(--color-text-muted)' };
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        const colors = ['#cbd5e1', '#e11d48', '#d97706', '#2563eb', '#16a34a'];
        const labels = ['Enter a password', 'Weak password', 'Fair password', 'Good password', 'Strong password'];

        return { score, label: labels[score] || labels[0], color: colors[score] || colors[0] };
    };

    const strength = getPasswordStrength(formData.password);

    // Input change handler
    const handleChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        const fieldName = name || id;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));

        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
        setApiError('');
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = true;
        if (!formData.email.trim()) newErrors.email = true;
        if (!formData.studentId.trim()) newErrors.studentId = true;
        if (!formData.phone.trim()) newErrors.phone = true;
        if (!formData.password) newErrors.password = true;
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setApiError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    studentId: formData.studentId,
                    phone: formData.phone,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                // Redirect based on role: staff/teachers go to Desk Dashboard
                const role = data.role;
                if (role === 'staff' || role === 'teacher' || role === 'admin') {
                    navigate('/desk-dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setApiError(data.message || 'Registration failed. Please check your information.');
            }
        } catch (err) {
            console.error('Registration API error:', err);
            setApiError('Unable to connect to backend server. Please verify your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* LEFT SIDE: BRAND & SYSTEM BENEFITS PANEL */}
            <section className="hero-panel" aria-label="Brand Overview">
                <div className="hero-header">
                    <Link to="/" className="brand-logo">
                        <div className="brand-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <path d="M11 8a3 3 0 0 1 3 3"></path>
                            </svg>
                        </div>
                        <span className="brand-title">Campus <span>Smart</span></span>
                    </Link>
                </div>

                <div className="hero-content">
                    <h1 className="hero-headline">Join your smart campus network.</h1>
                    <p className="hero-subtitle">
                        Connect with thousands of students and staff to quickly recover missing belongings and protect campus security.
                    </p>

                    <div className="illustration-wrapper">
                        <svg className="svg-illustration" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="30" y="60" width="110" height="120" rx="4" fill="#e2e8f0" opacity="0.7" />
                            <rect x="260" y="40" width="110" height="140" rx="4" fill="#e2e8f0" opacity="0.7" />
                            <ellipse cx="200" cy="165" rx="150" ry="20" fill="#dbeafe" opacity="0.6" />
                            <circle cx="120" cy="90" r="14" fill="#2563eb" />
                            <path d="M105 130 C 105 105, 135 105, 135 130" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
                            <path d="M125 115 L 155 110" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="280" cy="90" r="14" fill="#1e3a8a" />
                            <path d="M265 130 C 265 105, 295 105, 295 130" stroke="#1e3a8a" strokeWidth="12" strokeLinecap="round" />
                            <path d="M275 115 L 245 110" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
                            <rect x="180" y="95" width="40" height="30" rx="6" fill="#1d4ed8" />
                            <path d="M190 95 V 90 C 190 85, 210 85, 210 90 V 95" stroke="#1d4ed8" strokeWidth="3" fill="none" />
                            <circle cx="200" cy="110" r="25" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                            <circle cx="200" cy="65" r="12" fill="#16a34a" />
                            <path d="M195 65 L 199 69 L 206 61" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="benefits-list">
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <span className="benefit-text">Report lost belongings</span>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                            <span className="benefit-text">Find reported items</span>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <span className="benefit-text">Track claims</span>
                        </div>

                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </div>
                            <span className="benefit-text">Receive match alerts</span>
                        </div>
                    </div>
                </div>

                <div className="hero-footer">
                    &copy; 2026 Campus Smart SaaS Platform. All rights reserved.
                </div>
            </section>

            {/* RIGHT SIDE: REGISTRATION FORM PANEL */}
            <main className="form-panel">
                <div className="form-card">
                    <header className="form-header">
                        <h2 className="form-title">Create your account</h2>
                        <p className="form-subtitle">Get started with your official university credentials.</p>
                    </header>

                    {/* Dynamic Error Banner */}
                    {apiError && (
                        <div className="alert-banner visible" role="alert" style={{ marginBottom: '1rem' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{apiError}</span>
                        </div>
                    )}

                    <form className="auth-form" id="registerForm" onSubmit={handleSubmit} noValidate>
                        {/* Role Switcher */}
                        <div className="form-group">
                            <label className="form-label">Campus Role</label>
                            <div className="role-selector">
                                <div className="role-option">
                                    <input
                                        type="radio"
                                        id="roleStudent"
                                        name="role"
                                        value="student"
                                        checked={formData.role === 'student'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="roleStudent" className="role-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                        Student
                                    </label>
                                </div>
                                <div className="role-option">
                                    <input
                                        type="radio"
                                        id="roleStaff"
                                        name="role"
                                        value="staff"
                                        checked={formData.role === 'staff'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="roleStaff" className="role-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        Staff
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Full Name & Phone Number Row */}
                        <div className="form-row">
                            <div className={`form-group ${errors.fullName ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="fullName">Full Name</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="form-input"
                                        placeholder="Alex Morgan"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <span className="error-text">Enter full name.</span>
                            </div>

                            <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-input"
                                        placeholder="+1 555-000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <span className="error-text">Enter phone number.</span>
                            </div>
                        </div>

                        {/* Email & Student ID Row */}
                        <div className="form-row">
                            <div className={`form-group ${errors.email ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="email">Institutional Email</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-input"
                                        placeholder="alex@univ.edu"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <span className="error-text">Enter a valid email.</span>
                            </div>

                            <div className={`form-group ${errors.studentId ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="studentId">Student / Staff ID</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="16" rx="2" />
                                        <line x1="7" y1="8" x2="17" y2="8" />
                                        <line x1="7" y1="12" x2="13" y2="12" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="studentId"
                                        className="form-input"
                                        placeholder="ST-882910"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <span className="error-text">ID is required.</span>
                            </div>
                        </div>

                        {/* Password & Confirm Password Row */}
                        <div className="form-row">
                            <div className={`form-group ${errors.password ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className="form-input"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="strength-meter">
                                    <div className="strength-bars">
                                        {[0, 1, 2, 3].map((idx) => (
                                            <div
                                                key={idx}
                                                className="strength-bar"
                                                style={{
                                                    backgroundColor:
                                                        formData.password.length > 0 && idx < strength.score
                                                            ? strength.color
                                                            : '#e2e8f0',
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="strength-text" style={{ color: strength.color }}>
                                        {strength.label}
                                    </span>
                                </div>
                            </div>

                            <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        className="form-input"
                                        placeholder="••••••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <span className="error-text">Passwords do not match.</span>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    className="checkbox-input"
                                    id="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="checkbox-custom">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                <span>
                                    I agree to the <Link to="/terms-of-service" className="terms-link">Terms of Service</Link> and <Link to="/privacy-policy" className="terms-link">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </form>

                    {/* Privacy & Security Reassurance */}
                    <div className="security-note">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span>Your campus account information is securely protected.</span>
                    </div>

                    {/* Sign In Option */}
                    <div className="form-footer">
                        Already have an account? <Link to="/login" className="signin-link">Sign in</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;