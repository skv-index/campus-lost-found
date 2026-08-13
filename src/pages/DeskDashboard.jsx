import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeskDashboard.css';

// ── Helpers ────────────────────────────────────────────────────────────────────
const getInitials = (name = '') =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || 'DK';

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const claimStatusClass = (status = '') => {
    const s = status.toLowerCase();
    if (s.includes('approved')) return 'ready';
    if (s.includes('rejected')) return 'rejected';
    if (s.includes('recovered')) return 'custody';
    if (s.includes('information')) return 'verified';
    return 'pending'; // Under Review / default
};

const itemStatusClass = (status = '') => {
    const s = status.toLowerCase();
    if (s.includes('resolved') || s.includes('claimed')) return 'custody';
    if (s.includes('verification')) return 'verified';
    return 'pending';
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function DeskDashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    const [claims, setClaims] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [toast, setToast] = useState({ type: '', text: '' });
    const showToast = (type, text) => {
        setToast({ type, text });
        setTimeout(() => setToast({ type: '', text: '' }), 4000);
    };

    // ── Fetch Dashboard Data ──────────────────────────────────────────────────
    const fetchDashboardData = useCallback(async (token) => {
        setDataLoading(true);
        try {
            const [claimsRes, itemsRes] = await Promise.all([
                fetch('/api/claims/all', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch('/api/items?limit=200', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (claimsRes.ok) {
                setClaims(await claimsRes.json());
            } else {
                console.error('Claims fetch failed:', claimsRes.status);
            }

            if (itemsRes.ok) {
                const payload = await itemsRes.json();
                // GET /api/items returns { items, totalItems, page, pages }
                const allItemsList = Array.isArray(payload) ? payload : (payload.items || []);
                setAllItems(allItemsList);
                setFoundItems(allItemsList.filter((i) => i.type === 'Found'));
            } else {
                console.error('Items fetch failed:', itemsRes.status);
            }
        } catch (err) {
            console.error('Dashboard data fetch error:', err);
            showToast('error', 'Could not load data from MongoDB. Check server connection.');
        } finally {
            setDataLoading(false);
        }
    }, []);

    // ── Auth Gate ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }

            try {
                const res = await fetch('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) { navigate('/login'); return; }

                const userData = await res.json();
                if (userData.role !== 'staff' && userData.role !== 'teacher' && userData.role !== 'admin') {
                    setAccessDenied(true);
                    setIsLoading(false);
                    return;
                }

                setUser(userData);
                setIsLoading(false);
                fetchDashboardData(token);
            } catch (err) {
                console.error('Auth error:', err);
                navigate('/login');
            }
        };
        verify();
    }, [fetchDashboardData, navigate]);

    // ── Update Claim Status ───────────────────────────────────────────────────
    const handleUpdateClaimStatus = async (claimId, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/claims/${claimId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Update failed');

            // Update claim in state instantly
            setClaims((prev) =>
                prev.map((c) => (c._id === claimId ? { ...c, status: newStatus } : c))
            );
            // If approved/recovered, also update the item status in local state
            if (newStatus === 'Approved' || newStatus === 'Recovered') {
                const updated = claims.find((c) => c._id === claimId);
                if (updated?.item?._id) {
                    setFoundItems((prev) =>
                        prev.map((i) =>
                            i._id === updated.item._id ? { ...i, status: 'Resolved / Claimed' } : i
                        )
                    );
                }
            }
            showToast('success', `Claim status updated to "${newStatus}"`);
        } catch (err) {
            showToast('error', err.message || 'Failed to update claim status.');
        }
    };

    // ── Update Item Status ────────────────────────────────────────────────────
    const handleUpdateItemStatus = async (itemId, newStatus) => {
        const token = localStorage.getItem('token');
        // We add a PATCH/PUT endpoint or use existing — for now, give a friendly message
        // Items route doesn't have a status update endpoint yet — add it
        try {
            const res = await fetch(`/api/items/${itemId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Update failed');
            setFoundItems((prev) =>
                prev.map((i) => (i._id === itemId ? { ...i, status: newStatus } : i))
            );
            showToast('success', `Item status updated to "${newStatus}"`);
        } catch (err) {
            showToast('error', err.message || 'Could not update item status.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleRefresh = () => {
        const token = localStorage.getItem('token');
        if (token) fetchDashboardData(token);
    };

    // ── Derived Stats ─────────────────────────────────────────────────────────
    const pendingClaims   = claims.filter((c) => c.status === 'Under Review');
    const openClaims      = claims.filter((c) => !['Approved', 'Rejected', 'Recovered'].includes(c.status));
    const unclaimedItems  = foundItems.filter((i) => i.status === 'Active / Unclaimed');
    const resolvedItems   = foundItems.filter((i) => i.status === 'Resolved / Claimed');
    const lostItems       = allItems.filter((i) => i.type === 'Lost' && i.status === 'Active / Unclaimed');

    // ── Loading ───────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#64748b' }}>Verifying access credentials…</p>
            </div>
        );
    }

    // ── Access Denied ─────────────────────────────────────────────────────────
    if (accessDenied) {
        return (
            <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    textAlign: 'center', background: '#fff', borderRadius: '18px',
                    padding: '3rem 2.5rem', border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px rgba(15,23,42,0.08)', maxWidth: '480px',
                }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: '#fef2f2', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 1.5rem',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </div>
                    <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.625rem', color: '#0f172a' }}>
                        Access Restricted
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                        The <strong>Desk Operations Dashboard</strong> is exclusively accessible to
                        teachers and staff members. Students do not have permission to view this area.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: '#1e3a8a', color: '#fff', border: 'none',
                            borderRadius: '10px', padding: '0.75rem 1.5rem',
                            fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        Return to Student Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // ── Full Dashboard ─────────────────────────────────────────────────────────
    return (
        <div className="app-container">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div>
                    <div className="sidebar-brand">
                        <div className="brand-logo">
                            <div className="brand-shield">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <div className="brand-text">
                                <span className="brand-title">Campus Smart</span>
                                <span className="brand-subtitle">Desk Operations</span>
                            </div>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <span className="nav-link active">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                            Dashboard
                        </span>
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAVBAR */}
                <header className="top-navbar">
                    <div className="desk-indicator">
                        <span className="desk-indicator-dot"></span>
                        Central Security &amp; Operations Desk
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={handleRefresh}
                            disabled={dataLoading}
                            style={{
                                background: 'var(--color-surface-subtle)',
                                border: '1px solid var(--color-border-subtle)',
                                borderRadius: '8px', padding: '0.375rem 0.75rem',
                                fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                                color: 'var(--color-text-muted)', display: 'flex',
                                alignItems: 'center', gap: '0.375rem',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                            {dataLoading ? 'Refreshing…' : 'Refresh'}
                        </button>

                        <div className="officer-profile">
                            <div className="officer-avatar">{getInitials(user?.fullName)}</div>
                            <div className="officer-meta">
                                <span className="officer-name">{user?.fullName || 'Desk Officer'}</span>
                                <span className="officer-role" style={{ textTransform: 'capitalize' }}>
                                    {user?.role} — {user?.department || 'Operations'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="content-body">
                    {/* PAGE HEADER */}
                    <div className="page-header">
                        <div className="header-title-group">
                            <h1>Desk Operations Dashboard</h1>
                            <p>Monitor and manage all campus lost &amp; found activity in real time.</p>
                        </div>
                        <div className="live-clock">
                            {new Date().toLocaleString('en-IN', {
                                weekday: 'short', day: '2-digit', month: 'short',
                                hour: '2-digit', minute: '2-digit',
                            })} IST
                        </div>
                    </div>

                    {/* TOAST */}
                    {toast.text && (
                        <div style={{
                            padding: '0.875rem 1.25rem', borderRadius: '10px',
                            fontWeight: 600, fontSize: '0.875rem',
                            background: toast.type === 'success' ? '#f0fdf4' : '#fff1f2',
                            color: toast.type === 'success' ? '#166534' : '#991b1b',
                            border: `1px solid ${toast.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
                        }}>
                            {toast.text}
                        </div>
                    )}

                    {/* STATS CARDS */}
                    <div className="stats-grid">
                        <div className="stat-card warning">
                            <div className="stat-top">
                                <span className="stat-label">Claims Awaiting Review</span>
                                <div className="stat-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-value">{dataLoading ? '—' : pendingClaims.length}</div>
                        </div>

                        <div className="stat-card info">
                            <div className="stat-top">
                                <span className="stat-label">Total Open Claims</span>
                                <div className="stat-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-value">{dataLoading ? '—' : openClaims.length}</div>
                        </div>

                        <div className="stat-card primary">
                            <div className="stat-top">
                                <span className="stat-label">Found Items (Unclaimed)</span>
                                <div className="stat-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-value">{dataLoading ? '—' : unclaimedItems.length}</div>
                        </div>

                        <div className="stat-card success">
                            <div className="stat-top">
                                <span className="stat-label">Items Returned to Owners</span>
                                <div className="stat-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-value">{dataLoading ? '—' : resolvedItems.length}</div>
                        </div>
                    </div>

                    {/* URGENT ACTIONS */}
                    {!dataLoading && (pendingClaims.length > 0 || lostItems.length > 0 || resolvedItems.length > 0) && (
                        <section className="urgent-section">
                            <div className="section-title-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                Live Operations Queue
                            </div>
                            <div className="urgent-grid">
                                {pendingClaims.length > 0 && (
                                    <div className="urgent-card amber">
                                        <div className="urgent-info">
                                            <span className="urgent-dot"></span>
                                            <span className="urgent-text">
                                                {pendingClaims.length} claim{pendingClaims.length > 1 ? 's' : ''} awaiting your review
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#b45309' }}>
                                            ↓ See queue below
                                        </span>
                                    </div>
                                )}
                                {lostItems.length > 0 && (
                                    <div className="urgent-card blue">
                                        <div className="urgent-info">
                                            <span className="urgent-dot"></span>
                                            <span className="urgent-text">
                                                {lostItems.length} unmatched lost item{lostItems.length > 1 ? 's' : ''} in database
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1d4ed8' }}>
                                            ↓ See items below
                                        </span>
                                    </div>
                                )}
                                {resolvedItems.length > 0 && (
                                    <div className="urgent-card green">
                                        <div className="urgent-info">
                                            <span className="urgent-dot"></span>
                                            <span className="urgent-text">
                                                {resolvedItems.length} item{resolvedItems.length > 1 ? 's' : ''} successfully returned
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#15803d' }}>
                                            ✓ Completed
                                        </span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* ── CLAIMS QUEUE TABLE ─────────────────────────────────────── */}
                    <section className="panel-card">
                        <div className="panel-header">
                            <div className="panel-title-group">
                                <h2 className="panel-title">Claims Processing Queue</h2>
                                <span className="count-pill">
                                    {dataLoading ? 'Loading…' : `${claims.length} Total • ${pendingClaims.length} Pending`}
                                </span>
                            </div>
                        </div>
                        <div className="data-table-wrapper">
                            {dataLoading ? (
                                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                                    Loading claims from MongoDB…
                                </div>
                            ) : claims.length === 0 ? (
                                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                                    <p style={{ fontWeight: 600 }}>No claims submitted yet.</p>
                                    <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Claims will appear here once students submit them.</p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Claimant</th>
                                            <th>Justification</th>
                                            <th>Unique Features</th>
                                            <th>Submitted</th>
                                            <th>Current Status</th>
                                            <th style={{ textAlign: 'right' }}>Update Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim) => (
                                            <tr key={claim._id}>
                                                <td>
                                                    <div className="item-cell">
                                                        <span className="item-name">
                                                            {claim.item?.title || 'Unknown Item'}
                                                        </span>
                                                        <span className="item-sub">
                                                            {claim.item?.category || '—'} • {claim.item?.location || '—'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="user-cell">
                                                        <span className="user-name">
                                                            {claim.claimant?.fullName || 'Unknown'}
                                                        </span>
                                                        <span className="user-id">
                                                            {claim.claimant?.studentId
                                                                ? `ID: ${claim.claimant.studentId}`
                                                                : claim.claimant?.email || '—'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={{ maxWidth: '200px' }}>
                                                    <span
                                                        className="evidence-tag"
                                                        title={claim.claimReason}
                                                        style={{ whiteSpace: 'normal', lineHeight: 1.4 }}
                                                    >
                                                        {(claim.claimReason || '').slice(0, 60)}
                                                        {claim.claimReason?.length > 60 ? '…' : ''}
                                                    </span>
                                                </td>
                                                <td style={{ maxWidth: '180px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                                                    {(claim.identifyingFeatures || '').slice(0, 50)}
                                                    {claim.identifyingFeatures?.length > 50 ? '…' : ''}
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap', fontSize: '0.8125rem' }}>
                                                    {formatDate(claim.createdAt)}
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${claimStatusClass(claim.status)}`}>
                                                        {claim.status || 'Under Review'}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <select
                                                        className="btn-table-action"
                                                        value=""
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                handleUpdateClaimStatus(claim._id, e.target.value);
                                                            }
                                                        }}
                                                    >
                                                        <option value="" disabled>Change…</option>
                                                        <option value="Under Review">Under Review</option>
                                                        <option value="More Information Required">More Info Required</option>
                                                        <option value="Approved">✓ Approve</option>
                                                        <option value="Rejected">✗ Reject</option>
                                                        <option value="Recovered">✓ Mark Recovered</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>

                    {/* ── FOUND ITEMS TABLE ──────────────────────────────────────── */}
                    <section className="panel-card">
                        <div className="panel-header">
                            <div className="panel-title-group">
                                <h2 className="panel-title">Found Items Registry</h2>
                                <span className="count-pill">
                                    {dataLoading ? 'Loading…' : `${foundItems.length} Found • ${unclaimedItems.length} Unclaimed`}
                                </span>
                            </div>
                        </div>
                        <div className="data-table-wrapper">
                            {dataLoading ? (
                                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                                    Loading items from MongoDB…
                                </div>
                            ) : foundItems.length === 0 ? (
                                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                                    <p style={{ fontWeight: 600 }}>No found items logged yet.</p>
                                    <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Items will appear here once they are reported.</p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Tracking</th>
                                            <th>Item</th>
                                            <th>Category</th>
                                            <th>Found Location</th>
                                            <th>Reporter</th>
                                            <th>Date Logged</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foundItems.map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <span className="claim-id">{item.trackingCode || '—'}</span>
                                                </td>
                                                <td>
                                                    <div className="item-cell">
                                                        <span className="item-name">{item.title || 'Unnamed Item'}</span>
                                                        {item.brand && (
                                                            <span className="item-sub">{item.brand} {item.color ? `• ${item.color}` : ''}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>{item.category || '—'}</td>
                                                <td>
                                                    <div className="item-cell">
                                                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.location || '—'}</span>
                                                        {item.specificLocation && (
                                                            <span className="item-sub">{item.specificLocation}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="user-cell">
                                                        <span className="user-name">{item.reporterName || 'Anonymous'}</span>
                                                        {item.reporterContact && (
                                                            <span className="user-id">{item.reporterContact}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ whiteSpace: 'nowrap', fontSize: '0.8125rem' }}>
                                                    {formatDate(item.createdAt)}
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${itemStatusClass(item.status)}`}>
                                                        {item.status || 'Active / Unclaimed'}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <select
                                                        className="btn-table-action"
                                                        value=""
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                handleUpdateItemStatus(item._id, e.target.value);
                                                            }
                                                        }}
                                                    >
                                                        <option value="" disabled>Change…</option>
                                                        <option value="Active / Unclaimed">Active / Unclaimed</option>
                                                        <option value="Under Verification">Under Verification</option>
                                                        <option value="Resolved / Claimed">Resolved / Claimed</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}