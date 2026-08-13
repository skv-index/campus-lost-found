import express from 'express';
import mongoose from 'mongoose';
import Claim from '../models/Claim.js';
import Item from '../models/Item.js';
import { protect, staffOnly } from '../middleware/auth.js';

const router = express.Router();

router.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ message: 'Database is connecting or unavailable. Please try again shortly.' });
    }
    next();
});

// @route   POST /api/claims
// @desc    Submit a new claim
// @access  Private (any authenticated user)
router.post('/', protect, async (req, res) => {
    try {
        const { itemId, claimReason, identifyingFeatures, purchaseDate, previousLocation, additionalDetails } = req.body;
        if (!itemId || !claimReason?.trim() || !identifyingFeatures?.trim()) {
            return res.status(400).json({ message: 'Item, claim reason, and identifying features are required.' });
        }

        const item = await Item.findById(itemId);
        if (!item || item.type !== 'Found' || item.status !== 'Active / Unclaimed') {
            return res.status(404).json({ message: 'This found item is no longer available to claim.' });
        }

        const claim = await Claim.create({
            item: item._id,
            claimant: req.user._id,
            claimReason,
            identifyingFeatures,
            purchaseDate: purchaseDate || undefined,
            previousLocation,
            additionalDetails,
        });
        res.status(201).json(claim);
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(409).json({ message: 'You have already submitted a claim for this item.' });
        }
        console.error('Error creating claim:', error);
        res.status(500).json({ message: 'Server error creating claim.' });
    }
});

// @route   GET /api/claims/mine
// @desc    Get all claims by current logged-in user
// @access  Private
router.get('/mine', protect, async (req, res) => {
    try {
        const claims = await Claim.find({ claimant: req.user._id }).populate('item').sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Error fetching claims:', error);
        res.status(500).json({ message: 'Server error fetching claims.' });
    }
});

// @route   GET /api/claims/all
// @desc    Get all submitted claims across campus (Staff/Teacher only)
// @access  Private (Staff)
router.get('/all', protect, staffOnly, async (req, res) => {
    try {
        const claims = await Claim.find()
            .populate('item')
            .populate('claimant', 'fullName email studentId phone role')
            .sort({ createdAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Error fetching all claims:', error);
        res.status(500).json({ message: 'Server error fetching claims for desk dashboard.' });
    }
});

// @route   PUT /api/claims/:id/status
// @desc    Update status of a claim (Staff/Teacher only)
// @access  Private (Staff)
router.put('/:id/status', protect, staffOnly, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Under Review', 'More Information Required', 'Approved', 'Rejected', 'Recovered'].includes(status)) {
            return res.status(400).json({ message: 'Invalid claim status option.' });
        }

        const claim = await Claim.findById(req.params.id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim record not found.' });
        }

        claim.status = status;
        await claim.save();

        if (status === 'Approved' || status === 'Recovered') {
            await Item.findByIdAndUpdate(claim.item, { status: 'Resolved / Claimed' });
        }

        res.json({ message: `Claim status updated to ${status}`, claim });
    } catch (error) {
        console.error('Error updating claim status:', error);
        res.status(500).json({ message: 'Server error updating claim status.' });
    }
});

// @route   GET /api/claims/:id
// @desc    Get a single claim by ID (owner only)
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const claim = await Claim.findOne({ _id: req.params.id, claimant: req.user._id }).populate('item');
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found.' });
        }
        res.json(claim);
    } catch (error) {
        console.error('Error fetching claim detail:', error);
        res.status(500).json({ message: 'Server error fetching claim.' });
    }
});

// @route   DELETE /api/claims/:id
// @desc    Withdraw a claim (owner only)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const claim = await Claim.findOne({ _id: req.params.id, claimant: req.user._id });
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found or unauthorized.' });
        }
        if (claim.status === 'Approved' || claim.status === 'Recovered') {
            return res.status(400).json({ message: 'Cannot withdraw a claim that has already been approved or recovered.' });
        }
        await Claim.deleteOne({ _id: req.params.id });
        res.json({ message: 'Claim successfully withdrawn.' });
    } catch (error) {
        console.error('Error deleting claim:', error);
        res.status(500).json({ message: 'Server error withdrawing claim.' });
    }
});

export default router;
