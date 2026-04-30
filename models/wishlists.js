import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    restName: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant", 
        required: [true, "You must link this to a restaurant"] 
    },
    priority: { 
        type: String, 
        enum: ["High", "Medium", "Low"], 
        default: "Medium" 
    },
    notes: { 
        type: String, 
        required: false 
    },
    addedDate: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("Wishlist", wishlistSchema);