import { Schema, model, models } from "mongoose";

const progresoSchema = new Schema({
  leccion: { type: String, required: true }, 
  categoria: { type: String, required: true }, // Nombre de la lección, ej. "abecedario"
  completado: { type: Boolean }, // Si la lección se completó
  actividades: [
    {
      actividad: { type: String, required: true }, // Nombre de la actividad
      score: { type: Number, default: 0 }, // Puntuación obtenida en la actividad
      fecha: { type: Date, default: Date.now } // Fecha de finalización
    }
  ]
});

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\·-]?\w+)*@\w+([\·-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [50, "Fullname must be at most 50 characters"],
  },
  progreso: [progresoSchema] // Nuevo campo para guardar el progreso del usuario
});

const User = models.User || model("User", userSchema);
export default User;
