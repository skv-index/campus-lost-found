import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import './ProfileSettings.css';
import API_BASE from '../config/api';

const PRESET_AVATARS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
];

const ProfileSettings = () => {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isUpdatingPass, setIsUpdatingPass] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // Controlled Profile Form State
    const [profileForm, setProfileForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        department: 'Decision and Computing Sciences',
        yearDesignation: '2nd Year',
        studentId: '',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });

    // Password State
    const [passwords, setPasswords] = useState({
        currentPass: '',
        newPass: '',
    });


    // Privacy State
    const [privacy, setPrivacy] = useState({
        accountVisibility: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 401 || response.status === 403) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }
                if (!response.ok) throw new Error('Failed to load user profile');
                const data = await response.json();
                setUserProfile(data);
                setProfileForm({
                    fullName: data.fullName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    department: data.department || 'Decision and Computing Sciences',
                    yearDesignation: data.yearDesignation || '2nd Year',
                    studentId: data.studentId || 'N/A',
                    role: data.role || 'student',
                    avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                });
                if (data.privacy) {
                    setPrivacy((prev) => ({ ...prev, ...data.privacy }));
                }
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Error fetching profile from database:', err);
                setStatusMessage({ type: 'error', text: 'Error connecting to database to load profile.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleAvatarFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            alert('Image size should be less than 3MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setProfileForm((prev) => ({ ...prev, avatar: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in before saving profile changes.');
            navigate('/login');
            return;
        }

        setIsSavingProfile(true);
        setStatusMessage({ type: '', text: '' });
        try {
            const response = await fetch(`${API_BASE}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullName: profileForm.fullName,
                    phone: profileForm.phone,
                    department: profileForm.department,
                    yearDesignation: profileForm.yearDesignation,
                    avatar: profileForm.avatar,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to save profile changes.');

            const currentLocalUser = JSON.parse(localStorage.getItem('user') || '{}');
            localStorage.setItem('user', JSON.stringify({ ...currentLocalUser, ...data }));
            setUserProfile((prev) => ({ ...prev, ...data }));
            setStatusMessage({ type: 'success', text: 'Profile changes saved to MongoDB successfully!' });
        } catch (err) {
            setStatusMessage({ type: 'error', text: err.message || 'Could not save profile changes.' });
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!passwords.currentPass || !passwords.newPass) {
            alert('Please provide both current and new password.');
            return;
        }
        if (passwords.newPass.length < 8) {
            alert('New password must be at least 8 characters long.');
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Session expired. Please sign in again.');
            navigate('/login');
            return;
        }

        setIsUpdatingPass(true);
        try {
            const response = await fetch(`${API_BASE}/api/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPass: passwords.currentPass,
                    newPass: passwords.newPass,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update password.');
            alert('Password updated successfully!');
            setPasswords({ currentPass: '', newPass: '' });
        } catch (err) {
            alert(err.message || 'Error updating password.');
        } finally {
            setIsUpdatingPass(false);
        }
    };

    const handlePrivacyToggle = async () => {
        const updated = { accountVisibility: !privacy.accountVisibility };
        setPrivacy(updated);
        setStatusMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch(`${API_BASE}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ privacy: updated }),
            });
            if (response.ok) {
                const currentLocalUser = JSON.parse(localStorage.getItem('user') || '{}');
                localStorage.setItem('user', JSON.stringify({ ...currentLocalUser, privacy: updated }));
                setStatusMessage({
                    type: 'success',
                    text: `Account visibility setting updated: ${updated.accountVisibility ? 'Visible to verified campus users' : 'Hidden / Private'}.`,
                });
            } else {
                throw new Error('Failed to save privacy setting.');
            }
        } catch (e) {
            console.error('Error syncing privacy settings:', e);
            setStatusMessage({ type: 'error', text: 'Error updating privacy setting in database.' });
        }
    };

    const handleDataArchiveDownload = async () => {
        setStatusMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('token');
            const userEmail = profileForm.email || userProfile?.email;

            let userReportedItems = [];
            let userClaims = [];

            if (token) {
                // Fetch claims submitted by current user
                try {
                    const claimsRes = await fetch(`${API_BASE}/api/claims/mine`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (claimsRes.ok) {
                        userClaims = await claimsRes.json();
                    }
                } catch (e) {
                    console.warn('Could not fetch claims for archive:', e);
                }

                // Fetch reported items matching current user's email
                if (userEmail) {
                    try {
                        const itemsRes = await fetch(`${API_BASE}/api/items`);
                        if (itemsRes.ok) {
                            const data = await itemsRes.json();
                            const allItems = data.items || data || [];
                            userReportedItems = allItems.filter(
                                (item) => item.reporterEmail?.toLowerCase() === userEmail.toLowerCase()
                            );
                        }
                    } catch (e) {
                        console.warn('Could not fetch items for archive:', e);
                    }
                }
            }

            const dataArchive = {
                exportMetadata: {
                    appName: 'CampusSmart Lost & Found System',
                    exportedAt: new Date().toISOString(),
                    formatVersion: '1.0',
                },
                profileInformation: {
                    fullName: profileForm.fullName,
                    email: profileForm.email,
                    studentId: profileForm.studentId,
                    role: profileForm.role,
                    phone: profileForm.phone,
                    department: profileForm.department,
                    yearDesignation: profileForm.yearDesignation,
                    privacySettings: privacy,
                },
                summary: {
                    totalReportedItems: userReportedItems.length,
                    totalSubmittedClaims: userClaims.length,
                },
                reportedItems: userReportedItems.map((item) => ({
                    trackingCode: item.trackingCode,
                    title: item.title,
                    type: item.type,
                    category: item.category,
                    location: item.location,
                    specificLocation: item.specificLocation,
                    date: item.date,
                    status: item.status,
                    description: item.description,
                    image: item.image,
                })),
                submittedClaims: userClaims.map((claim) => ({
                    claimId: claim._id,
                    itemTitle: claim.item?.title || 'Unknown Item',
                    trackingCode: claim.item?.trackingCode || 'N/A',
                    claimReason: claim.claimReason,
                    identifyingFeatures: claim.identifyingFeatures,
                    status: claim.status,
                    createdAt: claim.createdAt,
                })),
            };

            const jsonString = JSON.stringify(dataArchive, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const cleanName = (profileForm.fullName || 'User').replace(/[^a-zA-Z0-9]/g, '_');
            const dateStr = new Date().toISOString().split('T')[0];

            link.href = url;
            link.download = `CampusSmart_Data_Archive_${cleanName}_${dateStr}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setStatusMessage({
                type: 'success',
                text: 'Data archive compiled and downloaded successfully! Includes your profile, reported items, and claims data.',
            });
        } catch (err) {
            console.error('Error generating data archive download:', err);
            setStatusMessage({ type: 'error', text: 'Failed to generate data archive.' });
        }
    };

    const handleDeactivateAccount = () => {
        if (
            window.confirm(
                'Are you sure you want to deactivate your account? Active claims will remain pending desk review.'
            )
        ) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            alert('Account deactivated. Redirecting to home.');
            navigate('/');
        }
    };

    return (
        <div className="app-layout">
            <Sidebar activePage="profile" />

            <div className="main-wrapper">
                <header className="top-bar">
                    <nav className="breadcrumb">
                        <Link to="/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>
                            Account Settings
                        </span>
                    </nav>
                </header>

                <main className="content-container">
                    <div className="page-header">
                        <h1 className="page-title">Profile & Settings</h1>
                    </div>

                    {!isAuthenticated ? (
                        <div className="settings-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sign In Required</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                                Please sign in to view and manage your profile settings.
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>
                                Sign In Now
                            </button>
                        </div>
                    ) : isLoading ? (
                        <div className="settings-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <p style={{ color: 'var(--color-text-muted)' }}>Connecting to MongoDB database and loading your profile...</p>
                        </div>
                    ) : (
                        <>
                            {statusMessage.text && (
                                <div style={{
                                    padding: '1rem 1.25rem',
                                    borderRadius: '12px',
                                    marginBottom: '1rem',
                                    fontSize: '0.9375rem',
                                    fontWeight: 600,
                                    background: statusMessage.type === 'success' ? '#dcfce7' : '#fff1f2',
                                    color: statusMessage.type === 'success' ? '#166534' : '#991b1b',
                                    border: statusMessage.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                                }}>
                                    {statusMessage.text}
                                </div>
                            )}

                            {/* PROFILE CARD */}
                            <div className="profile-card">
                                <div className="avatar-wrapper">
                                    <img
                                        src={profileForm.avatar}
                                        alt="Avatar"
                                        className="avatar-img"
                                    />
                                    <label htmlFor="avatar-file-input" className="avatar-upload-btn" title="Upload New Profile Photo">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                            <circle cx="12" cy="13" r="4"></circle>
                                        </svg>
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-file-input"
                                        accept="image/*"
                                        onChange={handleAvatarFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <div className="profile-meta">
                                    <div className="profile-name-group">
                                        <h2 className="profile-name">{profileForm.fullName || 'User Profile'}</h2>
                                        <span className="badge-role" style={{ textTransform: 'capitalize' }}>
                                            {profileForm.role}
                                        </span>
                                        <span className="badge-status">Verified Account</span>
                                    </div>

                                    <div className="profile-details-grid">
                                        <div className="profile-detail-item">
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                            {profileForm.email}
                                        </div>
                                        <div className="profile-detail-item">
                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                                <line x1="7" y1="8" x2="17" y2="8" />
                                                <line x1="7" y1="12" x2="13" y2="13" />
                                            </svg>
                                            ID: {profileForm.studentId || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PERSONAL INFORMATION SECTION */}
                            <div className="settings-card">
                                <div className="settings-card-header">
                                    <div>
                                        <h3 className="settings-card-title">Personal Information</h3>
                                        <p className="settings-card-subtitle">
                                            Manage your personal details and institutional registration information stored in MongoDB.
                                        </p>
                                    </div>
                                </div>

                                <form id="profile-form" onSubmit={handleProfileSubmit}>
                                    <div className="form-grid-2">
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label htmlFor="avatar-url">Profile Photo</label>
                                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    id="avatar-url"
                                                    name="avatar"
                                                    value={profileForm.avatar}
                                                    onChange={handleProfileChange}
                                                    placeholder="Paste Image URL or choose a file / preset"
                                                />
                                                <label htmlFor="avatar-file-input-btn" className="btn btn-secondary" style={{ whiteSpace: 'nowrap', cursor: 'pointer', margin: 0 }}>
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="17 8 12 3 7 8" />
                                                        <line x1="12" y1="3" x2="12" y2="15" />
                                                    </svg>
                                                    Upload File
                                                </label>
                                                <input
                                                    type="file"
                                                    id="avatar-file-input-btn"
                                                    accept="image/*"
                                                    onChange={handleAvatarFileChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.625rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Or choose a preset avatar:</span>
                                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                    {PRESET_AVATARS.map((url, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={url}
                                                            alt={`Preset ${idx + 1}`}
                                                            onClick={() => setProfileForm((prev) => ({ ...prev, avatar: url }))}
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '50%',
                                                                objectFit: 'cover',
                                                                cursor: 'pointer',
                                                                border: profileForm.avatar === url ? '2px solid var(--color-primary-600)' : '2px solid transparent',
                                                                boxShadow: profileForm.avatar === url ? '0 0 0 2px rgba(37, 99, 235, 0.2)' : 'none',
                                                                opacity: profileForm.avatar === url ? 1 : 0.75,
                                                                transition: 'all 0.2s ease',
                                                            }}
                                                            title={`Click to select preset ${idx + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="full-name">Full Name</label>
                                            <input
                                                type="text"
                                                id="full-name"
                                                name="fullName"
                                                value={profileForm.fullName}
                                                onChange={handleProfileChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Institutional Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={profileForm.email}
                                                disabled
                                                title="Institutional emails are synced from registrar and cannot be modified directly."
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={profileForm.phone}
                                                onChange={handleProfileChange}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="department">Department / Major</label>
                                            <input
                                                type="text"
                                                id="department"
                                                name="department"
                                                value={profileForm.department}
                                                onChange={handleProfileChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="year-designation">Year / Designation</label>
                                            <select
                                                id="year-designation"
                                                name="yearDesignation"
                                                value={profileForm.yearDesignation}
                                                onChange={handleProfileChange}
                                            >
                                                <option value="1st Year">1st Year Student</option>
                                                <option value="2nd Year">2nd Year Student</option>
                                                <option value="3rd Year">3rd Year Student</option>
                                                <option value="4th Year">4th Year Student</option>
                                                <option value="Faculty">Faculty / Staff Member</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="student-id">Student / Staff ID</label>
                                            <input
                                                type="text"
                                                id="student-id"
                                                name="studentId"
                                                value={profileForm.studentId}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary" disabled={isSavingProfile}>
                                            {isSavingProfile ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* SECURITY SECTION */}
                            <div className="settings-card">
                                <div className="settings-card-header">
                                    <div>
                                        <h3 className="settings-card-title">Security & Credentials</h3>
                                        <p className="settings-card-subtitle">
                                            Update your password securely in the database using bcrypt encryption.
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handlePasswordSubmit}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                                >
                                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Change Password</h4>
                                    <div className="form-grid-2">
                                        <div className="form-group">
                                            <label htmlFor="current-pass">Current Password</label>
                                            <input
                                                type="password"
                                                id="current-pass"
                                                placeholder="••••••••"
                                                value={passwords.currentPass}
                                                onChange={(e) =>
                                                    setPasswords((prev) => ({ ...prev, currentPass: e.target.value }))
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="new-pass">New Password</label>
                                            <input
                                                type="password"
                                                id="new-pass"
                                                placeholder="At least 8 characters"
                                                value={passwords.newPass}
                                                onChange={(e) =>
                                                    setPasswords((prev) => ({ ...prev, newPass: e.target.value }))
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-secondary" disabled={isUpdatingPass}>
                                            {isUpdatingPass ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* PRIVACY & DATA MANAGEMENT */}
                            <div className="settings-card">
                                <div className="settings-card-header">
                                    <div>
                                        <h3 className="settings-card-title">Privacy & Data Management</h3>
                                        <p className="settings-card-subtitle">
                                            Control profile visibility and your personal data usage preferences.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="toggle-row">
                                        <div className="toggle-label-group">
                                            <span className="toggle-title">Account Visibility</span>
                                            <span className="toggle-desc">
                                                Allow other verified campus students to see your name when you report an
                                                item you found.
                                            </span>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={privacy.accountVisibility}
                                                onChange={handlePrivacyToggle}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-row">
                                        <div className="toggle-label-group">
                                            <span className="toggle-title">Data Archive Download</span>
                                            <span className="toggle-desc">
                                                Export a copy of all your reported items, submitted claims, and uploaded
                                                documentation.
                                            </span>
                                        </div>
                                        <button className="btn btn-secondary" onClick={handleDataArchiveDownload}>
                                            Download Data Archive
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* DANGER ZONE */}
                            <div className="danger-zone-card">
                                <div className="danger-info">
                                    <h3 className="danger-title">Deactivate Account</h3>
                                    <p className="danger-desc">
                                        Temporarily disable your Campus Smart profile and pause all active recovery
                                        alerts. You can reactivate anytime by logging back in.
                                    </p>
                                </div>
                                <button className="btn btn-danger" onClick={handleDeactivateAccount}>
                                    Deactivate Account
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfileSettings;