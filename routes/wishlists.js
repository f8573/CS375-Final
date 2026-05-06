import express from "express";
import Wishlist from "../models/wishlists.js";
import { protect } from "../middleware/authMiddleware.js";

export const router = express.Router();

// GET all wishlists (Handles Filtering, Sorting, and Populating Relationships)
router.get("/", async (req, res) => {
    try {
        let items = await Wishlist.find(req.query)
            .populate("restName") // <--- This is the magic line!
            .sort({ addedDate: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST to wishlist
router.post("/", protect, async (req, res) => {
    try {
        let newItem = new Wishlist(req.body);
        let saved = await newItem.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Error adding to wishlist" });
    }
});

// PUT (Update) a wishlist item
router.put("/:id", protect, async (req, res) => {
    try {
        // { new: true } tells Mongoose to return the updated item, not the old one
        let updated = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error updating wishlist item" });
    }
});

// DELETE from wishlist
router.delete("/:id", protect, async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from wishlist" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting wishlist item" });
    }
});
