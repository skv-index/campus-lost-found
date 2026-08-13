import React from 'react';

const ItemSummaryCard = ({ item }) => {
    return (
        <div className="item-summary-card">
            <img src={item.image} alt={item.title} className="item-summary-thumb" />

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