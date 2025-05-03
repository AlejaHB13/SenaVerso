import { NextResponse } from "next/server";
import {connectDB} from "@/libs/mongodb";
import Cancion from "@/models/cancion";

// Conectar a la base de datos antes de procesar cualquier petición
async function connect() {
  await connectDB();
}

// Método GET para obtener las canciones
export async function GET() {
  await connect();

  try {
    const canciones = await Cancion.find();
    return NextResponse.json(canciones, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener las canciones" }, { status: 500 });
  }
}

// Método POST para agregar una canción (opcional)
export async function POST(req: Request) {
  await connect();
  try {
    const { title, youtubeId} = await req.json();
    const nuevaCancion = new Cancion({ title, youtubeId });
    await nuevaCancion.save();
    
    return NextResponse.json({ message: "Canción guardada" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al guardar la canción" }, { status: 500 });
  }
}

