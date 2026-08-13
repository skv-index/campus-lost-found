import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Header from './Header';
import ItemSummaryCard from './ItemSummaryCard';
import ProcessTracker from './ProcessTracker';
import SecurityWarning from './SecurityWarning';
import './ClaimItem.css';
import API_BASE from '../config/api';

const ClaimItem = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const itemId = searchParams.get('itemId');
    const [item, setItem] = useState(null);
    const [loadError, setLoadError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Controlled Form State
    const [formData, setFormData] = useState({
        claimReason: '',
        identifyingFeatures: '',
        purchaseDate: '',
        previousLocation: '',
        additionalDetails: '',
        files: [],
    });

    // Handle Form Change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Handle File Upload Trigger
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                files: Array.from(e.target.files),
            }));
        }
    };

    useEffect(() => {
        if (!itemId) {
            setLoadError('Choose a valid found item from the marketplace or a match recommendation before submitting a claim.');
            return;
        }
        const loadItem = async () => {
            setLoadError('');
            try {
                const response = await fetch(`${API_BASE}/api/items/${encodeURIComponent(itemId)}`);
                if (response.status === 503) {
                    throw new Error('Database is connecting or unavailable. Please try again shortly.');
                }
                if (!response.ok) {
                    throw new Error(`Item "${itemId}" was not found in the database. The ID may be invalid or the item was removed.`);
                }
                const data = await response.json();
                if (data.type === 'Lost') {
                    throw new Error('This entry is a "Lost Item" report filed by a student. Claims can only be submitted for "Found Items" turned into campus security.');
                }
                if (data.status !== 'Active / Unclaimed') {
                    throw new Error(`This item is currently marked as "${data.status}" and is no longer available for new claims.`);
                }
                setItem({
                    id: data.trackingCode,
                    databaseId: data._id,
                    title: data.title,
                    category: data.category,
                    foundLocation: data.location,
                    dateFound: new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    image: data.image,
                });
            } catch (error) {
                setLoadError(error.message || 'This item is unavailable or could not be loaded.');
            }
        };
        loadItem();
    }, [itemId]);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!item) return;
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in before submitting a claim.');
            navigate('/login');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE}/api/claims`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ itemId: item.databaseId, ...formData }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Could not submit claim.');
            alert('Claim submitted successfully. You can track it in My Claims.');
            navigate('/myclaims');
        } catch (error) {
            alert(error.message || 'Could not submit claim.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="app-layout">
            {/* PERSISTENT SIDEBAR */}
            <Sidebar activePage="myclaims" />

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAV BAR */}
                <Header />

                {/* MAIN CONTENT AREA */}
                <main className="content-container">
                    {/* PAGE HEADER */}
                    <div className="page-header">
                        <h1 className="page-title">Claim this item</h1>
                        <p className="page-subtitle">
                            Provide information that helps our Lost & Found Desk verify ownership securely.
                        </p>
                    </div>

                    {/* ITEM SUMMARY CARD / ERROR ALERT */}
                    {loadError ? (
                        <div style={{
                            background: '#fff1f2',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                        }}>
                            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#991b1b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                Item Unavailable or Not Found
                            </div>
                            <p style={{ fontSize: '0.9375rem', color: '#7f1d1d', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                                {loadError}
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/marketplace')}
                                className="btn btn-primary"
                                style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
                            >
                                Browse Found Items Directory
                            </button>
                        </div>
                    ) : item ? (
                        <ItemSummaryCard item={item} />
                    ) : (
                        <p className="field-desc">Loading selected item from database...</p>
                    )}


                    {/* VERIFICATION PROCESS STEP TRACKER */}
                    <ProcessTracker currentStep={1} />

                    {/* MAIN FORM */}
                    {item && <form className="claim-form" onSubmit={handleSubmit}>
                        {/* SECURITY WARNING BANNER */}
                        <SecurityWarning />

                        {/* REASON SECTION */}
                        <div className="form-section">
                            <h3 className="form-section-title">Claim Justification</h3>
                            <div className="form-group">
                                <label htmlFor="claimReason">Explain why you believe this item belongs to you *</label>
                                <span className="field-desc">
                                    Describe how or when you lost it and why this listing matches your item.
                                </span>
                                <textarea
                                    id="claimReason"
                                    required
                                    value={formData.claimReason}
                                    onChange={handleChange}
                                    placeholder="e.g., I lost my AirPods case during a study session at the library desk on Sunday afternoon. The location and description match perfectly."
                                />
                            </div>
                        </div>

                        {/* OWNERSHIP DETAILS SECTION */}
                        <div className="form-section">
                            <h3 className="form-section-title">Ownership Verification Details</h3>

                            <div className="form-group">
                                <label htmlFor="identifyingFeatures">Unique Identifying Characteristics *</label>
                                <span className="field-desc">
                                    Specify details not fully visible in the public listing (e.g., laser engraving text, custom scratches, specific sticker, bluetooth device name).
                                </span>
                                <textarea
                                    id="identifyingFeatures"
                                    required
                                    value={formData.identifyingFeatures}
                                    onChange={handleChange}
                                    placeholder="e.g., Custom engraving reading 'N.K.D.' on the front, Bluetooth device name set to 'Naveen’s AirPods Pro'."
                                />
                            </div>

                            <div className="form-grid-2">
                                <div className="form-group">
                                    <label htmlFor="purchaseDate">Approximate Purchase Date</label>
                                    <input
                                        type="date"
                                        id="purchaseDate"
                                        value={formData.purchaseDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="previousLocation">Last Known Location Prior to Loss</label>
                                    <input
                                        type="text"
                                        id="previousLocation"
                                        value={formData.previousLocation}
                                        onChange={handleChange}
                                        placeholder="e.g., Central Library 2nd Floor Desk #14"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="additionalDetails">Additional Proof or Context</label>
                                <textarea
                                    id="additionalDetails"
                                    value={formData.additionalDetails}
                                    onChange={handleChange}
                                    placeholder="Any other detail that proves ownership (e.g., serial number matching your Apple ID account)."
                                />
                            </div>
                        </div>

                        {/* OPTIONAL PROOF UPLOAD SECTION */}
                        <div className="form-section">
                            <h3 className="form-section-title">Optional Supporting Documentation</h3>
                            <p className="field-desc">
                                Uploading a receipt, photo of you with the item, or a screenshot of your Apple ID device list will speed up review time significantly.
                            </p>

                            <div className="upload-zone" onClick={() => document.getElementById('file-input').click()}>
                                <div className="upload-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="upload-title">
                                        {formData.files.length > 0
                                            ? `${formData.files.length} file(s) selected`
                                            : 'Click to upload supporting files'}
                                    </div>
                                    <div className="upload-hint">PNG, JPG, PDF up to 10MB each</div>
                                </div>
                                <div className="upload-badges">
                                    <span className="upload-badge">Receipt</span>
                                    <span className="upload-badge">Photograph</span>
                                    <span className="upload-badge">Document</span>
                                    <span className="upload-badge">Other Proof</span>
                                </div>
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        {/* BOTTOM FORM ACTIONS */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                            </button>
                        </div>
                    </form>}
                </main>
            </div>
        </div>
    );
};

export default ClaimItem;
