import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        trackingCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        type: {
            type: String,
            enum: ['Lost', 'Found'],
            required: [true, 'Type is required'],
        },
        category: {
            type: String,
            enum: [
                'Electronics',
                'Personal Access',
                'Keys / Badges',
                'Audio Gadgets',
                'Bags & Backpacks',
                'Books & Stationery',
                'Clothing & Wearables',
                // Legacy / seed data values
                'Wallet', 'ID Card', 'Bag', 'Books', 'Keys', 'Clothing',
                'Other',
            ],
            default: 'Other',
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        specificLocation: {
            type: String,
            trim: true,
            default: '',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        timeLost: {
            type: String,
            trim: true,
            default: '',
        },
        timeFound: {
            type: String,
            trim: true,
            default: '',
        },
        brand: {
            type: String,
            trim: true,
            default: '',
        },
        color: {
            type: String,
            trim: true,
            default: '',
        },
        custody: {
            type: String,
            trim: true,
            default: '',
        },
        status: {
            type: String,
            enum: ['Active / Unclaimed', 'Resolved / Claimed', 'Under Verification'],
            default: 'Active / Unclaimed',
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        features: [
            {
                type: String,
            },
        ],
        reporterName: {
            type: String,
            default: 'Anonymous Student',
        },
        reporterContact: {
            type: String,
            default: '',
        },
        reporterEmail: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
