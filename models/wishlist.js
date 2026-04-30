import mongoose from "mongoose";
const wishSchema = new mongoose.Schema({
    restName: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant", 
        required: [true, "Restaurant name is required"] },
    food_toTry: { type: String, required: false },
});
export default mongoose.model("Wishlist", wishSchema);