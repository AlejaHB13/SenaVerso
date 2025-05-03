"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Definir los tipos para TypeScript
type Actividad = {
  actividad: string;
  categoria: string;
  score: number;
  fecha: string;
};

type Progreso = {
  leccion: string;
  categoria: string; // Agregar la propiedad 'categoria'
  completado: boolean;
  actividades: Actividad[];
};

const menuItems = [
  { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
  { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
  { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
  { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
];

// Mapeo de insignias por lección
const lessonBadges: Record<string, { image: string; text: string }> = {
  juego1: { image: "/insignia1.png", text: "Insignia isla" },
  juego2: { image: "/insignia2.png", text: "Insignia granja" },
  juego3: { image: "/insignia3.png", text: "Insignia jardín" },
};

function ProfilePage() {
  const { data: session, status } = useSession();
  const [progreso, setProgreso] = useState<Progreso[]>([]);

  useEffect(() => {
    const fetchProgreso = async () => {
      if (session?.user?.email) {
        const res = await fetch("/api/progreso");
        const data: Progreso[] = await res.json();
        setProgreso(data);
      }
    };

    fetchProgreso();
  }, [session]);

  return (
    <div className="flex">
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
        <Image
          src="/logo.png"
          alt="Logo El Mundo de las Señas"
          width={100}
          height={100}
        />
        <h2 className="text-center font-semibold text-[#69FF37]">SeñaVerso</h2>
        <h3 className="text-center text-[#69FF37] text-xs mb-8">
          Explora el mundo en señas
        </h3>

        <nav className="w-full flex flex-col items-start px-6 space-y-8 mb-6">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={50}
                height={50}
                className="object-contain"
              />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-8 text-center font-bold text-2xl text-black mb-8">
        <h1 className="font-bold text-3xl text-center mb-6 text-[#69FF37]">
          Perfil
        </h1>

        <div className="space-y-4">
          {session?.user && (
            <>
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-[#69FF37]/40">
                <span className="font-medium text-gray-700">Correo:</span>
                <span className="text-gray-800 font-semibold">
                  {session.user.email ?? "No disponible"}
                </span>
              </div>

              {/* Sección de Progreso */}
              <div className="bg-white rounded-lg p-4 border border-[#69FF37]/40 mt-6">
                <h2 className="text-xl font-semibold text-[#69FF37] mb-3">Tu Progreso</h2>
                {progreso.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["abecedario", "colores", "animales"].map((categoria) => (
                      <div key={categoria} className="bg-gray-50 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-[#69FF37] mb-2 capitalize">
                          {categoria}
                        </h3>
                        {progreso
                          .filter(
                            (p) =>
                              p.categoria === categoria &&
                              !["juego1", "juego2", "juego3"].includes(p.leccion) // Excluir lecciones juego1, juego2 y juego3
                          )
                          .map((p) => (
                            <div
                              key={p.leccion}
                              className="border-b border-gray-300 pb-2 mb-2"
                            >
                              <h4 className="text-md font-medium text-gray-800">
                                Lección: {p.leccion} {p.completado ? "✅" : "✅"}
                              </h4>
                              {p.actividades.length > 0 && (
                                <ul className="mt-2 text-gray-700 text-sm">
                                  {p.actividades.map((a, index) => (
                                    <li key={index}>
                                      {a.actividad}:{" "}
                                      <span className="font-semibold">{a.score} puntos</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        {progreso.filter(
                          (p) =>
                            p.categoria === categoria &&
                            !["juego1", "juego2", "juego3"].includes(p.leccion)
                        ).length === 0 && (
                          <p className="text-gray-600 text-sm">Sin progreso registrado.</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Aún no tienes progreso registrado.</p>
                )}
              </div>

              {/* Sección de Insignias */}
              <div className="bg-white rounded-lg p-4 border border-[#69FF37]/40 mt-6">
                <h2 className="text-xl font-semibold text-[#69FF37] mb-3">
                  Tus Insignias
                </h2>
                {progreso.length > 0 ? (
                  progreso
                    .filter((p) => p.leccion.includes("juego")) // Filtrar lecciones que contienen "juego"
                    .map((p, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-4">
                        {lessonBadges[p.leccion] ? (
                          <>
                            <Image
                              src={lessonBadges[p.leccion].image}
                              alt={`Insignia ${p.leccion}`}
                              width={100}
                              height={100}
                              className="object-contain"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {lessonBadges[p.leccion].text}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-medium text-gray-700">
                            Insignia no disponible para {p.leccion}
                          </span>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-600">
                    Aún no tienes insignias registradas.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <button
          className="w-full mt-6 bg-[#69FF37] hover:bg-green-400 text-white font-semibold py-2 rounded-xl transition duration-200"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
