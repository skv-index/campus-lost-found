import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css';

export default function TermsOfService() {
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
                        <Link to="/terms-of-service" className="policy-nav-item active">Terms</Link>
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
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>User Agreement &amp; Legal Framework</span>
                    </div>
                    <h1 className="policy-hero-title">Terms of Service</h1>
                    <p className="policy-hero-subtitle">
                        Terms governing access, item registration, property custody, and acceptable use of CampusSmart.
                    </p>
                    <div className="policy-hero-meta">
                        <span>Last Updated: August 12, 2026</span>
                        <span className="dot-separator">•</span>
                        <span>Applies to all registered accounts and institutional visitors</span>
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
                    <Link to="/terms-of-service" className="subnav-tab active">
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
                            <h3 className="sidebar-title">Terms Index</h3>
                            <ul className="sidebar-list">
                                <li><a href="#eligibility">1. Account Eligibility</a></li>
                                <li><a href="#acceptable-use">2. Acceptable Use Policy</a></li>
                                <li><a href="#custody-rules">3. Property Custody &amp; Handover</a></li>
                                <li><a href="#prohibited-items">4. Prohibited Items</a></li>
                                <li><a href="#unclaimed-disposition">5. Unclaimed Property Disposition</a></li>
                                <li><a href="#liability-disclaimer">6. Liability Limitations</a></li>
                            </ul>
                        </div>

                        <div className="sidebar-card callout-card">
                            <div className="callout-icon">⚖️</div>
                            <h4>Need Legal Clarification?</h4>
                            <p>For official university legal compliance inquiries regarding property laws, contact campus counsel.</p>
                            <a href="mailto:legal@campussmart.edu" className="btn-callout" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                Contact Legal Office
                            </a>
                        </div>
                    </aside>

                    {/* CONTENT */}
                    <article className="policy-content">
                        {/* Section 1 */}
                        <section id="eligibility" className="content-block">
                            <div className="block-header">
                                <span className="block-num">01</span>
                                <h2>Account Eligibility &amp; Registration</h2>
                            </div>
                            <p>
                                By accessing or registering an account on CampusSmart, you confirm that you are an active student, faculty member, staff, or authorized university visitor.
                            </p>
                            <ul className="styled-list">
                                <li><strong>Single Identity Requirement:</strong> Each user must maintain a single account linked to their active institutional email domain (@university.edu).</li>
                                <li><strong>Truthful Information:</strong> Users must provide accurate identity credentials and current contact numbers for verification.</li>
                                <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials and active session tokens.</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section id="acceptable-use" className="content-block">
                            <div className="block-header">
                                <span className="block-num">02</span>
                                <h2>Acceptable Use Policy</h2>
                            </div>
                            <p>
                                CampusSmart is strictly dedicated to reuniting rightful owners with lost property. Commercial advertising, spamming, or fraudulent claims are explicitly prohibited.
                            </p>
                            <div className="policy-grid-2">
                                <div className="policy-rule-card">
                                    <div className="rule-badge status-warning">Required Behavior</div>
                                    <h4>Prompt Reporting</h4>
                                    <p>Found property should be reported within 24 hours of discovery to maximize recovery probability.</p>
                                </div>
                                <div className="policy-rule-card">
                                    <div className="rule-badge status-danger">Prohibited Action</div>
                                    <h4>Extortion or Reward Demands</h4>
                                    <p>Demanding monetary compensation or mandatory rewards prior to returning found property is grounds for expulsion and legal referral.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="custody-rules" className="content-block">
                            <div className="block-header">
                                <span className="block-num">03</span>
                                <h2>Property Custody &amp; Handover Rules</h2>
                            </div>
                            <p>
                                All physical item transfers must strictly comply with university property custody standards:
                            </p>
                            <div className="grid-cards-3">
                                <div className="info-box">
                                    <div className="box-icon">🤝</div>
                                    <h3>Verified Handover</h3>
                                    <p>Items may only be released once the claimant presents verified matching proof of ownership.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">📦</div>
                                    <h3>Safe Storage</h3>
                                    <p>Campus security hubs serve as official physical custodians for high-value belongings.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">📝</div>
                                    <h3>Receipt Signing</h3>
                                    <p>Both claimant and security officer must sign digital custody transfer receipts upon item handover.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="prohibited-items" className="content-block">
                            <div className="block-header">
                                <span className="block-num">04</span>
                                <h2>Prohibited Items List</h2>
                            </div>
                            <p>
                                The following item categories may NOT be reported or listed on CampusSmart under any circumstances:
                            </p>
                            <div className="warning-banner">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <div>
                                    <strong>Immediate Police Handover:</strong> Illegal substances, weapons, hazardous chemicals, perishable foods, or stolen goods must be turned in immediately to Campus Police without creating a public software listing.
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="unclaimed-disposition" className="content-block">
                            <div className="block-header">
                                <span className="block-num">05</span>
                                <h2>Unclaimed Property Disposition Schedule</h2>
                            </div>
                            <p>
                                Property remaining unclaimed in campus security custody is processed according to state university statutory timeframes:
                            </p>
                            <div className="step-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-badge">1</div>
                                    <div className="timeline-body">
                                        <h4>Days 1–30: Active Search Window</h4>
                                        <p>Item actively listed on CampusSmart network with push notifications to matching lost reports.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">2</div>
                                    <div className="timeline-body">
                                        <h4>Days 31–90: Campus Custody Hold</h4>
                                        <p>Item stored securely in central vault; available for physical walk-in claim verification.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">3</div>
                                    <div className="timeline-body">
                                        <h4>Day 90+: Statutory Disposition</h4>
                                        <p>Unclaimed property is surrendered for campus charity donation, electronics recycling, or police auction in accordance with state regulations.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="liability-disclaimer" className="content-block">
                            <div className="block-header">
                                <span className="block-num">06</span>
                                <h2>Limitation of Liability &amp; Disclaimers</h2>
                            </div>
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Term Category</th>
                                        <th>Platform Provision</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Software Availability</strong></td>
                                        <td>CampusSmart is provided "as-is" without warranty of continuous 100% uptime.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Property Condition</strong></td>
                                        <td>The platform is not responsible for damage, wear, or pre-existing defects of lost property.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Direct Disputes</strong></td>
                                        <td>Disputes between individual finders and claimants are arbitrated by Campus Security Administration.</td>
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
