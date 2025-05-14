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
    required: [true, "Debes ingresar un correo electrónico"],
    match: [
      /^\w+([\·-]?\w+)*@\w+([\·-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
  },
  password: {
    type: String,
    required: [true, "Debes ingresar una contraseña"],
    select: false,
  },
  fullname: {
    type: String,
    required: [true, "Debes ingresar tu nombre"],
    minLength: [3, "El nombre debe tener minimo 3 caracteres"],
    maxLength: [50, "El nombre debe tener maximo 50 caracteres"],
  },
  progreso: [progresoSchema] // Nuevo campo para guardar el progreso del usuario
});

const User = models.User || model("User", userSchema);
export default User;
