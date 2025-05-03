import mongoose from "mongoose";

const CancionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true }
});

const Cancion = mongoose.models.Cancion || mongoose.model("Cancion", CancionSchema);

export default Cancion;
