import React from 'react';

const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';

const ItemSummaryCard = ({ item }) => {
    return (
        <div className="item-summary-card">
            <img
                src={item.image || FALLBACK_IMAGE}
                alt={item.title}
                className="item-summary-thumb"
                loading="lazy"
                onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
                }}
            />

            <div className="item-summary-details">
                <h2 className="item-summary-title">{item.title}</h2>
                <div className="item-summary-grid">
                    <div className="summary-meta-item">
                        <span className="meta-label">Category</span>
                        <span className="meta-value">{item.category}</span>
                    </div>
                    <div className="summary-meta-item">
                        <span className="meta-label">Found Location</span>
                        <span className="meta-value">{item.foundLocation}</span>
                    </div>
                    <div className="summary-meta-item">
                        <span className="meta-label">Date Found</span>
                        <span className="meta-value">{item.dateFound}</span>
                    </div>
                    <div className="summary-meta-item">
                        <span className="meta-label">Tracking ID</span>
                        <span className="meta-value tracking-tag">{item.id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemSummaryCard;