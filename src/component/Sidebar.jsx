import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Shared Sidebar component used across all pages.
 * @param {string} activePage - One of: 'dashboard' | 'reportlost' | 'reportfound' | 'marketplace' | 'myclaims' | 'profile'
 * @param {boolean} mobileOpen - Whether the sidebar is open on mobile
 */
const Sidebar = ({ activePage = 'dashboard', mobileOpen = false }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        {
            key: 'dashboard',
            to: '/dashboard',
            label: 'Dashboard',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            ),
        },
        {
            key: 'reportlost',
            to: '/reportlost',
            label: 'Report Lost',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            ),
        },
        {
            key: 'reportfound',
            to: '/reportfound',
            label: 'Report Found',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
        },
        {
            key: 'marketplace',
            to: '/marketplace',
            label: 'Browse Items',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            ),
        },
        {
            key: 'myclaims',
            to: '/myclaims',
            label: 'My Claims',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            ),
        },
    ];

    return (
        <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
            <div>
                {/* Brand */}
                <div className="sidebar-brand">
                    <Link to="/dashboard" className="brand-logo">
                        <div className="brand-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

                {/* Main Menu */}
                <nav className="sidebar-menu">
                    <div className="menu-category">Main Menu</div>
                    {navItems.map((item) => (
                        <Link
                            key={item.key}
                            to={item.to}
                            className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                    {/* Account Section */}
                    <div className="menu-category">Account</div>
                    <Link
                        to="/profile"
                        className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                    </Link>
                </nav>
            </div>

            {/* Footer: Logout */}
            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;