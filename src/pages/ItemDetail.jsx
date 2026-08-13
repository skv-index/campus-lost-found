import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import "./ItemDetail.css";
import API_BASE from '../config/api';

const ItemDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);

    useEffect(() => {
        const fetchItemDetail = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                // 1. Fetch primary item details from database
                const response = await fetch(`${API_BASE}/api/items/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setItem(data);
                    setSelectedImage(
                        data.image ||
                        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80"
                    );

                    // Build dynamic real-time timeline based on actual item status, custody, and dates
                    const buildRealTimeline = (itemData) => {
                        if (itemData.timeline && Array.isArray(itemData.timeline) && itemData.timeline.length > 0) {
                            return itemData.timeline;
                        }

                        const itemDateStr = itemData.date
                            ? new Date(itemData.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
                            : new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

                        const status = itemData.status || 'Active / Unclaimed';
                        const isFound = (itemData.type || '').toLowerCase() === 'found';
                        const location = itemData.location || 'Campus';
                        const custody = itemData.custody || 'Secured by Campus Safety';
                        const trackingCode = itemData.trackingCode || itemData._id || 'N/A';

                        const events = [];

                        // Step 1: Item Reported
                        events.push({
                            title: `Item Reported (${itemData.type || 'Found'})`,
                            timestamp: itemDateStr,
                            description: `Reported as ${itemData.type || 'Found'} near ${location}. Tracking ID: ${trackingCode}.`,
                            status: 'completed',
                        });

                        // Step 2 & 3 based on Real Status
                        if (status === 'Resolved / Claimed') {
                            events.push({
                                title: 'Claim Verification Approved',
                                timestamp: 'Verification Complete',
                                description: 'Submitted ownership proof was verified and approved by Campus Safety Desk.',
                                status: 'completed',
                            });
                            events.push({
                                title: 'Item Reclaimed by Owner',
                                timestamp: 'Handover Completed',
                                description: 'Item has been successfully handed over to its verified owner.',
                                status: 'completed',
                            });
                        } else if (status === 'Under Verification') {
                            events.push({
                                title: custody,
                                timestamp: 'Intake Secured',
                                description: 'Held securely at Campus Safety Desk while claim verification is in progress.',
                                status: 'completed',
                            });
                            events.push({
                                title: 'Verification Claim Under Review',
                                timestamp: 'Under Verification',
                                description: 'Lost & Found Desk is actively reviewing submitted ownership evidence.',
                                status: 'active',
                            });
                        } else {
                            // Active / Unclaimed (default)
                            if (isFound) {
                                events.push({
                                    title: custody,
                                    timestamp: 'Secured at Desk',
                                    description: `Held securely at Campus Safety Desk until claimed by verified owner.`,
                                    status: 'completed',
                                });
                                events.push({
                                    title: 'Open for Claiming & Verification',
                                    timestamp: 'Active Status',
                                    description: 'Currently unclaimed. Rightful owner can submit proof of ownership to claim this item.',
                                    status: 'active',
                                });
                            } else {
                                events.push({
                                    title: 'Automated Match Search Active',
                                    timestamp: 'Active Status',
                                    description: 'Campus Smart AI is cross-referencing incoming found items against this report.',
                                    status: 'active',
                                });
                                events.push({
                                    title: 'Pending Recovery / Turn-In',
                                    timestamp: 'Awaiting Match',
                                    description: 'Pending item turn-in at campus pickup location.',
                                    status: 'pending',
                                });
                            }
                        }

                        return events;
                    };

                    setTimeline(buildRealTimeline(data));

                    // 2. Fetch related items from database based on category
                    if (data.category) {
                        try {
                            const relatedRes = await fetch(`${API_BASE}/api/items?category=${encodeURIComponent(data.category)}`);
                            if (relatedRes.ok) {
                                const relatedData = await relatedRes.json();
                                const related = Array.isArray(relatedData)
                                    ? relatedData
                                    : relatedData.items || [];
                                const filtered = related
                                    .filter((i) => (i._id || i.id) !== id)
                                    .slice(0, 4);
                                setRelatedItems(filtered);
                            }
                        } catch (relErr) {
                            console.error("Error fetching related items:", relErr);
                        }
                    }
                } else {
                    setItem(null);
                }
            } catch (err) {
                console.error("Error fetching item detail:", err);
                setItem(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItemDetail();
    }, [id]);

    const handleClaim = () => {
        navigate(`/submitclaim?itemId=${id}`);
    };

    if (isLoading) {
        return (
            <div className="app-layout">
                <Sidebar activePage="marketplace" />
                <div className="main-wrapper" style={{ padding: "3rem", textAlign: "center" }}>
                    <p>Loading item details from database...</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="app-layout">
                <Sidebar activePage="marketplace" />
                <div className="main-wrapper" style={{ padding: "3rem", textAlign: "center" }}>
                    <h2>Item Not Found</h2>
                    <p>The requested lost or found item record could not be found in the database.</p>
                    <Link to="/marketplace" className="btn btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    const getStatusClass = (statusStr) => {
        const clean = (statusStr || '').toLowerCase();
        if (clean.includes('resolved') || clean.includes('claimed')) return 'status-tag-resolved';
        if (clean.includes('verification')) return 'status-tag-verification';
        return 'status-tag-active';
    };

    return (
        <div className="app-layout">
            {/* PERSISTENT SIDEBAR */}
            <Sidebar activePage="marketplace" />

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAV BAR WITH BREADCRUMB */}
                <header className="top-bar">
                    <nav className="breadcrumb">
                        <Link to="/marketplace">Browse Items</Link>
                        <span>/</span>
                        <Link to={`/marketplace?category=${item.category}`}>{item.category || "General"}</Link>
                        <span>/</span>
                        <span className="breadcrumb-current">Item Details</span>
                    </nav>
                </header>

                {/* MAIN CONTENT AREA */}
                <main className="content-container">
                    {/* ITEM DETAIL GRID */}
                    <div className="item-detail-grid">
                        {/* GALLERY COLUMN */}
                        <div className="gallery-container">
                            <div className="main-image-card">
                                <img
                                    src={selectedImage || item.image}
                                    className="main-image"
                                    alt={item.title || "Item Image"}
                                />
                            </div>
                        </div>

                        {/* ITEM INFO COLUMN */}
                        <div className="item-info-panel">
                            <div className="status-badge-row">
                                <span className={`badge-${(item.type || "found").toLowerCase()}`}>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {(item.type || "FOUND").toUpperCase()} ITEM
                                </span>
                                <span className="tracking-id">ID: {item.trackingCode || item._id || item.id}</span>
                            </div>

                            <h1 className="item-title">{item.title}</h1>

                            {/* SPECIFICATIONS CARD */}
                            <div className="meta-specs-card">
                                <div className="meta-spec-item">
                                    <span className="spec-label">Category</span>
                                    <span className="spec-value">{item.category || "Uncategorized"}</span>
                                </div>
                                <div className="meta-spec-item">
                                    <span className="spec-label">Date Reported</span>
                                    <span className="spec-value">{formattedDate}</span>
                                </div>
                                <div className="meta-spec-item">
                                    <span className="spec-label">Location</span>
                                    <span className="spec-value">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {item.location || "Campus ground"}{" "}
                                        {item.specificLocation ? `(${item.specificLocation})` : ""}
                                    </span>
                                </div>
                                <div className="meta-spec-item">
                                    <span className="spec-label">Current Status</span>
                                    <span className="spec-value">
                                        <span className={`status-tag ${getStatusClass(item.status)}`}>
                                            {item.status || "Active / Unclaimed"}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* DESCRIPTION & FEATURES SECTION */}
                            <div className="details-section-box">
                                <div className="section-heading">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="8" y1="6" x2="21" y2="6" />
                                        <line x1="8" y1="12" x2="21" y2="12" />
                                        <line x1="8" y1="18" x2="21" y2="18" />
                                        <line x1="3" y1="6" x2="3.01" y2="6" />
                                        <line x1="3" y1="12" x2="3.01" y2="12" />
                                        <line x1="3" y1="18" x2="3.01" y2="18" />
                                    </svg>
                                    Description
                                </div>
                                <p className="item-description-text">
                                    {item.description || "No detailed description provided."}
                                </p>

                                {item.features && item.features.length > 0 && (
                                    <>
                                        <div className="section-heading section-heading-secondary">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                            Identifying Features
                                        </div>
                                        <div className="features-tags-list">
                                            {item.features.map((feature, idx) => (
                                                <span key={idx} className="feature-tag">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* RECOVERY PROMINENT CARD */}
                            <div className="recovery-card">
                                <h2 className="recovery-title">This item may belong to you.</h2>
                                <p className="recovery-subtitle">
                                    Submit a verification claim to contact the campus security office and safely reclaim
                                    your lost item.
                                </p>
                                <button type="button" className="btn-claim" onClick={handleClaim}>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="12" y1="18" x2="12" y2="12" />
                                        <line x1="9" y1="15" x2="15" y2="15" />
                                    </svg>
                                    Submit a Claim
                                </button>
                            </div>

                            {/* SECURITY MESSAGE */}
                            <div className="security-banner">
                                <svg
                                    className="security-icon"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <span>
                                    Some identifying information is intentionally hidden. You'll need to provide proof of
                                    ownership (e.g., serial number, Bluetooth connection history, or engraving text)
                                    during verification.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVITY TIMELINE SECTION */}
                    {timeline.length > 0 && (
                        <section className="activity-section">
                            <div className="section-heading">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                Item Timeline & Activity
                            </div>

                            <div className="timeline">
                                {timeline.map((step, index) => (
                                    <div
                                        key={index}
                                        className={`timeline-item ${step.status === "completed"
                                            ? "completed"
                                            : step.status === "active"
                                                ? "active"
                                                : ""
                                            }`}
                                    >
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-title">{step.title}</div>
                                        <div className="timeline-timestamp">{step.timestamp}</div>
                                        <div className="timeline-desc">{step.description}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* RELATED ITEMS SECTION */}
                    {relatedItems.length > 0 && (
                        <section className="related-section">
                            <div className="section-heading related-heading">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                Similar Reported Items
                            </div>

                            <div className="related-grid">
                                {relatedItems.map((relItem) => {
                                    const relId = relItem._id || relItem.id;
                                    return (
                                        <div
                                            key={relId}
                                            className="related-card"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/item/${relId}`)}
                                        >
                                            <div className="related-img-box">
                                                <img
                                                    src={
                                                        relItem.image ||
                                                        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80"
                                                    }
                                                    alt={relItem.title}
                                                />
                                                <span className="related-badge">{relItem.type || "ITEM"}</span>
                                            </div>
                                            <div className="related-body">
                                                <h3 className="related-title">{relItem.title}</h3>
                                                <div className="related-meta">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                    {relItem.location || "Campus"}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ItemDetail;
