import mongoose from "mongoose";

const JudgeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    nickname: String,
});

export default mongoose.models.Judge || mongoose.model("Judge", JudgeSchema);