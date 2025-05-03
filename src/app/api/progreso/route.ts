import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { leccion, categoria, actividad, score } = await req.json(); // Asegúrate de recibir "categoria"
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    let progreso = user.progreso.find((p: any) => p.leccion === leccion);

    if (!progreso) {
      progreso = { leccion, categoria, completado: false, actividades: [] }; // Agrega "categoria" al progreso
      user.progreso.push(progreso);
    }

    if (!actividad) {
      progreso.completado = true;
    } else {
      progreso.actividades.push({ actividad, score, fecha: new Date() });
    }

    // Asegúrate de actualizar la categoría si ya existe el progreso
    if (categoria) {
      progreso.categoria = categoria;
    }

    user.markModified("progreso");
    await user.save();

    return NextResponse.json({ message: "Progreso guardado con éxito", progreso: user.progreso });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al guardar el progreso" }, { status: 500 });
  }
}

// ✅ Agregar GET para obtener el progreso del usuario
export async function GET(req: Request) {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user?.email }).select("progreso");

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user.progreso);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener el progreso" }, { status: 500 });
  }
}