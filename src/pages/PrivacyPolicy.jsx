import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css'; // Reuses shared policy CSS layout & design system

export default function PrivacyPolicy() {
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
                        <Link to="/privacy-policy" className="policy-nav-item active">Privacy</Link>
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
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Data Protection &amp; Confidentiality</span>
                    </div>
                    <h1 className="policy-hero-title">Privacy Policy</h1>
                    <p className="policy-hero-subtitle">
                        How CampusSmart collects, uses, protects, and handles your personal information and lost property reports.
                    </p>
                    <div className="policy-hero-meta">
                        <span>Effective Date: August 12, 2026</span>
                        <span className="dot-separator">•</span>
                        <span>Compliance: FERPA &amp; Institutional Data Protection Standards</span>
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
                    <Link to="/privacy-policy" className="subnav-tab active">
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
                    <Link to="/security-policy" className="subnav-tab">
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
                            <h3 className="sidebar-title">Table of Contents</h3>
                            <ul className="sidebar-list">
                                <li><a href="#data-collection">1. Data We Collect</a></li>
                                <li><a href="#data-usage">2. How We Use Data</a></li>
                                <li><a href="#photo-location">3. Photo &amp; Location Privacy</a></li>
                                <li><a href="#data-sharing">4. Data Sharing &amp; Access</a></li>
                                <li><a href="#retention">5. Data Retention</a></li>
                                <li><a href="#student-rights">6. Student Rights &amp; FERPA</a></li>
                            </ul>
                        </div>

                        <div className="sidebar-card callout-card">
                            <div className="callout-icon">🛡️</div>
                            <h4>Privacy Request?</h4>
                            <p>Have questions about your institutional data or wish to request data erasure? Contact our Privacy Officer.</p>
                            <a href="mailto:privacy@campussmart.edu" className="btn-callout" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                Contact Privacy Officer
                            </a>
                        </div>
                    </aside>

                    {/* CONTENT */}
                    <article className="policy-content">
                        {/* Section 1 */}
                        <section id="data-collection" className="content-block">
                            <div className="block-header">
                                <span className="block-num">01</span>
                                <h2>Information We Collect</h2>
                            </div>
                            <p>
                                CampusSmart collects minimal required information to verify institutional identity and facilitate safe recovery of lost belongings across university campuses.
                            </p>

                            <div className="grid-cards-3">
                                <div className="info-box">
                                    <div className="box-icon">👤</div>
                                    <h3>Account Identification</h3>
                                    <p>Full name, institutional email address (@university.edu), student/staff ID number, and verified campus department.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">📦</div>
                                    <h3>Report Metadata</h3>
                                    <p>Item title, category, description, approximate date/time of loss or discovery, and specific campus location details.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">📷</div>
                                    <h3>Media Uploads</h3>
                                    <p>Photographs submitted for lost or found item listings, metadata (timestamp), and optional proof-of-purchase receipts.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="data-usage" className="content-block">
                            <div className="block-header">
                                <span className="block-num">02</span>
                                <h2>How We Use Your Information</h2>
                            </div>
                            <p>
                                We strictly use your data for core service functionality. We never sell, rent, or monetize personal student data or property records to third-party advertisers.
                            </p>
                            <ul className="styled-list">
                                <li><strong>Matching Algorithms:</strong> Automated cross-referencing of lost report characteristics against newly cataloged found items.</li>
                                <li><strong>Claim Notifications:</strong> Sending real-time email alerts and status updates regarding claim approvals or safe-deposit check-ins.</li>
                                <li><strong>Security Safeguards:</strong> Authenticating student identity to prevent unauthorized physical item collection.</li>
                                <li><strong>Audit Trail:</strong> Maintaining historical records required by campus security administration for audit compliance.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section id="photo-location" className="content-block">
                            <div className="block-header">
                                <span className="block-num">03</span>
                                <h2>Photo &amp; Location Privacy Measures</h2>
                            </div>
                            <p>
                                We enforce automatic and manual privacy filters on public listings to prevent misuse of personal sensitive details.
                            </p>
                            <div className="warning-banner">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <div>
                                    <strong>Automatic Redaction:</strong> Our system automatically detects and masks personal identifiers (such as government IDs, credit card digits, and home phone numbers) on publicly browsable inventory cards.
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="data-sharing" className="content-block">
                            <div className="block-header">
                                <span className="block-num">04</span>
                                <h2>Data Sharing &amp; Authorized Access</h2>
                            </div>
                            <p>
                                Information is only accessible to authorized campus entities strictly on a need-to-know basis:
                            </p>
                            <div className="policy-grid-2">
                                <div className="policy-rule-card">
                                    <div className="rule-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                        Authorized Access
                                    </div>
                                    <h4>Campus Security Staff</h4>
                                    <p>Designated officers can view complete contact details and claim histories to verify item ownership during physical handovers.</p>
                                </div>
                                <div className="policy-rule-card">
                                    <div className="rule-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                        Restricted Access
                                    </div>
                                    <h4>General Campus Users</h4>
                                    <p>Public users only see item category, generic description, and public pickup hub location. Personal details remain hidden.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="retention" className="content-block">
                            <div className="block-header">
                                <span className="block-num">05</span>
                                <h2>Data Retention &amp; Erasure Policy</h2>
                            </div>
                            <p>
                                Property claim records are retained for 180 days following successful resolution to accommodate campus audit regulations. Unclaimed records are archived and anonymized after 12 months.
                            </p>
                            <div className="step-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-badge">1</div>
                                    <div className="timeline-body">
                                        <h4>Active Report Stage</h4>
                                        <p>Retained in active search index for up to 90 days or until item is marked reclaimed.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">2</div>
                                    <div className="timeline-body">
                                        <h4>Resolution &amp; Retention</h4>
                                        <p>Claim log maintained in secure campus vault for 180 days for auditing purposes.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">3</div>
                                    <div className="timeline-body">
                                        <h4>Permanent Anonymization</h4>
                                        <p>Personal identification metadata is permanently wiped, leaving only aggregated statistical metrics.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="student-rights" className="content-block">
                            <div className="block-header">
                                <span className="block-num">06</span>
                                <h2>Student Rights &amp; FERPA Compliance</h2>
                            </div>
                            <p>
                                CampusSmart adheres to Family Educational Rights and Privacy Act (FERPA) guidelines. Students maintain full authority to inspect, update, or request deletion of their submitted records.
                            </p>
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Privacy Right</th>
                                        <th>Description</th>
                                        <th>Action Pathway</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Right to Inspect</strong></td>
                                        <td>Access all active lost &amp; found reports tied to your institutional ID.</td>
                                        <td>Profile Settings &gt; Data Export</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Right to Rectification</strong></td>
                                        <td>Correct inaccurate descriptions or updated serial numbers.</td>
                                        <td>Edit Report in My Claims</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Right to Erasure</strong></td>
                                        <td>Request complete removal of non-custodial report entries.</td>
                                        <td>Contact Privacy Officer</td>
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
