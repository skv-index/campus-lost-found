import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import "./Marketplace.css";
// Mock Data
const MOCK_ITEMS = [
    {
        id: "TRK-9042",
        title: "Sony WH-1000XM4 Headphones",
        type: "Lost",
        category: "Electronics",
        location: "Central Library",
        date: "2026-08-09",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-8821",
        title: "Leather Bi-Fold Wallet",
        type: "Found",
        category: "Wallet",
        location: "Main Cafeteria",
        date: "2026-08-08",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-7612",
        title: "Student ID Card — Naveen K.",
        type: "Found",
        category: "ID Card",
        location: "Tech Lab Block 3",
        date: "2026-08-08",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-6540",
        title: "North Face Backpack (Black)",
        type: "Lost",
        category: "Bag",
        location: "Sports Complex",
        date: "2026-08-07",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-5419",
        title: "Calculus & Linear Algebra Textbook",
        type: "Found",
        category: "Books",
        location: "Academic Quad",
        date: "2026-08-06",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-4311",
        title: "Toyota Car Key ring with Lanyard",
        type: "Found",
        category: "Keys",
        location: "Student Hostel A",
        date: "2026-08-05",
        status: "Resolved / Claimed",
        image:
            "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-3290",
        title: "Denim Jacket (Size L)",
        type: "Lost",
        category: "Clothing",
        location: "Main Cafeteria",
        date: "2026-08-04",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "TRK-2104",
        title: "Apple iPad Pro 11-inch",
        type: "Lost",
        category: "Electronics",
        location: "Central Library",
        date: "2026-08-03",
        status: "Active / Unclaimed",
        image:
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    },
];

const CATEGORY_OPTIONS = [
    "Electronics",
    "Wallet",
    "ID Card",
    "Bag",
    "Books",
    "Keys",
    "Clothing",
    "Other",
];

export default function Marketplace() {
    const navigate = useNavigate();

    // State Management
    const [searchQuery, setSearchQuery] = useState("");
    const [currentType, setCurrentType] = useState("all");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    // API Items & Loading State
    const [dbItems, setDbItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 6;

    // Fetch items from backend API connected to MongoDB Atlas
    const fetchItemsFromDB = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams({
                search: searchQuery,
                type: currentType,
                category: selectedCategories.join(','),
                location: selectedLocation,
                sort: sortOrder,
                page: currentPage,
                limit: itemsPerPage,
            });

            const response = await fetch(`/api/items?${queryParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setDbItems(data.items || []);
                setTotalItems(data.totalItems || 0);
                setTotalPages(data.pages || 1);
            } else {
                console.error("Failed to fetch items from server");
            }
        } catch (error) {
            console.error("Error fetching marketplace items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Refetch items whenever filter/search state changes
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchItemsFromDB();
        }, 200); // 200ms debounce for search input

        return () => clearTimeout(timer);
    }, [
        searchQuery,
        currentType,
        selectedCategories,
        selectedLocation,
        sortOrder,
        currentPage,
    ]);

    // Toggle Category Checkbox Selection
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    // Reset Filters
    const handleResetFilters = () => {
        setSearchQuery("");
        setCurrentType("all");
        setSelectedCategories([]);
        setSelectedLocation("");
        setDateFrom("");
        setDateTo("");
        setSelectedStatus("");
        setSortOrder("newest");
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="app-layout">
            {/* PERSISTENT SIDEBAR */}
            <Sidebar activePage="marketplace" />

            {/* MAIN WRAPPER */}
            <div className="main-wrapper">
                {/* TOP NAV BAR */}
                <header className="top-bar">
                    <div className="breadcrumb">
                        <Link to="/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span style={{ color: "var(--color-text-main)", fontWeight: 600 }}>
                            Lost & Found Marketplace
                        </span>
                    </div>
                </header>

                {/* MAIN MARKETPLACE CONTENT */}
                <main className="content-container">
                    {/* HEADER */}
                    <div className="page-header">
                        <h1 className="page-title">Find a lost item</h1>
                        <p className="page-subtitle">Search reported items across your campus.</p>
                    </div>

                    {/* HERO SEARCH BAR */}
                    <div className="hero-search-card">
                        <div className="search-bar-wrapper">
                            <svg
                                className="search-icon"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                id="searchInput"
                                className="search-input"
                                placeholder="Search for an item..."
                                autoComplete="off"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {/* MAIN MARKETPLACE GRID */}
                    <div className="marketplace-layout">
                        {/* FILTER SIDEBAR */}
                        <aside className="filter-sidebar">
                            <div className="filter-title">
                                <span>Filters</span>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                                </svg>
                            </div>

                            {/* Type Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Type</label>
                                <div className="segmented-control">
                                    <button
                                        type="button"
                                        className={`segmented-btn ${currentType === "all" ? "active" : ""
                                            }`}
                                        onClick={() => {
                                            setCurrentType("all");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        All
                                    </button>
                                    <button
                                        type="button"
                                        className={`segmented-btn ${currentType === "Lost" ? "active" : ""
                                            }`}
                                        onClick={() => {
                                            setCurrentType("Lost");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Lost
                                    </button>
                                    <button
                                        type="button"
                                        className={`segmented-btn ${currentType === "Found" ? "active" : ""
                                            }`}
                                        onClick={() => {
                                            setCurrentType("Found");
                                            setCurrentPage(1);
                                        }}
                                    >
                                        Found
                                    </button>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Category</label>
                                <div className="filter-list" id="categoryFilterList">
                                    {CATEGORY_OPTIONS.map((cat) => (
                                        <label key={cat} className="filter-checkbox">
                                            <input
                                                type="checkbox"
                                                value={cat}
                                                className="category-checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => {
                                                    handleCategoryChange(cat);
                                                    setCurrentPage(1);
                                                }}
                                            />{" "}
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Location Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Location</label>
                                <select
                                    id="locationSelect"
                                    className="form-select"
                                    value={selectedLocation}
                                    onChange={(e) => {
                                        setSelectedLocation(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">All Campus Zones</option>
                                    <option value="Central Library">Central Library</option>
                                    <option value="Tech Lab Block 3">Tech Lab Block 3</option>
                                    <option value="Main Cafeteria">Main Cafeteria</option>
                                    <option value="Sports Complex">Sports Complex</option>
                                    <option value="Student Hostel A">Student Hostel A</option>
                                    <option value="Academic Quad">Academic Quad</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Date Range</label>
                                <input
                                    type="date"
                                    id="dateFrom"
                                    className="form-input-date"
                                    style={{ marginBottom: "0.375rem" }}
                                    placeholder="From"
                                    value={dateFrom}
                                    onChange={(e) => {
                                        setDateFrom(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <input
                                    type="date"
                                    id="dateTo"
                                    className="form-input-date"
                                    placeholder="To"
                                    value={dateTo}
                                    onChange={(e) => {
                                        setDateTo(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="filter-group">
                                <label className="filter-label">Status</label>
                                <select
                                    id="statusSelect"
                                    className="form-select"
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Active / Unclaimed">Active / Unclaimed</option>
                                    <option value="Resolved / Claimed">Resolved / Claimed</option>
                                </select>
                            </div>

                            {/* Filter Action Buttons */}
                            <div className="filter-actions">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    id="applyFiltersBtn"
                                    onClick={() => setCurrentPage(1)}
                                >
                                    Apply Filters
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    id="resetFiltersBtn"
                                    onClick={handleResetFilters}
                                >
                                    Reset
                                </button>
                            </div>
                        </aside>

                        {/* MAIN RESULTS AREA */}
                        <section className="main-area">
                            {/* RESULTS BAR & SORTING */}
                            <div className="results-bar">
                                <div className="results-count" id="resultsCount">
                                    <span id="countNumber">{totalItems}</span> items found
                                </div>
                                <div className="sort-wrapper">
                                    <span>Sort by:</span>
                                    <select
                                        id="sortSelect"
                                        className="sort-select"
                                        value={sortOrder}
                                        onChange={(e) => {
                                            setSortOrder(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                        <option value="title_asc">Title (A-Z)</option>
                                        <option value="title_desc">Title (Z-A)</option>
                                    </select>
                                </div>
                            </div>

                            {/* LOADING & ITEM CARDS GRID & EMPTY STATE */}
                            {isLoading ? (
                                <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                                    <p>Loading campus items from database...</p>
                                </div>
                            ) : dbItems.length === 0 ? (
                                <div
                                    className="empty-state"
                                    id="emptyState"
                                    style={{ display: "flex" }}
                                >
                                    <div className="empty-state-icon">
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            <line x1="8" y1="11" x2="14" y2="11" />
                                        </svg>
                                    </div>
                                    <h3 className="empty-state-title">No matching items found</h3>
                                    <p className="empty-state-subtitle">
                                        Try changing your search query or reset filters.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        id="emptyResetBtn"
                                        style={{ width: "auto", marginTop: "0.5rem" }}
                                        onClick={handleResetFilters}
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="item-grid" id="itemGrid">
                                    {dbItems.map((item) => (
                                        <div className="item-card" key={item._id || item.trackingCode}>
                                            <div className="card-image-wrapper">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="card-image"
                                                />
                                                <span
                                                    className={`card-badge ${(item.type || 'Lost').toLowerCase()}`}
                                                >
                                                    {item.type}
                                                </span>
                                                <span className="card-tracking-id">{item.trackingCode || item.id}</span>
                                            </div>
                                            <div className="card-body">
                                                <span className="card-category">{item.category}</span>
                                                <h3 className="card-title">{item.title}</h3>
                                                <div className="card-meta-list">
                                                    <div className="card-meta-item">
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
                                                        <span>{item.location}</span>
                                                    </div>
                                                    <div className="card-meta-item">
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <rect
                                                                x="3"
                                                                y="4"
                                                                width="18"
                                                                height="18"
                                                                rx="2"
                                                                ry="2"
                                                            />
                                                            <line x1="16" y1="2" x2="16" y2="6" />
                                                            <line x1="8" y1="2" x2="8" y2="6" />
                                                            <line x1="3" y1="10" x2="21" y2="10" />
                                                        </svg>
                                                        <span>{formatDate(item.date)}</span>
                                                    </div>
                                                    <span
                                                        className={`card-status-tag ${(item.status || '').includes("Active")
                                                            ? "active"
                                                            : "claimed"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => navigate(`/item/${item._id || item.trackingCode}`)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PAGINATION */}
                            {!isLoading && dbItems.length > 0 && (
                                <div
                                    className="pagination-container"
                                    id="paginationContainer"
                                >
                                    <div
                                        style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}
                                        id="paginationInfo"
                                    >
                                        Showing page {currentPage} of {totalPages} ({totalItems} total items)
                                    </div>
                                    <div className="pagination-pages" id="paginationPages">
                                        <button
                                            className="page-btn"
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                        </button>

                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNum = index + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    className={`page-btn ${pageNum === currentPage ? "active" : ""
                                                        }`}
                                                    onClick={() => handlePageChange(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            className="page-btn"
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
