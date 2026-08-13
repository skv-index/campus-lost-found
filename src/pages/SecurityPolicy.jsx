import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css';

export default function SecurityPolicy() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page-container">
            {/* TOP NAVIGATION BAR */}
            <header className="policy-header">
                <div className="policy-header-inner">
                    <Link to="/" className="policy-brand">
                        <div className="policy-brand-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <path d="M11 8v6M8 11h6" />
                            </svg>
                        </div>
                        <span className="policy-brand-title">
                            Campus<span>Smart</span>
                        </span>
                    </Link>

                    <nav className="policy-nav-links">
                        <Link to="/" className="policy-nav-item">Home</Link>
                        <Link to="/marketplace" className="policy-nav-item">Browse Items</Link>
                        <Link to="/dashboard" className="policy-nav-item">Dashboard</Link>
                        <Link to="/security-policy" className="policy-nav-item active">Security</Link>
                    </nav>

                    <div className="policy-header-actions">
                        <button onClick={() => navigate('/login')} className="policy-btn-outline">Log In</button>
                        <button onClick={() => navigate('/reportlost')} className="policy-btn-primary">Report Lost Item</button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="policy-hero">
                <div className="policy-hero-content">
                    <div className="policy-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                        <span>Infrastructure &amp; Encryption Standards</span>
                    </div>
                    <h1 className="policy-hero-title">Security &amp; Encryption Policy</h1>
                    <p className="policy-hero-subtitle">
                        How CampusSmart safeguards institutional user accounts, identity metadata, and physical property custody logs.
                    </p>
                    <div className="policy-hero-meta">
                        <span>Security Audit: Passed Q3 2026</span>
                        <span className="dot-separator">•</span>
                        <span>TLS 1.3 &amp; AES-256 Encryption Standard</span>
                    </div>
                </div>
            </section>

            {/* NAVIGATION PIPES */}
            <div className="policy-subnav">
                <div className="policy-subnav-inner">
                    <Link to="/safety-guidelines" className="subnav-tab">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Safety Guidelines
                    </Link>
                    <Link to="/privacy-policy" className="subnav-tab">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="subnav-tab">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Terms of Service
                    </Link>
                    <Link to="/security-policy" className="subnav-tab active">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                        Security &amp; Encryption
                    </Link>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="policy-main">
                <div className="policy-layout">
                    {/* SIDEBAR NAVIGATION */}
                    <aside className="policy-sidebar">
                        <div className="sidebar-card">
                            <h3 className="sidebar-title">Security Outline</h3>
                            <ul className="sidebar-list">
                                <li><a href="#encryption">1. Data Encryption</a></li>
                                <li><a href="#access-control">2. Access Control &amp; Auth</a></li>
                                <li><a href="#custody-security">3. Vault Custody Security</a></li>
                                <li><a href="#fraud-monitoring">4. Fraud Monitoring Engine</a></li>
                                <li><a href="#vulnerability-disclosure">5. Responsible Disclosure</a></li>
                            </ul>
                        </div>

                        <div className="sidebar-card callout-card">
                            <div className="callout-icon">🔐</div>
                            <h4>Report Vulnerability?</h4>
                            <p>Found a potential security issue or flaw? Submit a report directly to our Incident Response Team.</p>
                            <a href="mailto:security@campussmart.edu" className="btn-callout" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                Email Security Team
                            </a>
                        </div>
                    </aside>

                    {/* CONTENT */}
                    <article className="policy-content">
                        {/* Section 1 */}
                        <section id="encryption" className="content-block">
                            <div className="block-header">
                                <span className="block-num">01</span>
                                <h2>Data Encryption Standards</h2>
                            </div>
                            <p>
                                All communications and stored property records in CampusSmart are encrypted using industry-leading cryptographic protocols.
                            </p>
                            <div className="grid-cards-3">
                                <div className="info-box">
                                    <div className="box-icon">🔒</div>
                                    <h3>In-Transit Encryption</h3>
                                    <p>TLS 1.3 protocol enforced across all HTTP traffic with HSTS preloading enabled.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">💾</div>
                                    <h3>At-Rest Protection</h3>
                                    <p>AES-256 military-grade encryption for stored photo files, receipts, and claim databases.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">🔑</div>
                                    <h3>Hashed Passwords</h3>
                                    <p>Argon2id and bcrypt salted hashing for institutional user authentication secrets.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="access-control" className="content-block">
                            <div className="block-header">
                                <span className="block-num">02</span>
                                <h2>Access Control &amp; Authentication</h2>
                            </div>
                            <p>
                                We enforce strict Role-Based Access Control (RBAC) to ensure student data is restricted to authorized campus staff.
                            </p>
                            <ul className="styled-list">
                                <li><strong>Single Sign-On (SSO):</strong> Integration with university OAuth 2.0 / SAML 2.0 enterprise identity providers.</li>
                                <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all security officers and administrators managing high-value inventory vaults.</li>
                                <li><strong>Session Timeout:</strong> Automatic token expiration after 30 minutes of inactivity on non-personal devices.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section id="custody-security" className="content-block">
                            <div className="block-header">
                                <span className="block-num">03</span>
                                <h2>Physical Vault Custody Security</h2>
                            </div>
                            <p>
                                Software security is paired with physical campus security measures to ensure lost property protection.
                            </p>
                            <div className="policy-grid-2">
                                <div className="policy-rule-card">
                                    <div className="rule-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                        Physical Security
                                    </div>
                                    <h4>Biometric Vault Access</h4>
                                    <p>Campus lost property lockers are secured with biometric access logs and dual-key custody requirements.</p>
                                </div>
                                <div className="policy-rule-card">
                                    <div className="rule-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                        24/7 Monitoring
                                    </div>
                                    <h4>CCTV Audit Trail</h4>
                                    <p>All physical claim handovers at library and security desks are recorded on high-definition CCTV security cameras.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="fraud-monitoring" className="content-block">
                            <div className="block-header">
                                <span className="block-num">04</span>
                                <h2>Automated Fraud Detection Engine</h2>
                            </div>
                            <p>
                                Our platform continuously analyzes claim submission patterns to detect and block suspicious or fraudulent activity.
                            </p>
                            <div className="step-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-badge">1</div>
                                    <div className="timeline-body">
                                        <h4>Duplicate Claim Flagging</h4>
                                        <p>Automatic hold placed on accounts attempting multiple rapid claims on unrelated items.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">2</div>
                                    <div className="timeline-body">
                                        <h4>IP &amp; Device Fingerprinting</h4>
                                        <p>Cross-verification of network location to ensure claims originate from authorized campus IP blocks.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">3</div>
                                    <div className="timeline-body">
                                        <h4>Manual Security Review</h4>
                                        <p>Flagged claims are automatically escalated to Campus Security Officers for manual verification prior to release.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="vulnerability-disclosure" className="content-block">
                            <div className="block-header">
                                <span className="block-num">05</span>
                                <h2>Responsible Vulnerability Disclosure</h2>
                            </div>
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Policy Phase</th>
                                        <th>Target SLA &amp; Commitment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Initial Acknowledgment</strong></td>
                                        <td>Within 24 hours of report receipt.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Triage &amp; Assessment</strong></td>
                                        <td>Within 48 hours.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Patch Deployment</strong></td>
                                        <td>Critical vulnerabilities resolved within 7 business days.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </article>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="brand-logo" style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700 }}>
                                Campus<span style={{ color: '#2563eb' }}>Smart</span>
                            </Link>
                            <p>
                                The centralized, intelligent lost and found network connecting students, staff, and campus safety teams in real time.
                            </p>
                        </div>

                        <div>
                            <h4 className="footer-heading">Platform</h4>
                            <div className="footer-links">
                                <Link to="/marketplace">Search Inventory</Link>
                                <Link to="/reportlost">Report Lost Item</Link>
                                <Link to="/reportfound">Report Found Item</Link>
                                <Link to="/#how-it-works">How It Works</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="footer-heading">Campus Locations</h4>
                            <div className="footer-links">
                                <Link to="/central-library-hub">Central Library Hub</Link>
                                <Link to="/contact-security-hub">Contact Security Hub</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="footer-heading">Governance &amp; Help</h4>
                            <div className="footer-links">
                                <Link to="/safety-guidelines">Campus Safety Guidelines</Link>
                                <Link to="/privacy-policy">Privacy Policy</Link>
                                <Link to="/terms-of-service">Terms of Service</Link>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div>&copy; 2026 Campus Smart SaaS Technologies. All rights reserved.</div>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <Link to="/privacy-policy">Privacy</Link>
                            <Link to="/terms-of-service">Terms</Link>
                            <Link to="/security-policy">Security</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
