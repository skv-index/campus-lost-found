import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import StatusBadge from '../component/StatusBadge';
import './Dashboard.css';
import API_BASE from '../config/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [matches, setMatches] = useState([]);
    const [isLoadingMatches, setIsLoadingMatches] = useState(true);

    // User Authentication State from LocalStorage / Database
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        try {
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    const [dbItems, setDbItems] = useState([]);
    const [dbClaims, setDbClaims] = useState([]);

    // 1. Load User Profile from Database (/api/auth/me)
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch(`${API_BASE}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                }
            } catch (error) {
                console.error('Error fetching profile from database:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // 2. Fetch Matches & Live Items / Claims from Database
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');

                const matchesRes = await fetch(`${API_BASE}/api/items/matches`);
                if (matchesRes.ok) {
                    setMatches(await matchesRes.json());
                }

                const itemsRes = await fetch(`${API_BASE}/api/items?limit=100`);
                if (itemsRes.ok) {
                    const payload = await itemsRes.json();
                    const list = Array.isArray(payload) ? payload : (payload.items || []);
                    setDbItems(list);
                }

                if (token) {
                    const claimsRes = await fetch(`${API_BASE}/api/claims/mine`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (claimsRes.ok) {
                        setDbClaims(await claimsRes.json());
                    }
                }
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setIsLoadingMatches(false);
            }
        };

        loadDashboardData();
    }, []);

    // Time of day greeting helper
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const formatMatchDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    // Compute dynamic dashboard stats
    const lostCount = dbItems.filter(i => i.type === 'Lost').length;
    const foundCount = dbItems.filter(i => i.type === 'Found').length;
    const claimsCount = dbClaims.length;
    const recoveredCount = dbItems.filter(i => i.status === 'Resolved / Claimed' || i.status === 'Recovered').length;

    const statsData = [
        {
            id: 1,
            value: dbItems.length > 0 ? String(lostCount) : '3',
            label: 'Lost Reports',
            iconClass: 'stat-icon-blue',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            )
        },
        {
            id: 2,
            value: dbItems.length > 0 ? String(foundCount) : '2',
            label: 'Found Reports',
            iconClass: 'stat-icon-amber',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            )
        },
        {
            id: 3,
            value: dbClaims.length > 0 ? String(claimsCount) : '1',
            label: 'Active Claims',
            iconClass: 'stat-icon-purple',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                </svg>
            )
        },
        {
            id: 4,
            value: dbItems.length > 0 ? String(recoveredCount) : '4',
            label: 'Recovered Items',
            iconClass: 'stat-icon-green',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            )
        }
    ];

    const fallbackReports = [
        {
            id: 'TRK-98201',
            name: 'Brown Leather Wallet',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&auto=format&fit=crop&q=60',
            category: 'Personal Access',
            location: 'Central Library 2F',
            date: 'Aug 08, 2026',
            statusType: 'match',
            statusText: 'Possible Match'
        },
        {
            id: 'TRK-88120',
            name: 'MacBook Air M2',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&auto=format&fit=crop&q=60',
            category: 'Electronics',
            location: 'Tech Lab 304',
            date: 'Aug 05, 2026',
            statusType: 'claim',
            statusText: 'Claim Submitted'
        },
        {
            id: 'TRK-74109',
            name: 'Hostel Key Set',
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&auto=format&fit=crop&q=60',
            category: 'Keys / Badges',
            location: 'Cafeteria Block B',
            date: 'Aug 01, 2026',
            statusType: 'reported',
            statusText: 'Reported'
        },
        {
            id: 'TRK-60912',
            name: 'Sony WH-1000XM4',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=60',
            category: 'Audio Gadgets',
            location: 'Sports Complex',
            date: 'Jul 28, 2026',
            statusType: 'recovered',
            statusText: 'Recovered'
        }
    ];

    const activeReportsData = dbItems.length > 0
        ? dbItems.slice(0, 4).map((item) => ({
            id: item.trackingCode || item._id,
            name: item.title,
            image: item.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=100&auto=format&fit=crop&q=60',
            category: item.category,
            location: item.location,
            date: new Date(item.date || item.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            statusType: item.type === 'Found' ? 'match' : (item.status?.toLowerCase().includes('claimed') ? 'recovered' : 'reported'),
            statusText: item.status || item.type,
        }))
        : fallbackReports;

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen((prev) => !prev);
    };

    const userDisplayName = user?.fullName || 'Vignesh';
    const userRoleDisplay = user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Student';
    const avatarInitial = userDisplayName ? userDisplayName.charAt(0).toUpperCase() : 'V';

    return (
        <div className="app-layout">
            {/* 1. PERSISTENT LEFT SIDEBAR */}
            <Sidebar activePage="dashboard" mobileOpen={isMobileSidebarOpen} />

            {/* MAIN CONTENT WRAPPER */}
            <div className="main-wrapper">
                {/* 2. TOP NAVIGATION BAR */}
                <header className="top-bar">
                    <button className="mobile-toggle" onClick={toggleMobileSidebar} aria-label="Toggle Navigation Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    <div className="top-actions">
                        <div className="user-profile">
                            <div className="avatar">
                                {user?.avatar && user.avatar.startsWith('http') ? (
                                    <img src={user.avatar} alt={userDisplayName} className="user-avatar-img" />
                                ) : (
                                    avatarInitial
                                )}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{userDisplayName}</span>
                                <span className="role-badge">{userRoleDisplay}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 3. DASHBOARD MAIN CONTENT */}
                <main className="content-container">
                    {/* Welcome Section */}
                    <section className="welcome-header">
                        <div>
                            <h1 className="welcome-title">{getGreeting()}, {userDisplayName}</h1>
                            <p className="welcome-subtitle">Here's what's happening with your lost &amp; found activity.</p>
                        </div>
                    </section>

                    {/* Statistics Grid */}
                    <section className="stats-grid">
                        {statsData.map((stat) => (
                            <div className="stat-card" key={stat.id}>
                                <div>
                                    <div className="stat-val">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                                <div className={`stat-icon-wrapper ${stat.iconClass}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Quick Actions Grid */}
                    <section>
                        <h2 className="section-title">Quick Actions</h2>
                        <div className="quick-actions-grid">
                            <Link to="/reportlost" className="action-card action-card-primary">
                                <div className="action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="action-title">Report Lost Item</div>
                                    <div className="action-desc">Instantly alert campus security and AI matching algorithm.</div>
                                </div>
                            </Link>

                            <Link to="/reportfound" className="action-card">
                                <div className="action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="action-title">Report Found Item</div>
                                    <div className="action-desc">Turn in an item found around campus or library hubs.</div>
                                </div>
                            </Link>

                            <Link to="/marketplace" className="action-card">
                                <div className="action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="action-title">Browse Found Items</div>
                                    <div className="action-desc">Filter through public index of secure uncollected items.</div>
                                </div>
                            </Link>
                        </div>
                    </section>

                    {/* 2-COLUMN MAIN CONTENT GRID */}
                    <div className="dashboard-grid-2col">
                        {/* Left: Active Reports */}
                        <div className="panel-card">
                            <div className="panel-header">
                                <h2 className="section-title" style={{ margin: 0 }}>Active Reports</h2>
                                <Link to="/marketplace" className="view-all-link">View All</Link>
                            </div>

                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Category</th>
                                            <th>Location</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeReportsData.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="item-cell">
                                                        <img src={item.image} className="item-thumb" alt={item.name} />
                                                        <div>
                                                            <div className="item-name">{item.name}</div>
                                                            <div className="item-id">{item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.category}</td>
                                                <td>{item.location}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <StatusBadge type={item.statusType} text={item.statusText} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Column: Matches & Activity */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Possible Matches Card */}
                            <div className="panel-card">
                                <div className="panel-header">
                                    <h2 className="section-title" style={{ margin: 0 }}>Possible Matches</h2>
                                    <StatusBadge type="match" text={`${matches.length} New`} />
                                </div>

                                <div className="matches-list">
                                    {isLoadingMatches && <p className="match-subtitle">Checking saved reports...</p>}
                                    {!isLoadingMatches && matches.length === 0 && (
                                        <p className="match-subtitle">No evidence-based matches yet. New reports are checked automatically.</p>
                                    )}
                                    {matches.map(({ lost, found, score }) => (
                                        <div className="match-card" key={`${lost._id}-${found._id}`}>
                                            <span className="match-score-pill">{score}% Match</span>
                                            <div>
                                                <div className="match-item-title">{lost.title}</div>
                                                <div className="match-subtitle">Lost report ({lost.trackingCode})</div>
                                            </div>
                                            <div className="match-comparison">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent-purple)' }}>
                                                    <path d="M16 3h5v5" /><path d="M8 21H3v-5" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" />
                                                </svg>
                                                <div>
                                                    <div className="match-item-title" style={{ fontSize: '0.8125rem' }}>Found: {found.title}</div>
                                                    <div className="match-subtitle">Found at {found.location} - {formatMatchDate(found.date)}</div>
                                                </div>
                                            </div>
                                            <Link to={`/submitclaim?itemId=${found._id}`} className="btn-sm btn-match">
                                                <span>View Match &amp; Claim</span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity Timeline */}
                            <div className="panel-card">
                                <div className="panel-header">
                                    <h2 className="section-title" style={{ margin: 0 }}>Recent Activity</h2>
                                </div>

                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot" />
                                        <div className="timeline-title">Possible Match Detected</div>
                                        <div className="timeline-desc">AI matched your 'Brown Leather Wallet' with an item turned into Library Desk.</div>
                                        <div className="timeline-time">Today, 2:15 PM</div>
                                    </div>

                                    <div className="timeline-item">
                                        <div className="timeline-dot" style={{ borderColor: 'var(--color-accent-amber)' }} />
                                        <div className="timeline-title">Claim Under Review</div>
                                        <div className="timeline-desc">Security team is reviewing ownership verification for 'MacBook Air M2'.</div>
                                        <div className="timeline-time">Yesterday, 10:40 AM</div>
                                    </div>

                                    <div className="timeline-item">
                                        <div className="timeline-dot" style={{ borderColor: 'var(--color-accent-green)' }} />
                                        <div className="timeline-title">Item Recovered</div>
                                        <div className="timeline-desc">'Sony WH-1000XM4' was handed back at Security Post A.</div>
                                        <div className="timeline-time">Aug 02, 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
