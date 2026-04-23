import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    restName: { type: String, required: true },
    meal: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10 },
    comments: { type: String, required: false },
    visitDate: { type: Date, default: Date.now }
});
export default mongoose.model("Food", foodSchema);