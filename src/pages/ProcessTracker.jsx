import React from 'react';

const steps = [
    { id: 1, label: 'Submit Claim' },
    { id: 2, label: 'Desk Reviews' },
    { id: 3, label: 'Ownership Verified' },
    { id: 4, label: 'Recovery Arranged' },
];

const ProcessTracker = ({ currentStep = 1 }) => {
    return (
        <div className="process-card">
            <div className="process-title">Verification Process</div>
            <div className="process-steps">
                {steps.map((step) => (
                    <div key={step.id} className={`step-item ${step.id === currentStep ? 'active' : ''}`}>
                        <div className="step-header">
                            <div className="step-number">{step.id}</div>
                            <span className="step-label">{step.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessTracker;