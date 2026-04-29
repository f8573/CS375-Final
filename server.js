import express from "express";
import mongoose from "mongoose";

import {router as foodRoutes} from "./routes/foods.js";
import {router as restaurantRoutes} from "./routes/restaurants.js";

const app = express();

const PORT = process.env.PORT || 3000;

//Database Connection
const mongoDB = "mongodb+srv://boza3511_db_user:Murp640064642798@cluster0.oscj1mr.mongodb.net/?appName=Cluster0/task_manager";

async function connectBD() {
    try {
        await mongoose.connect(mongoDB);
        console.log("mongoDB connected");
    } catch (err) {
        console.error("mongoDB connected");
        process.exit(1);
    }
}

await connectBD();

const logRequest = function(req, res, next) {
console.log(`Request: ${req.method} for ${req.path}`);
    next();
};

app.use(express.json());
app.use(logRequest);

app.use("/api/meals", foodRoutes);
app.use("/api/restaurants", restaurantRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/ratemeals");

app.listen(PORT, "0.0.0.0", () => {
console.log(`Server running on port ${PORT}`);
});