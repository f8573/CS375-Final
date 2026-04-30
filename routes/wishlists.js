import express from "express";
import Wishlist from "../models/wishlists.js";

export const router = express.Router();

// GET all wishlists (Handles Filtering and Sorting)
router.get("/", async (req, res) => {
    try {
        // req.query handles filtering. sort() puts newest first.
        let items = await Wishlist.find(req.query).sort({ addedDate: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST to wishlist
router.post("/", async (req, res) => {
    try {
        let newItem = new Wishlist(req.body);
        let saved = await newItem.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Error adding to wishlist" });
    }
});

// PUT (Update) a wishlist item
router.put("/:id", async (req, res) => {
    try {
        // { new: true } tells Mongoose to return the updated item, not the old one
        let updated = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error updating wishlist item" });
    }
});

// DELETE from wishlist
router.delete("/:id", async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from wishlist" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting wishlist item" });
    }
});