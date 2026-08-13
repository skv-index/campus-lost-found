import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css';

export default function CentralLibraryHub() {
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
                        <Link to="/central-library-hub" className="policy-nav-item active">Library Hub</Link>
                        <Link to="/contact-security-hub" className="policy-nav-item">Contact Security Hub</Link>
                    </nav>

                    <div className="policy-header-actions">
                        <button onClick={() => navigate('/login')} className="policy-btn-outline">Log In</button>
                        <button onClick={() => navigate('/reportlost')} className="policy-btn-primary">Report Lost Item</button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="policy-hero" style={{ background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(11, 19, 41, 1) 100%)' }}>
                <div className="policy-hero-content">
                    <div className="policy-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <span>Primary Lost &amp; Found Collection Point</span>
                    </div>
                    <h1 className="policy-hero-title">Central Library Hub</h1>
                    <p className="policy-hero-subtitle">
                        The campus-wide main intake, electronic tagging, and verification station for lost electronics, personal items, and academic materials.
                    </p>
                    <div className="policy-hero-meta">
                        <span>Location: Main Library Ground Floor (Room 104)</span>
                        <span className="dot-separator">•</span>
                        <span style={{ color: '#4ade80' }}>Status: OPEN &bull; 08:00 AM - 10:00 PM Daily</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="policy-main-content">
                <div className="policy-grid-layout">
                    {/* LEFT COLUMN: NAVIGATION / QUICK SUMMARY */}
                    <aside className="policy-sidebar">
                        <div className="sidebar-card">
                            <h3 className="sidebar-title">Hub Quick Info</h3>
                            <ul className="sidebar-list">
                                <li><a href="#about">1. Overview &amp; Operating Hours</a></li>
                                <li><a href="#custody">2. Intake &amp; Storage Vault</a></li>
                                <li><a href="#lockers">3. 24/7 Smart Drop Lockers</a></li>
                                <li><a href="#claim">4. Item Verification &amp; Claim Process</a></li>
                                <li><a href="#contact-info">5. Desk Contact &amp; Location Map</a></li>
                            </ul>
                        </div>

                        <div className="sidebar-card highlight-card" style={{ background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.3) 0%, rgba(15, 23, 42, 0.8) 100%)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                            <div className="card-header-icon" style={{ backgroundColor: '#2563eb', color: 'white' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <h4>Need After-Hours Drop-off?</h4>
                            <p>Use our automated Smart Storage Lockers located right at the Library East Entrance 24/7.</p>
                            <Link to="/reportfound" className="sidebar-action-btn" style={{ background: '#2563eb', color: 'white', textDecoration: 'none', textAlign: 'center', display: 'block', borderRadius: '6px', padding: '0.6rem 1rem', marginTop: '0.75rem', fontWeight: '600' }}>
                                Deposit Found Item
                            </Link>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN: DETAILED CONTENT */}
                    <article className="policy-article">
                        {/* Section 1 */}
                        <section id="about" className="article-section">
                            <h2>1. Overview &amp; Operating Hours</h2>
                            <p>
                                The <strong>Central Library Hub</strong> serves as the chief lost and found repository for the university campus. Operating in partnership with Campus Security, the Library Hub intake center catalogs hundreds of lost items weekly using RFID tags and automated image recognition software.
                            </p>
                            <div className="policy-info-box" style={{ background: 'rgba(30, 58, 138, 0.25)', borderColor: 'rgba(59, 130, 246, 0.3)', padding: '1.25rem', borderRadius: '10px', marginTop: '1rem' }}>
                                <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>⏰ Service Desk Operating Hours</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', lineHeight: '1.7' }}>
                                    <li><strong>Monday – Friday:</strong> 08:00 AM – 10:00 PM</li>
                                    <li><strong>Saturday &amp; Sunday:</strong> 09:00 AM – 08:00 PM</li>
                                    <li><strong>Holidays &amp; Exam Periods:</strong> Extended 24/7 Smart Locker access</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="custody" className="article-section">
                            <h2>2. Intake &amp; Security Storage Vault</h2>
                            <p>
                                Every item brought to the Central Library Hub undergoes a systematic verification process:
                            </p>
                            <ul className="policy-bullet-list">
                                <li><strong>Barcoding &amp; Digital Indexing:</strong> Items receive a unique trackable barcode (e.g., <code>LIB-2026-9042</code>) linked to CampusSmart.</li>
                                <li><strong>High-Value Vault:</strong> Laptops, smartphones, smartwatches, wallets, and keys are stored in climate-controlled, biometric-secured safes.</li>
                                <li><strong>Automated Matching:</strong> When you submit a lost report, our AI algorithm checks the Library Hub inventory in real-time.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section id="lockers" className="article-section">
                            <h2>3. 24/7 Smart Drop Lockers</h2>
                            <p>
                                Found an item outside of regular service hours? You can deposit it safely into our smart lockers located at the Library East Entrance.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem' }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Step 1: Scan QR Code</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Scan the kiosk QR code using your phone or the CampusSmart app.</p>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem' }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📥</div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Step 2: Deposit Item</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Place the item in the assigned locker compartment and close the latch.</p>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem' }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Step 3: Instant Confirmation</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>Receive a digital receipt and deposit verification timestamp.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="claim" className="article-section">
                            <h2>4. Item Verification &amp; Claim Process</h2>
                            <p>
                                To collect an item from the Central Library Hub desk:
                            </p>
                            <ol style={{ paddingLeft: '1.25rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                                <li>Present a valid <strong>University Student / Staff ID</strong> card.</li>
                                <li>Provide your approved <strong>CampusSmart Claim ID</strong> or claim notification email.</li>
                                <li>For electronic devices, unlock the device in front of the desk officer or verify unique hardware serial numbers.</li>
                            </ol>
                        </section>

                        {/* Section 5 */}
                        <section id="contact-info" className="article-section">
                            <h2>5. Hub Contact &amp; Location</h2>
                            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</div>
                                        <div style={{ color: 'white', fontWeight: '600', marginTop: '0.25rem' }}>Central Library, Ground Floor, Room 104</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Near the IT Helpdesk &amp; Main Atrium</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Direct Extension</div>
                                        <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '1.1rem', marginTop: '0.25rem' }}>+1 (800) 555-HUB1 (Ext 4401)</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>library-hub@campussmart.edu</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <Link to="/contact-security-hub" className="policy-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                        Contact Security Hub
                                    </Link>
                                    <Link to="/marketplace" className="policy-btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                        Browse Library Inventory
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="policy-footer">
                <div className="policy-footer-inner">
                    <div className="policy-footer-grid">
                        <div className="policy-footer-brand">
                            <div className="policy-brand">
                                <div className="policy-brand-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <span className="policy-brand-title">Campus<span>Smart</span></span>
                            </div>
                            <p>Intelligent lost property recovery network connecting students, library staff, and security teams across campus.</p>
                        </div>

                        <div>
                            <h4 className="footer-title">Campus Hubs</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/central-library-hub">Central Library Hub</Link></li>
                                <li><Link to="/contact-security-hub">Contact Security Hub</Link></li>
                                <li><Link to="/marketplace">Search Items</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="footer-title">Governance &amp; Help</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/safety-guidelines">Campus Safety Guidelines</Link></li>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                                <li><Link to="/security-policy">Security Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="policy-footer-bottom">
                        <div>&copy; 2026 CampusSmart SaaS Technologies. All rights reserved.</div>
                        <div className="footer-bottom-links">
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
