import React from "react";

export default function ItemCard({ item }) {
    const isFound = item.type === "found";

    return (
        <article className="item-card" data-type={item.type}>
            <div className="item-image-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="item-status-badge">
                    <span className={`badge ${isFound ? "badge-success" : "badge-warning"}`}>
                        {isFound ? "Found" : "Lost"}
                    </span>
                </div>
            </div>
            <div className="item-content">
                <span className="item-category">{item.category}</span>
                <h3 className="item-title">{item.title}</h3>
                <div className="item-meta-list">
                    <div className="item-meta-item">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {item.location}
                    </div>
                    <div className="item-meta-item">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {item.time}
                    </div>
                </div>
            </div>
            <div className="item-card-footer">
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-muted)" }}>
                    Ref: {item.ref}
                </span>
                <a
                    href="#claim"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: "0.375rem 0.875rem", fontSize: "0.8125rem" }}
                >
                    {isFound ? "Claim Item" : "Match Found?"}
                </a>
            </div>
        </article>
    );
}