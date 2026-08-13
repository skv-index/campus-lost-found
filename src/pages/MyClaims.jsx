import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import StatusBadge from '../component/StatusBadge';
import './MyClaims.css';
import API_BASE from '../config/api';

const MyClaims = () => {
    const navigate = useNavigate();

    const [claims, setClaims] = useState([]);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const claimCount = (statuses) => claims.filter((claim) => statuses.includes(claim.status)).length;

    const loadClaims = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch(`${API_BASE}/api/claims/mine`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401 || response.status === 403) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            if (!response.ok) throw new Error('Could not load claims from database.');

            const data = await response.json();
            const loadedClaims = data.map((claim) => ({
                id: claim._id,
                databaseId: claim._id,
                title: claim.item?.title || 'Item No Longer Available',
                displayName: claim.item?.title || 'Item No Longer Available',
                claimId: `CLM-${claim._id.slice(-6).toUpperCase()}`,
                date: new Date(claim.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                status: claim.status || 'Under Review',
                updated: new Date(claim.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                imgSrc: claim.item?.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=150&q=80',
                claimReason: claim.claimReason,
                identifyingFeatures: claim.identifyingFeatures,
                purchaseDate: claim.purchaseDate ? new Date(claim.purchaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null,
                previousLocation: claim.previousLocation,
                additionalDetails: claim.additionalDetails,
                itemLocation: claim.item?.location,
                itemCategory: claim.item?.category,
            }));

            setClaims(loadedClaims);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error loading claims:', error);
            setErrorMessage('Could not connect to database or retrieve claims.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadClaims();
    }, []);

    const handleOpenDrawer = (claim) => {
        setSelectedClaim(claim);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleWithdrawClaim = async (claimId) => {
        if (!window.confirm('Are you sure you want to withdraw this claim? This action cannot be undone.')) {
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Your session has expired. Please sign in again.');
            navigate('/login');
            return;
        }

        setIsWithdrawing(true);
        try {
            const response = await fetch(`${API_BASE}/api/claims/${claimId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to withdraw claim.');
            alert('Claim successfully withdrawn.');
            setIsDrawerOpen(false);
            setSelectedClaim(null);
            loadClaims();
        } catch (err) {
            alert(err.message || 'Error withdrawing claim.');
        } finally {
            setIsWithdrawing(false);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar activePage="myclaims" />

            <div className="main-wrapper">
                <header className="top-bar">
                    <nav className="breadcrumb">
                        <Link to="/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>My Claims</span>
                    </nav>
                </header>

                <main className="content-container">
                    <div className="page-header">
                        <div className="page-title-group">
                            <h1 className="page-title">My Claims</h1>
                            <p className="page-subtitle">Track the status of your item recovery requests in real time.</p>
                        </div>

                        <button onClick={() => navigate('/marketplace')} className="btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Submit New Claim
                        </button>
                    </div>

                    {!isAuthenticated ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <h3 className="empty-state-title">Sign In Required</h3>
                            <p className="empty-state-text">
                                Please sign in to your student or staff account to view and track your submitted claims.
                            </p>
                            <button onClick={() => navigate('/login')} className="btn-primary">
                                Sign In Now
                            </button>
                        </div>
                    ) : isLoading ? (
                        <div className="empty-state">
                            <h3 className="empty-state-title">Connecting to Database...</h3>
                            <p className="empty-state-text">Fetching your claim history from MongoDB Atlas.</p>
                        </div>
                    ) : errorMessage ? (
                        <div className="empty-state">
                            <h3 className="empty-state-title">Database Error</h3>
                            <p className="empty-state-text">{errorMessage}</p>
                            <button onClick={loadClaims} className="btn-primary">
                                Retry Connection
                            </button>
                        </div>
                    ) : claims.length > 0 ? (
                        <>
                            <div id="stats-container" className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-info">
                                        <span className="stat-label">Pending Claims</span>
                                        <span className="stat-value">{claimCount(['Under Review', 'More Information Required'])}</span>
                                    </div>
                                    <div className="stat-icon-wrapper stat-icon-pending">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <span className="stat-label">Approved</span>
                                        <span className="stat-value">{claimCount(['Approved'])}</span>
                                    </div>
                                    <div className="stat-icon-wrapper stat-icon-approved">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <span className="stat-label">Rejected</span>
                                        <span className="stat-value">{claimCount(['Rejected'])}</span>
                                    </div>
                                    <div className="stat-icon-wrapper stat-icon-rejected">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="15" y1="9" x2="9" y2="15" />
                                            <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-info">
                                        <span className="stat-label">Recovered</span>
                                        <span className="stat-value">{claimCount(['Recovered'])}</span>
                                    </div>
                                    <div className="stat-icon-wrapper stat-icon-recovered">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div id="table-container" className="table-card">
                                <div className="table-toolbar">
                                    <h2 className="table-title">Submitted Recovery Claims ({claims.length})</h2>
                                </div>

                                <table className="claims-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Claim ID</th>
                                            <th>Submitted Date</th>
                                            <th>Status</th>
                                            <th>Last Updated</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map((claim) => (
                                            <tr key={claim.id} className="claim-row" onClick={() => handleOpenDrawer(claim)}>
                                                <td>
                                                    <div className="item-info">
                                                        <img src={claim.imgSrc} className="item-img" alt={claim.displayName} />
                                                        <div>
                                                            <div className="item-name">{claim.displayName}</div>
                                                            {claim.itemLocation && (
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                                    Location: {claim.itemLocation}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="claim-id-tag">{claim.claimId}</span>
                                                </td>
                                                <td>{claim.date}</td>
                                                <td>
                                                    <StatusBadge status={claim.status} />
                                                </td>
                                                <td>{claim.updated}</td>
                                                <td>
                                                    <button
                                                        className="btn-view"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenDrawer(claim);
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div id="empty-state" className="empty-state">
                            <div className="empty-state-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>
                            <h3 className="empty-state-title">No Claims Submitted Yet</h3>
                            <p className="empty-state-text">
                                If you've misplaced an item on campus, browse through our lost and found listings to submit a claim.
                            </p>
                            <button onClick={() => navigate('/marketplace')} className="btn-primary">
                                Browse Found Items
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* CLAIM DETAILS & TIMELINE DRAWER */}
            <div
                id="drawer-overlay"
                className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
                onClick={handleCloseDrawer}
            >
                <div className="drawer" onClick={(e) => e.stopPropagation()}>
                    <div className="drawer-header">
                        <h3 className="drawer-title">Claim Verification Details</h3>
                        <button className="close-btn" onClick={handleCloseDrawer}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div className="drawer-body">
                        {/* Selected Item Summary */}
                        <div className="drawer-item-box">
                            <img
                                id="drawer-img"
                                src={selectedClaim?.imgSrc || ''}
                                className="drawer-item-img"
                                alt={selectedClaim?.title || 'Item'}
                            />
                            <div className="drawer-item-details">
                                <span id="drawer-item-title" className="drawer-item-title">
                                    {selectedClaim?.title || 'Item Name'}
                                </span>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span id="drawer-claim-id" className="claim-id-tag">
                                        {selectedClaim?.claimId || 'CLM-0000'}
                                    </span>
                                    {selectedClaim?.status && <StatusBadge status={selectedClaim.status} />}
                                </div>
                            </div>
                        </div>

                        {/* Submitted Claim Proof & Justification */}
                        <div className="drawer-details-card">
                            <div className="drawer-details-title">Submitted Ownership Details</div>

                            <div className="drawer-detail-field">
                                <span className="drawer-detail-label">Claim Justification</span>
                                <div className="drawer-detail-value">
                                    {selectedClaim?.claimReason || 'No justification specified.'}
                                </div>
                            </div>

                            <div className="drawer-detail-field">
                                <span className="drawer-detail-label">Unique Identifying Features</span>
                                <div className="drawer-detail-value">
                                    {selectedClaim?.identifyingFeatures || 'No specific features provided.'}
                                </div>
                            </div>

                            {selectedClaim?.purchaseDate && (
                                <div className="drawer-detail-field">
                                    <span className="drawer-detail-label">Approximate Purchase Date</span>
                                    <div className="drawer-detail-value">{selectedClaim.purchaseDate}</div>
                                </div>
                            )}

                            {selectedClaim?.previousLocation && (
                                <div className="drawer-detail-field">
                                    <span className="drawer-detail-label">Last Known Location Prior to Loss</span>
                                    <div className="drawer-detail-value">{selectedClaim.previousLocation}</div>
                                </div>
                            )}

                            {selectedClaim?.additionalDetails && (
                                <div className="drawer-detail-field">
                                    <span className="drawer-detail-label">Additional Proof or Context</span>
                                    <div className="drawer-detail-value">{selectedClaim.additionalDetails}</div>
                                </div>
                            )}
                        </div>

                        {/* Progress Timeline */}
                        <div>
                            <div className="timeline-section-title">Recovery Progress Tracker</div>

                            <div className="timeline" id="timeline-steps">
                                {/* Timeline Step 1 */}
                                <div className="timeline-item completed">
                                    <div className="timeline-node"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Claim Submitted</div>
                                        <div className="timeline-desc">Submitted ownership details for verification.</div>
                                        <div className="timeline-time">
                                            {selectedClaim?.date || 'Date recorded'}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Step 2 */}
                                <div className="timeline-item completed">
                                    <div className="timeline-node"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Desk Received</div>
                                        <div className="timeline-desc">Assigned to Central Lost & Found Security Desk staff.</div>
                                        <div className="timeline-time">
                                            {selectedClaim?.date || 'Date recorded'}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Step 3 */}
                                <div
                                    className={`timeline-item ${selectedClaim?.status === 'Under Review' || selectedClaim?.status === 'More Information Required'
                                        ? 'active'
                                        : 'completed'
                                        }`}
                                >
                                    <div className="timeline-node"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Verification</div>
                                        <div className="timeline-desc">
                                            {selectedClaim?.status === 'More Information Required'
                                                ? 'Action required: Security requested additional proof.'
                                                : 'Desk staff matching serial numbers & unique markings.'}
                                        </div>
                                        <div className="timeline-time">
                                            {selectedClaim?.status === 'Under Review' ? 'In Progress' : `Status: ${selectedClaim?.status}`}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Step 4 */}
                                <div
                                    className={`timeline-item ${selectedClaim?.status === 'Approved' || selectedClaim?.status === 'Recovered'
                                        ? 'completed'
                                        : selectedClaim?.status === 'Rejected'
                                            ? 'active'
                                            : ''
                                        }`}
                                >
                                    <div className="timeline-node"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Decision</div>
                                        <div className="timeline-desc">
                                            {selectedClaim?.status === 'Approved'
                                                ? 'Claim approved! Item ready for pickup.'
                                                : selectedClaim?.status === 'Rejected'
                                                    ? 'Claim rejected. Contact security desk for details.'
                                                    : 'Verification outcome decision pending desk review.'}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Step 5 */}
                                <div
                                    className={`timeline-item ${selectedClaim?.status === 'Recovered'
                                        ? 'completed'
                                        : selectedClaim?.status === 'Approved'
                                            ? 'active'
                                            : ''
                                        }`}
                                >
                                    <div className="timeline-node"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Recovery</div>
                                        <div className="timeline-desc">
                                            {selectedClaim?.status === 'Recovered'
                                                ? 'Item successfully handed over to verified owner.'
                                                : 'Item pickup at Campus Security Desk.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Withdraw Action Footer */}
                        {(selectedClaim?.status === 'Under Review' || selectedClaim?.status === 'More Information Required') && (
                            <div className="drawer-actions-footer">
                                <button
                                    className="btn-withdraw"
                                    onClick={() => handleWithdrawClaim(selectedClaim.databaseId)}
                                    disabled={isWithdrawing}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    {isWithdrawing ? 'Withdrawing...' : 'Withdraw Claim'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyClaims;
