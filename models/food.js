import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    restName: { 
        type: mongoose.Schema.Type,
        ref: "Restaurant", 
        required: [true, "Restaurant name is required"] },
    meal: { 
        type: String, 
        required: [true, "Name of meal is required"] },
    rating: { 
        type: Number, 
        min: [1, "A rating from 1 to 10"], 
        max: [10, "A rating from 1 to 10"],
        required: false },
    comments: { 
        type: String, 
        required: false },
    visitDate: { 
        type: Date, 
        default: Date.now }
});
export default mongoose.model("Food", foodSchema);