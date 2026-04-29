import express from "express";
import mongoose from "mongoose";

import foodRoutes from "./routes/foods.js";
import restaurantRoutes from "./routes/restaurants.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ratemeals");

app.use("/api/meals", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
