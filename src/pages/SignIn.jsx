import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
    const navigate = useNavigate();

    // Controlled Form States
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [globalError, setGlobalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle Input Changes
    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }));

        // Clear validation errors on type
        if (id === 'email') setEmailError(false);
        if (id === 'password') setPasswordError(false);
        setGlobalError(false);
        setErrorMessage('');
    };

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const emailValue = formData.email.trim();
        const passwordValue = formData.password.trim();

        // Email Regex Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        // Password Validation (Length >= 8)
        if (!passwordValue || passwordValue.length < 8) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }

        if (!isValid) return;

        setIsLoading(true);
        setGlobalError(false);
        setErrorMessage('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailValue, password: passwordValue }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save user and token to local storage
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
                setErrorMessage(data.message || 'Invalid email or password.');
                setGlobalError(true);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMessage('Unable to connect to authentication server. Please check your backend connection.');
            setGlobalError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* LEFT SIDE: BRAND HERO PANEL */}
            <section className="hero-panel" aria-label="Brand Overview">
                {/* Brand Logo */}
                <div className="hero-header">
                    <Link to="/" className="brand-logo">
                        <div className="brand-icon">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <path d="M11 8a3 3 0 0 1 3 3" />
                            </svg>
                        </div>
                        <span className="brand-title">
                            Campus <span>Smart</span>
                        </span>
                    </Link>
                </div>

                {/* Hero Message & Graphic */}
                <div className="hero-content">
                    <h1 className="hero-headline">Reunite people with what matters.</h1>
                    <p className="hero-subtitle">
                        The centralized, intelligent lost and found network connecting students, staff, and campus safety teams in real time.
                    </p>

                    {/* SVG Vector Graphic */}
                    <div className="illustration-wrapper">
                        <svg className="svg-illustration" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="70" width="120" height="110" rx="4" fill="#e2e8f0" fillOpacity="0.8" />
                            <rect x="55" y="85" width="20" height="25" rx="2" fill="#2563eb" fillOpacity="0.2" />
                            <rect x="90" y="85" width="20" height="25" rx="2" fill="#2563eb" fillOpacity="0.2" />
                            <rect x="55" y="125" width="20" height="25" rx="2" fill="#2563eb" fillOpacity="0.2" />
                            <rect x="90" y="125" width="20" height="25" rx="2" fill="#2563eb" fillOpacity="0.2" />

                            <rect x="240" y="50" width="130" height="130" rx="4" fill="#e2e8f0" fillOpacity="0.8" />
                            <polygon points="240,50 305,15 370,50" fill="#cbd5e1" fillOpacity="0.9" />
                            <circle cx="305" cy="75" r="14" fill="#2563eb" fillOpacity="0.2" />

                            <path
                                d="M140 120 C 180 60, 220 60, 260 110"
                                stroke="#2563eb"
                                strokeWidth="3"
                                strokeDasharray="6 6"
                                fill="none"
                            />

                            <circle cx="200" cy="85" r="32" fill="#2563eb" fillOpacity="0.12" />
                            <circle cx="200" cy="85" r="22" fill="#2563eb" fillOpacity="0.85" />

                            <g transform="translate(188, 73) scale(0.9)">
                                <path
                                    d="M21 2l-2 2m-3 0l2 2m-2 2l2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778-7.778 5.5 5.5 0 0 1 7.778 7.778z"
                                    stroke="#FFFFFF"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>

                            <line x1="20" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                        {/* Floating Stats Badge */}
                        <div className="stats-card">
                            <div className="stats-icon">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div>
                                <div className="stats-val">1,820+</div>
                                <div className="stats-lbl">Belongings reunited</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="hero-footer">&copy; 2026 Campus Smart SaaS Platform. All rights reserved.</div>
            </section>

            {/* RIGHT SIDE: LOGIN FORM */}
            <main className="form-panel">
                <div className="form-card">
                    <header className="form-header">
                        <h2 className="form-title">Welcome back</h2>
                        <p className="form-subtitle">Sign in to manage your lost and found activity.</p>
                    </header>

                    {/* Dynamic Error Banner */}
                    <div className={`alert-banner ${globalError ? 'visible' : ''}`} role="alert">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errorMessage || 'Invalid credentials. Please check your details and try again.'}</span>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {/* Institutional Email Input */}
                        <div className={`form-group ${emailError ? 'error' : ''}`}>
                            <label className="form-label" htmlFor="email">
                                Institutional Email
                            </label>
                            <div className="input-wrapper">
                                <svg
                                    className="input-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input"
                                    placeholder="student@university.edu"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <span className="error-text">Please enter a valid university email address.</span>
                        </div>

                        {/* Password Input */}
                        <div className={`form-group ${passwordError ? 'error' : ''}`}>
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <div className="input-wrapper">
                                <svg
                                    className="input-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="form-input"
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* Password Visibility Toggle Button */}
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                    aria-label="Toggle password visibility"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {showPassword ? (
                                            <>
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </>
                                        ) : (
                                            <>
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                            <span className="error-text">Password must be at least 8 characters.</span>
                        </div>

                        {/* Options */}
                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="checkbox-input"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <span className="checkbox-custom">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </form>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    {/* SSO Button */}
                    <button type="button" className="btn btn-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        <span>Continue with Institutional Account</span>
                    </button>

                    <div className="form-footer">
                        Don't have an account?{' '}
                        <Link to="/signup" className="signup-link">
                            Create account
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}