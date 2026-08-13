import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to generate JWT token
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'campus_smart_secret_jwt_key_2026_secure';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Student or Staff)
// @access  Public
router.post('/register', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ message: 'Database is connecting or unavailable. Please try again shortly.' });
        }

        const { fullName, email, password, role, studentId, phone } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide full name, email, and password' });
        }

        // Validate role (student or staff)
        const validRoles = ['student', 'staff'];
        const userRole = validRoles.includes(role?.toLowerCase()) ? role.toLowerCase() : 'student';

        // Check if user already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: 'An account with this email address already exists' });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password,
            role: userRole,
            studentId: studentId || '',
            phone: phone || '',
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                phone: user.phone,
                department: user.department,
                yearDesignation: user.yearDesignation,
                avatar: user.avatar,
                notifications: user.notifications,
                privacy: user.privacy,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message || 'Server error during registration' });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ message: 'Database is connecting or unavailable. Please try again shortly.' });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                phone: user.phone,
                department: user.department,
                yearDesignation: user.yearDesignation,
                avatar: user.avatar,
                notifications: user.notifications,
                privacy: user.privacy,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Server error during authentication' });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error fetching user profile' });
    }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile details, notifications, or privacy settings
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { fullName, phone, department, yearDesignation, avatar, notifications, privacy } = req.body;

        if (fullName !== undefined) user.fullName = fullName;
        if (phone !== undefined) user.phone = phone;
        if (department !== undefined) user.department = department;
        if (yearDesignation !== undefined) user.yearDesignation = yearDesignation;
        if (avatar !== undefined) user.avatar = avatar;
        if (notifications !== undefined) user.notifications = { ...user.notifications, ...notifications };
        if (privacy !== undefined) user.privacy = { ...user.privacy, ...privacy };

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            studentId: updatedUser.studentId,
            phone: updatedUser.phone,
            department: updatedUser.department,
            yearDesignation: updatedUser.yearDesignation,
            avatar: updatedUser.avatar,
            notifications: updatedUser.notifications,
            privacy: updatedUser.privacy,
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: error.message || 'Server error updating profile' });
    }
});

// @route   PUT /api/auth/change-password
// @desc    Change current user password
// @access  Private
router.put('/change-password', protect, async (req, res) => {
    try {
        const { currentPass, newPass } = req.body;
        if (!currentPass || !newPass) {
            return res.status(400).json({ message: 'Please provide both current and new password.' });
        }

        if (newPass.length < 8) {
            return res.status(400).json({ message: 'New password must be at least 8 characters long.' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await user.matchPassword(currentPass);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }

        user.password = newPass;
        await user.save();

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: error.message || 'Server error updating password' });
    }
});

export default router;

