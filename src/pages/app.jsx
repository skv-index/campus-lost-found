import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './app.css';

export default function CampusSmart() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [stats, setStats] = useState({
        itemsReported: 2450,
        itemsRecovered: 1820,
        successfulClaims: 94,
        campusStations: 12
    });

    const trustSectionRef = useRef(null);
    const animatedRef = useRef(false);

    // Animated Counter Effect for Metrics Section
    useEffect(() => {
        const targets = {
            itemsReported: 2450,
            itemsRecovered: 1820,
            successfulClaims: 94,
            campusStations: 12
        };

        const runCounter = () => {
            const duration = 1500;
            const steps = 50;
            const stepTime = duration / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                setStats({
                    itemsReported: Math.min(Math.ceil(targets.itemsReported * progress), targets.itemsReported),
                    itemsRecovered: Math.min(Math.ceil(targets.itemsRecovered * progress), targets.itemsRecovered),
                    successfulClaims: Math.min(Math.ceil(targets.successfulClaims * progress), targets.successfulClaims),
                    campusStations: Math.min(Math.ceil(targets.campusStations * progress), targets.campusStations)
                });

                if (currentStep >= steps) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedRef.current) {
                        animatedRef.current = true;
                        runCounter();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (trustSectionRef.current) {
            observer.observe(trustSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const itemCards = [
        {
            id: '#LF-8921',
            type: 'found',
            category: 'Electronics',
            title: 'MacBook Pro 14" (Space Gray)',
            location: 'Main Library, Study Room 3B',
            time: 'Turned in 25 mins ago',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
            actionText: 'Claim Item'
        },
        {
            id: '#LF-8920',
            type: 'lost',
            category: 'Wallets & IDs',
            title: 'Brown Leather Wallet & Student ID',
            location: 'Student Union Dining Hall',
            time: 'Lost Today, 11:30 AM',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
            actionText: 'Match Found?'
        },
        {
            id: '#LF-8918',
            type: 'found',
            category: 'Electronics',
            title: 'Sony Noise-Canceling Headphones',
            location: 'Engineering Quad Auditorium',
            time: 'Turned in 2 hours ago',
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
            actionText: 'Claim Item'
        }
    ];

    const filteredItems = itemCards.filter((item) => {
        if (activeFilter === 'all') return true;
        return item.type === activeFilter;
    });

    return (
        <div className="campus-smart-app">
            {/* Header / Navbar */}
            <header className="header">
                <div className="container">
                    <nav className="header-nav" aria-label="Main Navigation">
                        <a href="#home" className="brand-logo">
                            <div className="logo-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <path d="M11 8v6M8 11h6" />
                                </svg>
                            </div>
                            <span className="brand-name">Campus<span>Smart</span></span>
                        </a>

                        <ul className="nav-menu">
                            <li><a href="#home" className="nav-link active">Home</a></li>
                            <li><a href="#recent" className="nav-link">Browse Items</a></li>
                            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
                            <li><a href="#features" className="nav-link">Features</a></li>
                        </ul>

                        <div className="nav-actions">
                            <Link to="/login" className="btn btn-ghost">Log In</Link>
                            <Link to="/reportlost" className="btn btn-primary">Report an Item</Link>
                            <button
                                className="mobile-menu-btn"
                                aria-label="Toggle Mobile Menu"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Slide Drawer */}
                <div className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
                    <a href="#home" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</a>
                    <a href="#recent" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Browse Items</a>
                    <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                    <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-subtle)' }} />
                    <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                </div>
            </header>

            <main id="home">
                {/* Hero Section */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-grid">
                            <div className="hero-content">
                                <div className="section-tag">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    Official University Platform
                                </div>
                                <h1 className="hero-headline">
                                    Lost something on <span>campus?</span>
                                </h1>
                                <p className="hero-description">
                                    The AI-powered campus recovery network. Students, staff, and campus security quickly report, search, match, and securely recover lost belongings.
                                </p>

                                <div className="hero-cta-group">
                                    <Link to="/reportlost" className="btn btn-primary btn-lg">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                        Report Lost Item
                                    </Link>
                                    <Link to="/marketplace" className="btn btn-secondary btn-lg">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                        Browse Found Items
                                    </Link>
                                </div>

                                <div className="hero-trust-badges">
                                    <div className="avatar-stack">
                                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student User" />
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Staff User" />
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student User" />
                                    </div>
                                    <div className="trust-text">
                                        Joined by <strong>18,000+ students</strong> &amp; campus staff across 12 faculties.
                                    </div>
                                </div>
                            </div>

                            {/* Hero Visual & Floating Cards */}
                            <div className="hero-visual-wrapper">
                                <div className="hero-main-card">
                                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" alt="Student recovering a lost backpack" />
                                    <div className="hero-card-overlay">
                                        <div className="hero-card-info">
                                            <h4>Central Library Recovery Station</h4>
                                            <p>Verified Item Transfer #4920</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="floating-card float-card-1">
                                    <div className="float-icon blue">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <div className="float-meta">
                                        <label>AI Match Engine</label>
                                        <span>98% Match Detected</span>
                                    </div>
                                </div>

                                <div className="floating-card float-card-2">
                                    <div className="float-icon green">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </div>
                                    <div className="float-meta">
                                        <label>Claim Verified</label>
                                        <span>Student ID Verified</span>
                                    </div>
                                </div>

                                <div className="floating-card float-card-3">
                                    <div className="float-icon amber">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                        </svg>
                                    </div>
                                    <div className="float-meta">
                                        <label>Item Handover</label>
                                        <span>Returned to Owner</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust & Metrics Section */}
                <section className="trust-section" ref={trustSectionRef}>
                    <div className="container">
                        <div className="trust-header">
                            <p>Built for smarter campus communities</p>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-number">{stats.itemsReported.toLocaleString()}+</div>
                                <div className="stat-label">Items Reported</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{stats.itemsRecovered.toLocaleString()}+</div>
                                <div className="stat-label">Items Recovered</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{stats.successfulClaims}%</div>
                                <div className="stat-label">Successful Claims</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{stats.campusStations}+</div>
                                <div className="stat-label">Campus Stations</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="how-it-works" id="how-it-works">
                    <div className="container">
                        <div className="section-header-center">
                            <div className="section-tag">Simple Process</div>
                            <h2 className="section-title">Four steps to recovery</h2>
                            <p className="section-subtitle">Designed to turn a frustrating lost-item scenario into a fast, verified return.</p>
                        </div>

                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-number">01</div>
                                <h3 className="step-title">Report</h3>
                                <p className="step-desc">Submit details and photo of a lost or found item. Describe key features, date, and precise campus location.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-number">02</div>
                                <h3 className="step-title">Search</h3>
                                <p className="step-desc">Filter the live database by location, category, date, or unique tags to find matching campus listings instantly.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-number">03</div>
                                <h3 className="step-title">Match</h3>
                                <p className="step-desc">Automated smart matching links lost reports with found item entries and notifies users via instant alerts.</p>
                            </div>

                            <div className="step-card">
                                <div className="step-number">04</div>
                                <h3 className="step-title">Recover</h3>
                                <p className="step-desc">Verify ownership via security questions or student ID, then collect your item at a designated campus office.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features" id="features">
                    <div className="container">
                        <div className="section-header-center">
                            <div className="section-tag">Enterprise Technology</div>
                            <h2 className="section-title">Intelligent campus features</h2>
                            <p className="section-subtitle">A modern SaaS platform replacing legacy manual lost-and-found clipboards.</p>
                        </div>

                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Smart Search</h3>
                                <p className="feature-desc">Natural language indexing allows students to search with terms like "black hydroflask with stickers near Science Lab".</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Match Detection</h3>
                                <p className="feature-desc">Automated cross-referencing scans incoming found reports against active lost item listings in real-time.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Secure Claims</h3>
                                <p className="feature-desc">Prevent false claims with custom proof-of-ownership questions and encrypted verification workflows.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Real-time Notifications</h3>
                                <p className="feature-desc">Get instant SMS and university email notifications the moment an item matching your description is registered.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Verified Recovery</h3>
                                <p className="feature-desc">QR code handover confirmation logs every return for complete audit transparency across university stations.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3 className="feature-title">Role-based Access</h3>
                                <p className="feature-desc">Dedicated portals for students, faculty, and security administration with custom clearance levels.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories">
                    <div className="container">
                        <div className="section-header-center">
                            <div className="section-tag">Browse Directory</div>
                            <h2 className="section-title">Browse by category</h2>
                            <p className="section-subtitle">Quickly jump into active campus listings divided by item type.</p>
                        </div>

                        <div className="categories-grid">
                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                        <line x1="12" y1="18" x2="12.01" y2="18" />
                                    </svg>
                                </div>
                                <div className="category-name">Electronics</div>
                                <div className="category-count">142 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="16" rx="2" />
                                        <line x1="7" y1="8" x2="17" y2="8" />
                                        <line x1="7" y1="12" x2="13" y2="12" />
                                    </svg>
                                </div>
                                <div className="category-name">ID Cards</div>
                                <div className="category-count">89 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </div>
                                <div className="category-name">Wallets</div>
                                <div className="category-count">34 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <div className="category-name">Books</div>
                                <div className="category-count">67 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                    </svg>
                                </div>
                                <div className="category-name">Keys</div>
                                <div className="category-count">51 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                </div>
                                <div className="category-name">Bags</div>
                                <div className="category-count">98 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                                    </svg>
                                </div>
                                <div className="category-name">Clothing</div>
                                <div className="category-count">112 Items Listed</div>
                            </a>

                            <a href="#recent" className="category-card">
                                <div className="category-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <div className="category-name">Other</div>
                                <div className="category-count">43 Items Listed</div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Recent Items Section */}
                <section className="recent-items" id="recent">
                    <div className="container">
                        <div className="section-header-center">
                            <div className="section-tag">Live Activity</div>
                            <h2 className="section-title">Recent campus listings</h2>
                            <p className="section-subtitle">Real-time inventory updated directly from security desks and student submissions.</p>
                        </div>

                        <div className="filter-tabs">
                            <button
                                className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All Items
                            </button>
                            <button
                                className={`tab-btn ${activeFilter === 'found' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('found')}
                            >
                                Found Items
                            </button>
                            <button
                                className={`tab-btn ${activeFilter === 'lost' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('lost')}
                            >
                                Lost Items
                            </button>
                        </div>

                        <div className="items-grid" id="itemsGrid">
                            {filteredItems.map((item, index) => (
                                <article key={index} className="item-card">
                                    <div className="item-image-wrapper">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            onError={(e) => {
                                                const fb = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';
                                                if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                                            }}
                                        />
                                        <div className="item-status-badge">
                                            <span className={`badge ${item.type === 'found' ? 'badge-success' : 'badge-warning'}`}>
                                                {item.type === 'found' ? 'Found' : 'Lost'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item-content">
                                        <span className="item-category">{item.category}</span>
                                        <h3 className="item-title">{item.title}</h3>
                                        <div className="item-meta-list">
                                            <div className="item-meta-item">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {item.location}
                                            </div>
                                            <div className="item-meta-item">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-card-footer">
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                            Ref: {item.id}
                                        </span>
                                        <a href="#action" className="btn btn-secondary btn-sm" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }}>
                                            {item.actionText}
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section" id="report">
                    <div className="container">
                        <div className="cta-wrapper">
                            <h2 className="cta-title">Help reunite campus belongings with their owners.</h2>
                            <p className="cta-desc">Whether you lost your keys in a lecture hall or found a backpack on the campus lawn, reporting takes less than 60 seconds.</p>
                            <div className="cta-buttons">
                                <a href="#get-started" className="btn btn-primary btn-lg" style={{ backgroundColor: 'white', color: 'var(--color-primary-900)' }}>
                                    Get Started Now
                                </a>
                                <Link to="/contact-security-hub" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none' }}>
                                    Contact Security Hub
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <a href="#home" className="brand-logo" style={{ color: 'white' }}>
                                <div className="logo-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <span className="brand-name" style={{ color: 'white' }}>Campus<span style={{ color: '#60a5fa' }}>Smart</span></span>
                            </a>
                            <p>The official intelligent recovery network for university campuses. Empowering students and staff to return lost items safely.</p>
                        </div>

                        <div>
                            <h4 className="footer-heading">Platform</h4>
                            <div className="footer-links">
                                <a href="#recent">Search Inventory</a>
                                <a href="#report">Report Lost Item</a>
                                <a href="#report">Report Found Item</a>
                                <a href="#how-it-works">How It Works</a>
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
                        <div style={{ display: 'flex', gap: '1.75rem', flexShrink: 0 }}>
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