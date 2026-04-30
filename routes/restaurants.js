import express from "express";
import Restaurant from "../models/restaurant.js";

export const router = express.Router();

// Middleware that runs for ALL routes in this router
router.use((req, res, next) => {
    console.log(`Restaurant route: ${req.method} ${req.originalUrl}`);
    console.log(`Time: ${new Date().toISOString()}`);
    next();
});

// GET all restaurants
router.get("/", async (req, res) => {
    try {
        let data = await Restaurant.find(req.query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET one restaurant
router.get("/:id", async (req, res) => {
    try {
        let data = await Restaurant.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST
router.post("/", async (req, res) => {
    try {
        let newItem = new Restaurant(req.body);
        let saved = await newItem.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Error creating restaurant" });
    }
});

// PUT
router.put("/:id", async (req, res) => {
    try {
        let updated = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error updating restaurant" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting restaurant" });
    }
});
