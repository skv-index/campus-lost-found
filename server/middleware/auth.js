import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'campus_smart_secret_jwt_key_2026_secure';
            const decoded = jwt.verify(token, secret);

            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

export const staffOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'staff' || req.user.role === 'teacher' || req.user.role === 'admin')) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Desk Operations Dashboard is restricted to teachers and staff members.' });
};

