import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="top-header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 700, fontSize: '1.125rem' }}>
                    Campus<span style={{ color: '#2563eb' }}>Smart</span>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                    onClick={() => navigate('/dashboard')} 
                    style={{ background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                    Dashboard
                </button>
            </div>
        </header>
    );
}
