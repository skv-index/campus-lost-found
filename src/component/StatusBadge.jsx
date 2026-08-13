import React from 'react';

const StatusBadge = ({ type, text }) => {
    const getBadgeClass = (badgeType) => {
        switch (badgeType) {
            case 'match':
                return 'badge-match';
            case 'claim':
                return 'badge-claim';
            case 'reported':
                return 'badge-reported';
            case 'recovered':
                return 'badge-recovered';
            case 'closed':
                return 'badge-closed';
            default:
                return 'badge-reported';
        }
    };

    return (
        <span className={`status-badge ${getBadgeClass(type)}`}>
            {text}
        </span>
    );
};

export default StatusBadge;