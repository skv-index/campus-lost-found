import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
        },
        role: {
            type: String,
            enum: ['student', 'staff'],
            default: 'student',
        },
        studentId: {
            type: String,
            trim: true,
            default: '',
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        department: {
            type: String,
            trim: true,
            default: 'Decision and Computing Sciences',
        },
        yearDesignation: {
            type: String,
            trim: true,
            default: '2nd Year',
        },
        avatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        notifications: {
            matchAlerts: { type: Boolean, default: true },
            claimUpdates: { type: Boolean, default: true },
            systemNotifs: { type: Boolean, default: true },
            emailNotifs: { type: Boolean, default: true },
        },
        privacy: {
            accountVisibility: { type: Boolean, default: false },
        },
    },

    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
