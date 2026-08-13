import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CampusSafetyGuidelines.css';

export default function ContactSecurityHub() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'General Security Inquiry',
        priority: 'Normal',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

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
                        <Link to="/central-library-hub" className="policy-nav-item">Library Hub</Link>
                        <Link to="/contact-security-hub" className="policy-nav-item active">Contact Security Hub</Link>
                    </nav>

                    <div className="policy-header-actions">
                        <button onClick={() => navigate('/login')} className="policy-btn-outline">Log In</button>
                        <button onClick={() => navigate('/reportlost')} className="policy-btn-primary">Report Lost Item</button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="policy-hero" style={{ background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(11, 19, 41, 1) 100%)' }}>
                <div className="policy-hero-content">
                    <div className="policy-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>24/7 Security Operations &amp; Vault Dispatch</span>
                    </div>
                    <h1 className="policy-hero-title">Contact Campus Security Hub</h1>
                    <p className="policy-hero-subtitle">
                        Direct connection to Campus Security Command Center, physical item vault administrators, and immediate emergency assistance.
                    </p>
                    <div className="policy-hero-meta">
                        <span style={{ color: '#4ade80', fontWeight: '600' }}>● Dispatch Live Status: ONLINE</span>
                        <span className="dot-separator">•</span>
                        <span>24/7 Emergency Line: +1 (800) 555-SAFE</span>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="policy-main-content">
                {/* EMERGENCY ALERT BANNER */}
                <div style={{ background: 'linear-gradient(90deg, rgba(185, 28, 28, 0.25) 0%, rgba(153, 27, 27, 0.15) 100%)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', flexShrink: 0 }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div>
                            <h4 style={{ color: '#fca5a5', margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Immediate Emergency or Theft in Progress?</h4>
                            <p style={{ color: '#cbd5e1', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>Do not use online web forms for immediate safety emergencies. Call Emergency Dispatch directly.</p>
                        </div>
                    </div>
                    <a href="tel:18005557233" style={{ background: '#dc2626', color: 'white', fontWeight: '700', padding: '0.65rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)' }}>
                        📞 Call Emergency Hotline
                    </a>
                </div>

                {/* 4 HOTLINE / DEPT CARDS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            🔒
                        </div>
                        <h3 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>Vault Custody Desk</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                            For verifying claim ownership of high-value devices (laptops, jewelry, tablets) held in security safes.
                        </p>
                        <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '0.95rem' }}>Ext. 4402 &bull; vault@campussmart.edu</div>
                    </div>

                    <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            📚
                        </div>
                        <h3 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>Central Library Hub Desk</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                            Intake office for items found in classrooms, study halls, and dining facilities.
                        </p>
                        <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.95rem' }}>Ext. 4401 &bull; Room 104, Main Library</div>
                    </div>

                    <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            🛡️
                        </div>
                        <h3 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>Night Patrol &amp; Escort</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                            Request campus safety escorts between 07:00 PM and 05:00 AM across all housing and academic zones.
                        </p>
                        <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.95rem' }}>Ext. 4410 &bull; 24/7 Service</div>
                    </div>

                    <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            🆔
                        </div>
                        <h3 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>ID &amp; Access Key Vault</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                            Lost keycards, lab badges, or residence hall keys retrieved and stored for student pickup.
                        </p>
                        <div style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.95rem' }}>Ext. 4408 &bull; Security Building B</div>
                    </div>
                </div>

                {/* TWO COLUMN SECTION: FORM AND LOCATIONS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {/* INQUIRY FORM */}
                    <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '2rem' }}>
                        <h2 style={{ color: 'white', fontSize: '1.4rem', marginTop: 0, marginBottom: '0.5rem' }}>Send Message to Security Dispatch</h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Submit non-emergency lost item inquiries, verification assistance requests, or general security questions.
                        </p>

                        {submitted ? (
                            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                                <h3 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>Dispatch Ticket Submitted!</h3>
                                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>
                                    Your request ID <strong>#SEC-{Math.floor(100000 + Math.random() * 900000)}</strong> has been assigned to the active duty officer. An officer will email you back within 15 minutes.
                                </p>
                                <button onClick={() => setSubmitted(false)} style={{ marginTop: '1.25rem', background: '#2563eb', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                                    Submit Another Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Full Name *</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        required 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        placeholder="e.g. Alex Johnson"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(11, 19, 41, 0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Campus Email *</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            placeholder="alex@univ.edu"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(11, 19, 41, 0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                            placeholder="(555) 000-0000"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(11, 19, 41, 0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Category</label>
                                        <select 
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem' }}
                                        >
                                            <option value="General Security Inquiry">General Security Inquiry</option>
                                            <option value="Lost Device / Vault Check">Lost Device / Vault Check</option>
                                            <option value="Claim Ownership Verification">Claim Ownership Verification</option>
                                            <option value="Night Escort Request">Night Escort Request</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Priority Level</label>
                                        <select 
                                            name="priority" 
                                            value={formData.priority} 
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem' }}
                                        >
                                            <option value="Normal">Normal (Routine)</option>
                                            <option value="High">High (High-Value Item)</option>
                                            <option value="Urgent">Urgent (Immediate Assistance)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: '600' }}>Inquiry / Item Description *</label>
                                    <textarea 
                                        name="message" 
                                        rows="4" 
                                        required 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        placeholder="Include item serial number, unique marks, estimated time lost, or specific question..."
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(11, 19, 41, 0.7)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                <button type="submit" className="policy-btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}>
                                    Submit Dispatch Inquiry
                                </button>
                            </form>
                        )}
                    </div>

                    {/* PHYSICAL STATIONS & MAP LOCATION */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '1.75rem' }}>
                            <h3 style={{ color: 'white', marginTop: 0, marginBottom: '1rem' }}>Physical Custody Stations</h3>
                            
                            <div style={{ borderLeft: '3px solid #2563eb', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
                                <h4 style={{ color: '#60a5fa', margin: '0 0 0.2rem 0' }}>Station A: Security Headquarters</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>Building 4, Administration Quad &bull; Open 24/7</p>
                                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>Main dispatch center, video surveillance room, and high-value vault.</p>
                            </div>

                            <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
                                <h4 style={{ color: '#34d399', margin: '0 0 0.2rem 0' }}>Station B: Library Intake Hub</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>Central Library Room 104 &bull; 08:00 AM – 10:00 PM</p>
                                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>General student item collection, lost IDs, backpacks, and tech accessories.</p>
                            </div>

                            <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '1rem' }}>
                                <h4 style={{ color: '#fbbf24', margin: '0 0 0.2rem 0' }}>Station C: Student Center Post</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>Student Union Ground Floor Desk &bull; 09:00 AM – 09:00 PM</p>
                                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.3rem 0 0 0' }}>Intake post for dining, recreational, and union event facilities.</p>
                            </div>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '14px', padding: '1.5rem' }}>
                            <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>⚡ Quick Action Options</h4>
                            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
                                Looking to report or search for lost property directly on the network?
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <Link to="/reportlost" className="policy-btn-primary" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                                    Report Lost Item
                                </Link>
                                <Link to="/reportfound" className="policy-btn-outline" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                                    Report Found Item
                                </Link>
                                <Link to="/central-library-hub" className="policy-btn-outline" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                                    Visit Library Hub Page
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="policy-footer" style={{ marginTop: '4rem' }}>
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
