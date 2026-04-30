import express from "express";
import Food from "../models/food.js";

export const router = express.Router();

// Middleware that runs for ALL routes in this router
router.use((req, res, next) => {
    console.log(`Food route: ${req.method} ${req.originalUrl}`);
    console.log(`Time: ${new Date().toISOString()}`);
    next();
});

// GET all foods (with filtering, search, sorting, pagination, and population)
router.get("/", async (req, res) => {
    try {
        let query = {};

        // Filter by restaurant name
        if (req.query.restaurant) {
            query.restName = req.query.restaurant;
        }

        // Search meal name
        if (req.query.search) {
            query.meal = { $regex: req.query.search, $options: "i" };
        }

        // ADDED POPULATE HERE TO SHOW THE RELATIONSHIP
        let foods = await Food.find(query).populate("restName");

        // Sort by rating
        if (req.query.sort) {
            foods = foods.sort((a, b) => a.rating - b.rating);
        }

        // Pagination
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || foods.length;
        let start = (page - 1) * limit;
        let end = start + limit;

        foods = foods.slice(start, end);

        res.json(foods);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET one food
router.get("/:id", async (req, res) => {
    try {
        // ADDED POPULATE HERE TO SHOW THE RELATIONSHIP
        let food = await Food.findById(req.params.id).populate("restName");
        res.json(food);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// POST create food
router.post("/", async (req, res) => {
    try {
        let newFood = new Food(req.body);
        let saved = await newFood.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: "Error creating food" });
    }
});

// PUT update food
router.put("/:id", async (req, res) => {
    try {
        let updated = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Error updating food" });
    }
});

// DELETE food
router.delete("/:id", async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: "Food deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting food" });
    }
});