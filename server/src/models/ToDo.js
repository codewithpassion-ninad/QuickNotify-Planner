import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    timer:{
        type: Number,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Todo", todoSchema);
