import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import './ReportLostItem.css';

export default function ReportLostItem() {
    const navigate = useNavigate();

    // Navigation handler wired to React Router
    const handleNavigate = (path) => {
        navigate(path);
    };

    // Form State
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        brand: '',
        color: '',
        features: '',
        description: '',
        dateLost: '',
        timeLost: '',
        location: '',
        specificLocation: '',
    });

    // File Upload & Preview State
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    // Validation States & Errors
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form Field Change Handlers
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Clear error on user edit
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleBlur = (id) => {
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    // Image File Handler
    const handleFile = (file) => {
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
            setImagePreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
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
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreviewUrl('');
    };

    // Form Validation and Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['itemName', 'category', 'description', 'dateLost', 'location'];
        const newErrors = {};
        let isValid = true;

        requiredFields.forEach((field) => {
            if (!formData[field] || !formData[field].trim()) {
                newErrors[field] = true;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: formData.itemName,
                        type: 'Lost',
                        category: formData.category,
                        description: formData.description,
                        date: formData.dateLost,
                        location: formData.location,
                        specificLocation: formData.specificLocation,
                        imagePreviewUrl: imagePreviewUrl,
                        brand: formData.brand,
                        color: formData.color,
                        timeLost: formData.timeLost,
                        features: formData.features ? [formData.features] : [],
                        reporterName: 'Campus Student',
                    }),
                });

                if (response.ok) {
                    const newItem = await response.json();
                    alert(`Lost Item Report created successfully! Assigned ID: ${newItem.trackingCode}`);
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
                console.error('Error submitting lost item:', err);
                alert('Server error submitting lost item report.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Formatting helpers for live preview
    const getFormattedDate = () => {
        if (!formData.dateLost) return 'Date Not Set';
        const dateObj = new Date(formData.dateLost);
        return isNaN(dateObj)
            ? 'Date Not Set'
            : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getFormattedLocation = () => {
        const zone = formData.location;
        const specific = formData.specificLocation.trim();
        if (zone && specific) return `${zone} (${specific})`;
        if (zone) return zone;
        return 'Location Not Selected';
    };

    // Helper function to resolve dynamic CSS classes for validation
    const getGroupClassName = (fieldId) => {
        if (errors[fieldId]) return 'form-group error';
        if (touched[fieldId] && formData[fieldId]?.trim()) return 'form-group success';
        return 'form-group';
    };

    return (
        <div className="app-layout">
            {/* PERSISTENT SIDEBAR — full sidebar with 'Report Lost' active */}
            <Sidebar activePage="reportlost" />

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAV BAR */}
                <header className="top-bar">
                    <div className="breadcrumb">
                        <Link to="/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>Report Lost Item</span>
                    </div>
                </header>

                {/* MAIN FORM CONTENT */}
                <main className="content-container">
                    <div className="page-header">
                        <h1 className="page-title">Report a Lost Item</h1>
                        <p className="page-subtitle">Tell us what you lost so the campus community can help you find it.</p>
                    </div>

                    <form id="lostItemForm" noValidate onSubmit={handleSubmit}>
                        <div className="form-layout-grid">
                            {/* LEFT COLUMN: FORM FIELDS */}
                            <div className="form-card">
                                {/* SECTION 1: ITEM INFORMATION */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <div className="section-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                        </div>
                                        <h2 className="section-title">Item Information</h2>
                                    </div>

                                    <div className="form-grid-2col" style={{ marginTop: '1.25rem' }}>
                                        <div className={`${getGroupClassName('itemName')} full-width`}>
                                            <label className="form-label" htmlFor="itemName">
                                                Item Name <span className="required-star">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="itemName"
                                                className="form-control"
                                                placeholder="e.g. Sony WH-1000XM4 Headphones"
                                                value={formData.itemName}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('itemName')}
                                                required
                                            />
                                            <span className="error-message">Please enter a descriptive item name.</span>
                                        </div>

                                        <div className={getGroupClassName('category')}>
                                            <label className="form-label" htmlFor="category">
                                                Category <span className="required-star">*</span>
                                            </label>
                                            <select
                                                id="category"
                                                className="form-control"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('category')}
                                                required
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

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="brand">Brand / Make</label>
                                            <input
                                                type="text"
                                                id="brand"
                                                className="form-control"
                                                placeholder="e.g. Sony, Apple, Nike"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="color">Primary Color</label>
                                            <input
                                                type="text"
                                                id="color"
                                                className="form-control"
                                                placeholder="e.g. Matte Black"
                                                value={formData.color}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="features">Identifying Features</label>
                                            <input
                                                type="text"
                                                id="features"
                                                className="form-control"
                                                placeholder="e.g. Small scratch on left ear cup, sticker on case"
                                                value={formData.features}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className={`${getGroupClassName('description')} full-width`}>
                                            <label className="form-label" htmlFor="description">
                                                Detailed Description <span className="required-star">*</span>
                                            </label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                placeholder="Describe where you last had it, unique markings, contents, or distinguishing tags..."
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('description')}
                                                required
                                            />
                                            <span className="error-message">Please provide a brief description.</span>
                                        </div>
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
                                        <h2 className="section-title">When & Where</h2>
                                    </div>

                                    <div className="form-grid-2col" style={{ marginTop: '1.25rem' }}>
                                        <div className={getGroupClassName('dateLost')}>
                                            <label className="form-label" htmlFor="dateLost">
                                                Date Lost <span className="required-star">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="dateLost"
                                                className="form-control"
                                                value={formData.dateLost}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('dateLost')}
                                                required
                                            />
                                            <span className="error-message">Select the estimated date.</span>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="timeLost">Approximate Time</label>
                                            <input
                                                type="time"
                                                id="timeLost"
                                                className="form-control"
                                                value={formData.timeLost}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className={getGroupClassName('location')}>
                                            <label className="form-label" htmlFor="location">
                                                Campus Zone/Location <span className="required-star">*</span>
                                            </label>
                                            <select
                                                id="location"
                                                className="form-control"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('location')}
                                                required
                                            >
                                                <option value="" disabled>Select zone...</option>
                                                <option value="Central Library">Central Library</option>
                                                <option value="Tech Lab Block 3">Tech Lab Block 3</option>
                                                <option value="Main Cafeteria">Main Cafeteria</option>
                                                <option value="Sports Complex">Sports Complex</option>
                                                <option value="Student Hostel A">Student Hostel A</option>
                                                <option value="Academic Quad">Academic Quad</option>
                                            </select>
                                            <span className="error-message">Select a campus zone.</span>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="specificLocation">Specific Spot Details</label>
                                            <input
                                                type="text"
                                                id="specificLocation"
                                                className="form-control"
                                                placeholder="e.g. 2nd Floor reading desk #14"
                                                value={formData.specificLocation}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 3: IMAGE UPLOAD */}
                                <div className="form-section">
                                    <div className="section-header">
                                        <div className="section-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                                <circle cx="12" cy="13" r="4" />
                                            </svg>
                                        </div>
                                        <h2 className="section-title">Item Photo</h2>
                                    </div>

                                    <div style={{ marginTop: '1.25rem' }}>
                                        <div
                                            className={`upload-area ${isDragOver ? 'dragover' : ''}`}
                                            style={{ display: imageFile ? 'none' : 'flex' }}
                                            onDragEnter={handleDragOver}
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

                                        <div
                                            className="uploaded-file-banner"
                                            style={{ display: imageFile ? 'flex' : 'none' }}
                                        >
                                            <div className="file-details">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>{imageFile ? imageFile.name : 'photo.jpg'}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="remove-file-btn"
                                                onClick={handleRemoveImage}
                                            >
                                                Remove photo
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* FORM BOTTOM ACTIONS */}
                                <div className="form-actions">
                                    <button type="button" className="btn btn-ghost" onClick={() => navigate('/dashboard')}>Cancel</button>
                                    <button type="button" className="btn btn-secondary">Save as Draft</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                        {isSubmitting ? 'Submitting...' : 'Submit Lost Report'}
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: LIVE PREVIEW & TIPS */}
                            <div className="sticky-right-column">
                                {/* LIVE PREVIEW CARD */}
                                <div className="preview-card">
                                    <div className="preview-card-header">
                                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                                            Live Card Preview
                                        </span>
                                        <span className="preview-badge">Your Report</span>
                                    </div>

                                    <div className="preview-image-container">
                                        <img
                                            src={imagePreviewUrl}
                                            className="preview-image"
                                            alt="Preview"
                                            style={{ display: imagePreviewUrl ? 'block' : 'none' }}
                                        />
                                        <div
                                            className="preview-placeholder"
                                            style={{ display: imagePreviewUrl ? 'none' : 'flex' }}
                                        >
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                                <polyline points="18 2 22 6 12 16 8 16 8 12 18 2" />
                                            </svg>
                                            <span>No image uploaded</span>
                                        </div>
                                    </div>

                                    <div className="preview-body">
                                        <h3 className="preview-item-title">
                                            {formData.itemName.trim() || 'Item Name Preview'}
                                        </h3>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                            </svg>
                                            <span>{formData.category || 'Category Not Selected'}</span>
                                        </div>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>{getFormattedLocation()}</span>
                                        </div>

                                        <div className="preview-meta-row">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            <span>{getFormattedDate()}</span>
                                        </div>

                                        <p className="preview-desc">
                                            {formData.description.trim() ||
                                                'Provide details on the left to see how your lost report card will appear to campus matches.'}
                                        </p>
                                    </div>
                                </div>

                                {/* TIPS CARD */}
                                <div className="tips-card">
                                    <div className="tips-title">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="16" x2="12" y2="12" />
                                            <line x1="12" y1="8" x2="12.01" y2="8" />
                                        </svg>
                                        Tips for a faster recovery
                                    </div>
                                    <ul className="tips-list">
                                        <li>
                                            <span className="tips-bullet"></span>
                                            <span>
                                                <strong>Add unique identifying details:</strong> Mention stickers, scratches, or serial numbers.
                                            </span>
                                        </li>
                                        <li>
                                            <span className="tips-bullet"></span>
                                            <span>
                                                <strong>Mention exact location:</strong> Note specific desk numbers, room labs, or cafeteria sections.
                                            </span>
                                        </li>
                                        <li>
                                            <span className="tips-bullet"></span>
                                            <span>
                                                <strong>Upload a clear image:</strong> Reports with photos receive 70% higher matching accuracy.
                                            </span>
                                        </li>
                                        <li>
                                            <span className="tips-bullet"></span>
                                            <span>
                                                <strong>Check matches regularly:</strong> Review notifications for automated AI match suggestions.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
