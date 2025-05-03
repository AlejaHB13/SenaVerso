import { NextResponse } from "next/server";
import {connectDB} from "@/libs/mongodb";
import Cuento from "@/models/cuento";

// Conectar a la base de datos antes de procesar cualquier petición
async function connect() {
  await connectDB();
}

// Método GET para obtener las canciones
export async function GET() {
  await connect();

  try {
    const cuentos = await Cuento.find();
    return NextResponse.json(cuentos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener las cuentos" }, { status: 500 });
  }
}

// Método POST para agregar una canción (opcional)
export async function POST(req: Request) {
  await connect();
  try {
    const { title, youtubeId } = await req.json();
    const nuevoCuento = new Cuento({ title, youtubeId });
    await nuevoCuento.save();
    
    return NextResponse.json({ message: "Cuento guardada" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al guardar la cuento" }, { status: 500 });
  }
}

