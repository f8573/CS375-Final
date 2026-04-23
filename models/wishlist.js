import mongoose from "mongoose";
const wishSchema = new mongoose.Schema({
    restName: { type: String, required: true },
    food_toTry: { type: String, required: false },
});
export default mongoose.model("Wishlist", wishSchema);