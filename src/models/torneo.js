import mongoose from "mongoose";

const TorneoSchema = new mongoose.Schema({
    name: String,
    judge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Judge"
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Player",
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["created", "started", "finished"],
        default: "created"
    },
    rounds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Round",
        default: []
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    },
});

export default mongoose.models.Torneo || mongoose.model("Torneo", TorneoSchema);