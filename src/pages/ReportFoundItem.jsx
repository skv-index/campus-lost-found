import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import './ReportFoundItem.css';

const ReportFoundItem = () => {
    const navigate = useNavigate();

    // Controlled Form State
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        brand: '',
        color: '',
        features: '',
        description: '',
        dateFound: '',
        timeFound: '',
        location: '',
        custody: 'With me',
    });

    // Image Upload & Preview State
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    // Form Validation State
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form Field Change Handler
    const handleChange = (e) => {
        const { id, name, value } = e.target;
        const fieldName = id || name;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        // Clear error when user starts typing
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    // Image File Handling
    const handleFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Please upload an image smaller than 5 MB.');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
    };

    // Drag & Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    // Date Formatter for Live Preview
    const formatPreviewDate = (dateString) => {
        if (!dateString) return 'Date Not Set';
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return 'Date Not Set';
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            'itemName',
            'category',
            'description',
            'dateFound',
            'location',
        ];

        const newErrors = {};
        let isValid = true;

        requiredFields.forEach((field) => {
            if (!formData[field] || !formData[field].trim()) {
                newErrors[field] = true;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched({
            itemName: true,
            category: true,
            description: true,
            dateFound: true,
            location: true,
        });

        if (isValid) {
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.itemName,
                        type: 'Found',
                        category: formData.category,
                        description: formData.description,
                        date: formData.dateFound,
                        location: formData.location,
                        imagePreviewUrl: imagePreview,
                        brand: formData.brand,
                        color: formData.color,
                        timeFound: formData.timeFound,
                        custody: formData.custody,
                        features: formData.features ? [formData.features] : [],
                        reporterName: 'Campus Staff / Student',
                    }),
                });

                if (response.ok) {
                    const newItem = await response.json();
                    alert(`Found Item Report created! Thank you for supporting campus safety. Assigned ID: ${newItem.trackingCode}`);
                    navigate('/marketplace');
                } else {
                    const responseText = await response.text();
                    let message = 'Failed to submit report.';
                    try {
                        message = JSON.parse(responseText).message || message;
                    } catch {
                        if (response.status === 413) {
                            message = 'The photo is too large. Please choose an image smaller than 5 MB.';
                        }
                    }
                    alert(message);
                }
            } catch (err) {
                console.error('Error submitting found item:', err);
                alert('Server error submitting found item report.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="app-layout">
            {/* PERSISTENT SIDEBAR — Report Found active */}
            <Sidebar activePage="reportfound" />

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAV BAR */}
                <header className="top-bar">
                    <div className="breadcrumb">
                        <Link to="/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Report Found Item</span>
                    </div>
                </header>

                {/* MAIN FORM CONTENT */}
                <main className="content-container">
                    <div className="page-header">
                        <h1 className="page-title">Found something?</h1>
                        <p className="page-subtitle">Help us return it to its owner.</p>
                    </div>

                    <form id="foundItemForm" noValidate onSubmit={handleSubmit}>
                        <div className="form-layout-grid">

                            {/* LEFT COLUMN: FORM FIELDS */}
                            <div className="form-card">

                                {/* SECTION 1: ITEM DETAILS */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <div className="section-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                        </div>
                                        <h2 className="section-title">Found Item Details</h2>
                                    </div>

                                    <div className="form-grid-2col" style={{ marginTop: '1.25rem' }}>
                                        <div
                                            className={`form-group full-width ${errors.itemName ? 'error' : touched.itemName ? 'success' : ''
                                                }`}
                                            id="group-itemName"
                                        >
                                            <label className="form-label" htmlFor="itemName">
                                                Item Name <span className="required-star">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="itemName"
                                                className="form-control"
                                                placeholder="e.g. Blue Hydro Flask / Keychain with 3 keys"
                                                required
                                                value={formData.itemName}
                                                onChange={handleChange}
                                            />
                                            <span className="error-message">Please enter a recognizable item name.</span>
                                        </div>

                                        <div
                                            className={`form-group ${errors.category ? 'error' : touched.category ? 'success' : ''
                                                }`}
                                            id="group-category"
                                        >
                                            <label className="form-label" htmlFor="category">
                                                Category <span className="required-star">*</span>
                                            </label>
                                            <select
                                                id="category"
                                                className="form-control"
                                                required
                                                value={formData.category}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select category...</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Personal Access">Personal Access (Wallets/IDs)</option>
                                                <option value="Keys / Badges">Keys / Badges</option>
                                                <option value="Audio Gadgets">Audio Gadgets</option>
                                                <option value="Bags & Backpacks">Bags & Backpacks</option>
                                                <option value="Books & Stationery">Books & Stationery</option>
                                                <option value="Clothing & Wearables">Clothing & Wearables</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <span className="error-message">Please select a category.</span>
                                        </div>

                                        <div className="form-group" id="group-brand">
                                            <label className="form-label" htmlFor="brand">Brand / Model</label>
                                            <input
                                                type="text"
                                                id="brand"
                                                className="form-control"
                                                placeholder="e.g. Apple, Anker, Casio"
                                                value={formData.brand}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group" id="group-color">
                                            <label className="form-label" htmlFor="color">Primary Color</label>
                                            <input
                                                type="text"
                                                id="color"
                                                className="form-control"
                                                placeholder="e.g. Metallic Silver"
                                                value={formData.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group" id="group-features">
                                            <label className="form-label" htmlFor="features">Identifying Features</label>
                                            <input
                                                type="text"
                                                id="features"
                                                className="form-control"
                                                placeholder="e.g. Engraved initials 'NKD', sticker on back"
                                                value={formData.features}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div
                                            className={`form-group full-width ${errors.description ? 'error' : touched.description ? 'success' : ''
                                                }`}
                                            id="group-description"
                                        >
                                            <label className="form-label" htmlFor="description">
                                                Description <span className="required-star">*</span>
                                            </label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                placeholder="Provide general details visible to everyone..."
                                                required
                                                value={formData.description}
                                                onChange={handleChange}
                                            ></textarea>
                                            <span className="error-message">Please provide a brief description.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* PRIVACY NOTICE BANNER */}
                                <div className="privacy-notice">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, color: 'var(--color-accent-amber)' }}>
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <div>
                                        <strong>Security Notice:</strong> Do not publicly reveal sensitive identifying
                                        information (e.g. full wallet contents, passcodes, internal engravings). Keeping
                                        these details private helps us verify legitimate claims.
                                    </div>
                                </div>

                                {/* SECTION 2: WHEN & WHERE */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <div className="section-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <h2 className="section-title">Where & When Found</h2>
                                    </div>

                                    <div className="form-grid-2col" style={{ marginTop: '1.25rem' }}>
                                        <div
                                            className={`form-group ${errors.dateFound ? 'error' : touched.dateFound ? 'success' : ''
                                                }`}
                                            id="group-dateFound"
                                        >
                                            <label className="form-label" htmlFor="dateFound">
                                                Date Found <span className="required-star">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="dateFound"
                                                className="form-control"
                                                required
                                                value={formData.dateFound}
                                                onChange={handleChange}
                                            />
                                            <span className="error-message">Select the date found.</span>
                                        </div>

                                        <div className="form-group" id="group-timeFound">
                                            <label className="form-label" htmlFor="timeFound">Time Found</label>
                                            <input
                                                type="time"
                                                id="timeFound"
                                                className="form-control"
                                                value={formData.timeFound}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div
                                            className={`form-group full-width ${errors.location ? 'error' : touched.location ? 'success' : ''
                                                }`}
                                            id="group-location"
                                        >
                                            <label className="form-label" htmlFor="location">
                                                Location Found <span className="required-star">*</span>
                                            </label>
                                            <select
                                                id="location"
                                                className="form-control"
                                                required
                                                value={formData.location}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>Select campus zone...</option>
                                                <option value="Central Library">Central Library</option>
                                                <option value="Tech Lab Block 3">Tech Lab Block 3</option>
                                                <option value="Main Cafeteria">Main Cafeteria</option>
                                                <option value="Sports Complex">Sports Complex</option>
                                                <option value="Student Hostel A">Student Hostel A</option>
                                                <option value="Academic Quad">Academic Quad</option>
                                            </select>
                                            <span className="error-message">Select a location.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: CUSTODY CONTROL */}
                                <div className="form-section">
                                    <div className="custody-box">
                                        <div className="section-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                                            <div className="section-icon" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                </svg>
                                            </div>
                                            <h2 className="section-title" style={{ color: 'var(--color-primary-900)' }}>
                                                Where is the item currently stored?
                                            </h2>
                                        </div>

                                        <div className="custody-options">
                                            {[
                                                { id: 'card-custody-me', val: 'With me', label: 'With me' },
                                                { id: 'card-custody-dept', val: 'Department Office', label: 'Department Office' },
                                                { id: 'card-custody-desk', val: 'Lost & Found Desk', label: 'Lost & Found Desk' },
                                                { id: 'card-custody-sec', val: 'Security Office', label: 'Campus Security Office' },
                                            ].map((item) => (
                                                <label
                                                    key={item.val}
                                                    className={`custody-radio-card ${formData.custody === item.val ? 'selected' : ''}`}
                                                    id={item.id}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="custody"
                                                        value={item.val}
                                                        checked={formData.custody === item.val}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custody-radio-label">{item.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 4: IMAGE UPLOAD */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <div className="section-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                                <circle cx="12" cy="13" r="4" />
                                            </svg>
                                        </div>
                                        <h2 className="section-title">Found Item Photo</h2>
                                    </div>

                                    <div style={{ marginTop: '1.25rem' }}>
                                        {!imageFile ? (
                                            <div
                                                className={`upload-area ${isDragOver ? 'dragover' : ''}`}
                                                id="uploadArea"
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    type="file"
                                                    id="imageInput"
                                                    className="file-input-hidden"
                                                    accept="image/png, image/jpeg, image/webp"
                                                    onChange={handleFileInputChange}
                                                />
                                                <div className="upload-icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="17 8 12 3 7 8" />
                                                        <line x1="12" y1="3" x2="12" y2="15" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="upload-title">
                                                        Drag & drop item photo here, or <span>browse</span>
                                                    </div>
                                                    <div className="upload-info" style={{ marginTop: '4px' }}>
                                                        Supports PNG, JPG or WEBP (Max 5MB)
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="uploaded-file-banner" id="uploadedBanner" style={{ display: 'flex' }}>
                                                <div className="file-details">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    <span id="fileNameDisplay">{imageFile.name}</span>
                                                </div>
                                                <button type="button" className="remove-file-btn" id="removeFileBtn" onClick={handleRemoveImage}>
                                                    Remove photo
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* FORM BOTTOM ACTIONS */}
                                <div className="form-actions">
                                    <button type="button" className="btn btn-ghost" onClick={() => navigate('/dashboard')}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-secondary">
                                        Save Draft
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                        {isSubmitting ? 'Submitting...' : 'Submit Found Report'}
                                    </button>
                                </div>

                            </div>

                            {/* RIGHT COLUMN: LIVE PREVIEW */}
                            <div className="sticky-right-column">
                                <div className="preview-card">
                                    <div className="preview-card-header">
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                                            Found Item Preview
                                        </span>
                                        <span className="preview-badge">Found Report</span>
                                    </div>

                                    <div className="preview-image-container">
                                        {imagePreview ? (
                                            <img src={imagePreview} id="previewImg" className="preview-image" alt="Preview" style={{ display: 'block' }} />
                                        ) : (
                                            <div className="preview-placeholder" id="previewPlaceholder">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                                    <polyline points="18 2 22 6 12 16 8 16 8 12 18 2" />
                                                </svg>
                                                <span>No image uploaded</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="preview-body">
                                        <h3 className="preview-item-title" id="prevTitle">
                                            {formData.itemName.trim() || 'Item Name Preview'}
                                        </h3>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                            </svg>
                                            <span id="prevCategory">{formData.category || 'Category Not Selected'}</span>
                                        </div>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span id="prevLocation">{formData.location || 'Location Not Selected'}</span>
                                        </div>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            <span id="prevDate">{formatPreviewDate(formData.dateFound)}</span>
                                        </div>

                                        <div className="preview-meta-row" style={{ color: 'var(--color-primary-700)', fontWeight: 600 }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                            <span>Custody: <span id="prevCustody">{formData.custody}</span></span>
                                        </div>

                                        <p className="preview-desc" id="prevDesc">
                                            {formData.description.trim() || 'Fill out the form details on the left to preview your public found card.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default ReportFoundItem;
