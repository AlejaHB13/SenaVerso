"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const menuItems = [
  { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
  { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
  { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
  { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
];

export default function Canciones() {
  const [canciones, setCanciones] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCanciones() {
      try {
        const response = await fetch("/api/canciones");
        if (!response.ok) throw new Error("Error al obtener canciones");
        const data = await response.json();
        setCanciones(data);
      } catch (error) {
        console.error("Error cargando canciones:", error);
      }
    }

    fetchCanciones();
  }, []);

  return (
    <div className="flex flex-col md:flex-row relative">
      {/* Botón de menú móvil */}
      <button
        className="md:hidden p-4 bg-[#69FF37] text-white font-bold"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block absolute md:relative z-50 w-48 h-screen bg-white border-r flex flex-col items-center py-10`}
      >
        <Image src="/logo.png" alt="Logo El Mundo de las Señas" width={120} height={120} />
        <h2 className="text-center font-semibold text-[#69FF37]">SeñaVerso</h2>
        <h3 className="text-center text-[#69FF37] text-xs mb-8">Explora el mundo en señas</h3>
        <nav className="w-full flex flex-col items-start px-6 space-y-8 mb-6">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black"
            >
              <Image src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 p-4 md:p-10 text-center">
        <h1 className="text-3xl font-bold text-[#69FF37] mb-8">Canciones</h1>

        {canciones.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-4">Cargando canciones...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Canciones a la izquierda */}
            <div className="flex flex-col gap-6">
              {canciones.slice(0, 2).map((cancion, index) => (
                <div
                  key={cancion._id || `cancion-izq-${index}`}
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
                  onClick={() => setSelectedVideo(cancion.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg text-center">{cancion.title}</h2>
                </div>
              ))}
            </div>

            {/* Imagen en el centro */}
            <div>
              <Image
                src="/canciones.png"
                alt="Imagen general de canciones"
                width={300}
                height={300}
                className="mx-auto rounded-lg"
              />
            </div>

            {/* Canciones a la derecha */}
            <div className="flex flex-col gap-6">
              {canciones.slice(2, 4).map((cancion, index) => (
                <div
                  key={cancion._id || `cancion-der-${index}`}
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
                  onClick={() => setSelectedVideo(cancion.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg text-center">{cancion.title}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal para video */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 w-11/12 md:w-3/4 lg:w-1/2 relative">
              <button
                className="absolute top-2 right-2 text-red-500 font-bold text-2xl"
                onClick={() => setSelectedVideo(null)}
              >
                ✖️
              </button>
              <div className="aspect-w-16 aspect-h-9 w-full h-[70vh]">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title="Video de canción"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


