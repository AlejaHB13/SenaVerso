import mongoose from "mongoose";

const CuentoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true }
});

const Cuento = mongoose.models.Cuento || mongoose.model("Cuento", CuentoSchema);

export default Cuento;
