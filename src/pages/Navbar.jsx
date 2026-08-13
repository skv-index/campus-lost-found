import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileOpen(false);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="header-nav" aria-label="Main Navigation">
                    {/* Logo */}
                    <Link to="/" className="brand-logo">
                        <div className="logo-icon">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <path d="M11 8v6M8 11h6"></path>
                            </svg>
                        </div>
                        <span className="brand-name">
                            Campus<span>Smart</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Menu */}
                    <ul className="nav-menu">
                        <li>
                            <a href="#home" className="nav-link active">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#recent" className="nav-link">
                                Browse Items
                            </a>
                        </li>
                        <li>
                            <a href="#how-it-works" className="nav-link">
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="nav-link">
                                Features
                            </a>
                        </li>
                    </ul>

                    {/* Right Side Actions */}
                    <div className="nav-actions">
                        <button className="btn btn-ghost" onClick={() => navigate("/login")}>
                            Log In
                        </button>
                        <a href="#report" className="btn btn-primary">
                            Report an Item
                        </a>
                        <button
                            className="mobile-menu-btn"
                            id="mobileMenuBtn"
                            aria-label="Toggle Mobile Menu"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Slide Drawer */}
            <div
                className={`mobile-drawer ${isMobileOpen ? "active" : ""}`}
                id="mobileDrawer"
            >
                <a href="#home" className="nav-link active" onClick={closeMobileMenu}>
                    Home
                </a>
                <a href="#recent" className="nav-link" onClick={closeMobileMenu}>
                    Browse Items
                </a>
                <a href="#how-it-works" className="nav-link" onClick={closeMobileMenu}>
                    How It Works
                </a>
                <a href="#features" className="nav-link" onClick={closeMobileMenu}>
                    Features
                </a>
                <hr style={{ border: "none", borderTop: "1px solid var(--color-border-subtle)" }} />
                <button
                    className="btn btn-secondary"
                    style={{ width: "100%" }}
                    onClick={() => {
                        closeMobileMenu();
                        navigate("/login");
                    }}
                >
                    Log In
                </button>
            </div>
        </header>
    );
}