import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
    {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        claimant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        claimReason: { type: String, required: true, trim: true },
        identifyingFeatures: { type: String, required: true, trim: true },
        purchaseDate: { type: Date },
        previousLocation: { type: String, trim: true, default: '' },
        additionalDetails: { type: String, trim: true, default: '' },
        status: {
            type: String,
            enum: ['Under Review', 'More Information Required', 'Approved', 'Rejected', 'Recovered'],
            default: 'Under Review',
        },
    },
    { timestamps: true }
);

claimSchema.index({ item: 1, claimant: 1 }, { unique: true });

export default mongoose.model('Claim', claimSchema);
