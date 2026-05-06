import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import { router as foodRoutes } from "./routes/foods.js";
import { router as restaurantRoutes } from "./routes/restaurants.js";
import { router as wishlistRoutes } from "./routes/wishlists.js";

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    try {
        if (!MONGODB_URI) {
            throw new Error("Missing MONGODB_URI. Add it to your environment or .env file.");
        }

        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

await connectDB();

const logRequest = function(req, res, next) {
    console.log(`Request: ${req.method} for ${req.path}`);
    next();
};

app.use(express.json());
app.use(logRequest);

app.use("/api/meals", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/wishlists", wishlistRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
