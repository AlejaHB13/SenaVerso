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
    <div className="flex">
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
        <Image src="/logo.png" alt="Logo El Mundo de las Señas" width={120} height={120} />
        <h2 className="text-center font-semibold text-[#69FF37]">SeñaVerso</h2>
        <h3 className="text-center text-[#69FF37] text-xs mb-8">Explora el mundo en señas</h3>
        <nav className="w-full flex flex-col items-start px-6 space-y-8 mb-6">
          {menuItems.map((item) => (
            <a key={item.label} href={item.link} className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black">
              <Image src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-10 text-center font-bold text-2xl text-black mb-8">
        <h1 className="text-3xl font-bold text-[#69FF37] mb-8">Canciones</h1>

        {canciones.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-4">Cargando canciones...</p>
            
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-8">
            {/* Columna izquierda */}
            <div className="flex flex-col space-y-6">
              {canciones.slice(0, 2).map((cancion, index) => (
                <div
                  key={cancion._id || `cancion-izq-${index}`} // Usa _id o un índice como respaldo
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition w-64"
                  onClick={() => setSelectedVideo(cancion.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg text-center">{cancion.title}</h2>
                </div>
              ))}
            </div>

            {/* Imagen central */}
            <div>
              <Image
                src="/canciones.png" // Cambia esta ruta por la imagen que desees mostrar
                alt="Imagen central"
                width={300}
                height={300}
                className="object-cover "
              />
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col space-y-6">
              {canciones.slice(2, 4).map((cancion, index) => (
                <div
                  key={cancion._id || `cancion-der-${index}`} // Usa _id o un índice como respaldo
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition w-64"
                  onClick={() => setSelectedVideo(cancion.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg text-center">{cancion.title}</h2>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 w-full max-w-6xl relative">
              <button className="absolute top-2 right-2 text-red-500 font-bold text-2xl" onClick={() => setSelectedVideo(null)}>
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


