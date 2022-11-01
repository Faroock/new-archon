import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema({
    number: Number,
    tables: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Table",
        default: []
    },
});

export default mongoose.models.Round || mongoose.model("Round", RoundSchema);