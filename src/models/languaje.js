import mongoose from "mongoose";

const LanguajeSchema = new mongoose.Schema({
    es: Object,
    en: Object,
});

export default mongoose.models.Languaje || mongoose.model("Languaje", LanguajeSchema);