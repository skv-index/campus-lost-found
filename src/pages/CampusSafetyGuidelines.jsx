import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css';

export default function CampusSafetyGuidelines() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

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
                        <Link to="/safety-guidelines" className="policy-nav-item active">Safety</Link>
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
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Campus Governance &amp; Protocol</span>
                    </div>
                    <h1 className="policy-hero-title">Campus Safety &amp; Custody Guidelines</h1>
                    <p className="policy-hero-subtitle">
                        Official safety protocols for reporting, holding, and retrieving lost property on university grounds.
                    </p>
                    <div className="policy-hero-meta">
                        <span>Last revised: August 2026</span>
                        <span className="dot-separator">•</span>
                        <span>Applies to all Students, Faculty &amp; Campus Security</span>
                    </div>
                </div>
            </section>

            {/* NAVIGATION PIPES */}
            <div className="policy-subnav">
                <div className="policy-subnav-inner">
                    <Link to="/safety-guidelines" className="subnav-tab active">
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
                    <Link to="/security-policy" className="subnav-tab">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                        Security &amp; Encryption
                    </Link>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="policy-main">
                <div className="policy-layout">
                    {/* SIDEBAR NAVIGATION */}
                    <aside className="policy-sidebar">
                        <div className="sidebar-card">
                            <h3 className="sidebar-title">On This Page</h3>
                            <ul className="sidebar-list">
                                <li><a href="#safe-zones">1. Safe Handover Zones</a></li>
                                <li><a href="#high-value">2. High-Value Property</a></li>
                                <li><a href="#verification">3. Verification Standards</a></li>
                                <li><a href="#sensitive-items">4. IDs &amp; Confidential Data</a></li>
                                <li><a href="#fraud-prevention">5. Fraud Prevention</a></li>
                                <li><a href="#emergency-contacts">6. Emergency Contacts</a></li>
                            </ul>
                        </div>

                        <div className="sidebar-card callout-card">
                            <div className="callout-icon">🚨</div>
                            <h4>Found a High-Value Item?</h4>
                            <p>Turn laptops, phones, or jewelry immediately into Campus Security Hub inside the Central Library.</p>
                            <button onClick={() => navigate('/reportfound')} className="btn-callout">Report Found Item Now</button>
                        </div>
                    </aside>

                    {/* CONTENT SECTIONS */}
                    <article className="policy-content">
                        {/* Section 1 */}
                        <section id="safe-zones" className="content-block">
                            <div className="block-header">
                                <span className="block-num">01</span>
                                <h2>Designated Safe Handover Zones</h2>
                            </div>
                            <p>
                                To protect both finders and claimers, all physical exchanges must take place within verified, monitored campus locations.
                                Never arrange private meetups in isolated or off-campus areas.
                            </p>
                            
                            <div className="grid-cards-3">
                                <div className="info-box">
                                    <div className="box-icon">🏛️</div>
                                    <h3>Central Security Desk</h3>
                                    <p>Main Administrative Building, Ground Floor. Open 24/7 with CCTV surveillance and security staff present.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">📚</div>
                                    <h3>Central Library Desk</h3>
                                    <p>Library Lobby Information Hub. Mon–Fri: 8:00 AM – 10:00 PM. Weekend: 9:00 AM – 6:00 PM.</p>
                                </div>
                                <div className="info-box">
                                    <div className="box-icon">🏫</div>
                                    <h3>Student Union Office</h3>
                                    <p>Student Activity Building, Room 102. Mon–Fri: 9:00 AM – 5:00 PM for standard item handovers.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="high-value" className="content-block">
                            <div className="block-header">
                                <span className="block-num">02</span>
                                <h2>High-Value Property Protocol</h2>
                            </div>
                            <p>
                                High-value items (market value exceeding $100) require mandatory turn-in to a registered Campus Security Custody Station within 24 hours of discovery.
                            </p>
                            <ul className="styled-list">
                                <li><strong>Laptops &amp; Tablets:</strong> Store powered off in antistatic custody pouches at the Security Office.</li>
                                <li><strong>Smartphones:</strong> Do not attempt to bypass lock screens or reset devices. Keep charged if possible for lost-mode alerts.</li>
                                <li><strong>Wallets &amp; Cash:</strong> Cash counts must be logged in front of a campus officer and dual-signed on receipt.</li>
                                <li><strong>Jewelry &amp; Collectibles:</strong> Placed inside tamper-evident sealed bags with serial tracking barcodes.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section id="verification" className="content-block">
                            <div className="block-header">
                                <span className="block-num">03</span>
                                <h2>Verification &amp; Proof Standards</h2>
                            </div>
                            <p>
                                Before an item is handed over to a claimant, verification must be established through at least one of the following methods:
                            </p>
                            
                            <div className="step-timeline">
                                <div className="timeline-item">
                                    <div className="timeline-badge">1</div>
                                    <div className="timeline-body">
                                        <h4>Unlocking Device</h4>
                                        <p>Demonstrating the correct passcode, pattern, or biometric unlock in person at the custody desk.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">2</div>
                                    <div className="timeline-body">
                                        <h4>Unique Identifiers</h4>
                                        <p>Providing matching serial numbers, IMEI code, purchase invoice, or distinctive custom engavings/stickers.</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-badge">3</div>
                                    <div className="timeline-body">
                                        <h4>Photo Verification</h4>
                                        <p>Showing prior photos featuring the item alongside student ID or matching physical features.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="sensitive-items" className="content-block">
                            <div className="block-header">
                                <span className="block-num">04</span>
                                <h2>IDs &amp; Confidential Document Handling</h2>
                            </div>
                            <p>
                                Government-issued IDs, passports, driver's licenses, and student identification cards must never be photographed with full visible registration numbers or personal identification details.
                            </p>
                            <div className="warning-banner">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <div>
                                    <strong>Privacy Protection Rule:</strong> When uploading photos of lost IDs, always blur out national identity numbers, birth dates, and home address fields.
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="fraud-prevention" className="content-block">
                            <div className="block-header">
                                <span className="block-num">05</span>
                                <h2>Fraud Prevention &amp; Penalties</h2>
                            </div>
                            <p>
                                Fraudulent claim attempts, false lost/found reports, or unauthorized retention of property violate the Student Code of Conduct and local law.
                            </p>
                            <div className="policy-grid-2">
                                <div className="policy-rule-card">
                                    <div className="rule-badge status-danger">Strict Violation</div>
                                    <h4>False Claims</h4>
                                    <p>Attempting to claim items belonging to others results in immediate account suspension and referral to the Dean of Students.</p>
                                </div>
                                <div className="policy-rule-card">
                                    <div className="rule-badge status-warning">Required Action</div>
                                    <h4>Retention Limit</h4>
                                    <p>Found items not turned into campus security within 72 hours are subject to campus property audit policies.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="emergency-contacts" className="content-block">
                            <div className="block-header">
                                <span className="block-num">06</span>
                                <h2>Emergency Contacts &amp; Desk Hours</h2>
                            </div>
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Department / Station</th>
                                        <th>Location</th>
                                        <th>Contact Number</th>
                                        <th>Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Campus Police &amp; Security Dispatch</strong></td>
                                        <td>Building 1 - Main Gate</td>
                                        <td>+1 (555) 019-2831</td>
                                        <td>24 Hours / 7 Days</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Central Library Custody Desk</strong></td>
                                        <td>Main Library Lobby</td>
                                        <td>+1 (555) 019-2844</td>
                                        <td>8:00 AM – 10:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Student Union Lost Property Hub</strong></td>
                                        <td>SU Building - Room 102</td>
                                        <td>+1 (555) 019-2850</td>
                                        <td>9:00 AM – 5:00 PM (M-F)</td>
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
