const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/UserModel');
const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Signup route (also called register)
router.post('/signup', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if user already exists by email or username
        let existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const user = new UserModel({ email, username, password: hashedPassword });
        await user.save();

        // Create token immediately after signup
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(201).json({ 
            token, 
            msg: 'User signed up successfully!' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});



// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Allow login with either username or email
        const user = await UserModel.findOne({ 
            $or: [{ username: username || email }, { email: email || username }] 
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create token with user id and role
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({ 
            token, 
            msg: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Check authentication status route
router.get('/check-auth', auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                isAuthenticated: false, 
                msg: 'User not found' 
            });
        }

        res.json({ 
            isAuthenticated: true, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            isAuthenticated: false, 
            msg: 'Server error' 
        });
    }
});

// Logout route (optional - for server-side token invalidation if needed)
router.post('/logout', auth, async (req, res) => {
    try {
        // If you're using token blacklisting, add token to blacklist here
        // For now, just send success response
        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;

