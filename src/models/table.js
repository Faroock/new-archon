import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
    number: Number,
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Player",
        default: []
    },
    status: {
        type: String,
        enum: ["created", "started", "finished"],
        default: "created"
    },
});

export default mongoose.models.Table || mongoose.model("Table", TableSchema);