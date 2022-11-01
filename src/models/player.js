import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
    name: String,
    email: String,
    nickname: String,
    score: {
        type: Number,
        default: 0
    },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);