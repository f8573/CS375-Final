import express from "express";
import Wishlist from "../models/wishlists.js";

export const router = express.Router();

// GET all wishlists
router.get("/", async (req, res) => {
    try {
        let items = await Wishlist.find(req.query);
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

// DELETE from wishlist
router.delete("/:id", async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed from wishlist" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting wishlist item" });
    }
});