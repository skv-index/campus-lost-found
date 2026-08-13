import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item.js';
import { protect, staffOnly } from '../middleware/auth.js';
import { seedDB } from '../seed.js';

const router = express.Router();

router.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database is connecting or unavailable. Please try again shortly.' });
    }
    next();
});

// Helper to generate unique tracking code TRK-XXXX
const generateTrackingCode = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `TRK-${randomDigits}`;
};

const matchingWords = (value = '') => new Set(
    value.toLowerCase().match(/[a-z0-9]{3,}/g) || []
);

const getMatchScore = (lost, found) => {
    let score = 0;
    if (lost.category === found.category) score += 45;
    if (lost.brand && found.brand && lost.brand.toLowerCase() === found.brand.toLowerCase()) score += 15;
    if (lost.color && found.color && lost.color.toLowerCase() === found.color.toLowerCase()) score += 10;

    const lostWords = matchingWords(`${lost.title} ${lost.description} ${lost.features.join(' ')}`);
    const foundWords = matchingWords(`${found.title} ${found.description} ${found.features.join(' ')}`);
    const sharedWords = [...lostWords].filter((word) => foundWords.has(word));
    score += Math.min(sharedWords.length * 10, 30);

    return Math.min(score, 100);
};

// @route GET /api/items/matches
// @desc  Return evidence-based matches between active lost and found reports
router.get('/matches', async (req, res) => {
    try {
        const items = await Item.find({ status: 'Active / Unclaimed' }).sort({ createdAt: -1 });
        const lostItems = items.filter((item) => item.type === 'Lost');
        const foundItems = items.filter((item) => item.type === 'Found');
        const matches = [];

        for (const lost of lostItems) {
            for (const found of foundItems) {
                const score = getMatchScore(lost, found);
                if (score >= 55) matches.push({ lost, found, score });
            }
        }
        res.json(matches.sort((a, b) => b.score - a.score).slice(0, 5));
    } catch (error) {
        console.error('Error finding item matches:', error);
        res.status(500).json({ message: 'Server error finding item matches.' });
    }
});

// @route   GET /api/items
// @desc    Get items with filtering, search, sorting, and pagination
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, type, category, location, sort, page = 1, limit = 50 } = req.query;

        let query = {};

        // Type filter (Lost / Found)
        if (type && type !== 'all') {
            query.type = { $regex: new RegExp(`^${type}$`, 'i') };
        }

        // Category filter (support single or comma-separated)
        if (category) {
            const categories = Array.isArray(category) ? category : category.split(',');
            if (categories.length > 0) {
                query.category = { $in: categories.map((c) => new RegExp(`^${c.trim()}$`, 'i')) };
            }
        }

        // Location filter
        if (location && location !== 'All Campus Zones' && location.trim() !== '') {
            query.location = { $regex: new RegExp(location.trim(), 'i') };
        }

        // Search text filter
        if (search && search.trim() !== '') {
            const searchRegex = new RegExp(search.trim(), 'i');
            query.$or = [
                { title: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { specificLocation: searchRegex },
                { trackingCode: searchRegex },
                { category: searchRegex },
            ];
        }

        // Sort configuration
        let sortOption = { createdAt: -1 }; // default newest
        if (sort === 'oldest') sortOption = { createdAt: 1 };
        if (sort === 'title_asc') sortOption = { title: 1 };
        if (sort === 'title_desc') sortOption = { title: -1 };

        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 50;
        const skip = (pageNum - 1) * limitNum;

        const totalItems = await Item.countDocuments(query);
        const items = await Item.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        res.json({
            items,
            totalItems,
            page: pageNum,
            pages: Math.ceil(totalItems / limitNum) || 1,
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error fetching items', error: error.message });
    }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID or trackingCode
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let item;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            item = await Item.findById(id);
        }

        if (!item) {
            item = await Item.findOne({ trackingCode: id.toUpperCase() });
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ message: 'Server error fetching item details' });
    }
});

// @route   POST /api/items
// @desc    Create a new lost or found item report
// @access  Public
router.post('/', async (req, res) => {
    try {
        const {
            title,
            itemName,
            type,
            category,
            location,
            specificLocation,
            date,
            dateLost,
            dateFound,
            timeLost,
            timeFound,
            brand,
            color,
            custody,
            image,
            imagePreviewUrl,
            description,
            features,
            reporterName,
            reporterContact,
            reporterEmail,
        } = req.body;

        const itemTitle = title || itemName;
        const itemType = type || 'Lost';
        const itemDate = date || dateLost || dateFound || new Date();
        const itemImage = image || imagePreviewUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';

        if (!itemTitle || !location) {
            return res.status(400).json({ message: 'Please provide item title and location' });
        }

        let trackingCode = generateTrackingCode();
        // Ensure tracking code uniqueness
        let existing = await Item.findOne({ trackingCode });
        while (existing) {
            trackingCode = generateTrackingCode();
            existing = await Item.findOne({ trackingCode });
        }

        const newItem = await Item.create({
            trackingCode,
            title: itemTitle,
            type: itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase(),
            category: category || 'Other',
            location,
            specificLocation: specificLocation || '',
            date: itemDate,
            timeLost: timeLost || '',
            timeFound: timeFound || '',
            brand: brand || '',
            color: color || '',
            custody: custody || '',
            status: 'Active / Unclaimed',
            image: itemImage,
            description: description || '',
            features: Array.isArray(features) ? features : [],
            reporterName: reporterName || 'Campus User',
            reporterContact: reporterContact || '',
            reporterEmail: reporterEmail || '',
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Server error creating item report', error: error.message });
    }
});

// @route   PUT /api/items/:id/status
// @desc    Update item status (Staff / Teacher only)
// @access  Private (Staff)
router.put('/:id/status', protect, staffOnly, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Active / Unclaimed', 'Under Verification', 'Resolved / Claimed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        }

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }
        res.json({ message: `Item status updated to "${status}"`, item });
    } catch (error) {
        console.error('Error updating item status:', error);
        res.status(500).json({ message: 'Server error updating item status.' });
    }
});

// @route   POST /api/items/seed
// @desc    Seed 10 items into database
// @access  Public
router.post('/seed', async (req, res) => {
    try {
        await seedDB();
        const count = await Item.countDocuments();
        res.json({ message: 'Successfully seeded database', count });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
});

export default router;
