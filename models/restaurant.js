import mongoose from "mongoose";
const restSchema = new mongoose.Schema({
    restName: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10 },
    visitDate: { type: Date, default: Date.now }
});
export default mongoose.model("Restaurants", restSchema);