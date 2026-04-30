import mongoose from "mongoose";
const restSchema = new mongoose.Schema({
    restName: { 
        type: String, 
        required: [true, "Restaurant name is required"] },
    cuisine: { 
        type: String, 
        required: false },
    rating: { 
        type: Number, 
        min: [1, "A rating from 1 to 10"], 
        max: [10, "A rating from 1 to 10"],
        required: false },
    visitDate: { 
        type: Date, 
        default: Date.now }
});
export default mongoose.model("Restaurant", restSchema);