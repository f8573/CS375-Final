import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";
import { generateToken } from "../utils/generateToken.js";

export const router = express.Router();

function sanitizeUser(user) {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

function isValidEmail(email = "") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            token: generateToken(user._id),
            user: sanitizeUser(user)
        });
    } catch (err) {
        return res.status(500).json({ message: "Unable to register user" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.json({
            token: generateToken(user._id),
            user: sanitizeUser(user)
        });
    } catch (err) {
        return res.status(500).json({ message: "Unable to log in" });
    }
});

router.get("/me", protect, async (req, res) => {
    return res.json({ user: sanitizeUser(req.user) });
});
