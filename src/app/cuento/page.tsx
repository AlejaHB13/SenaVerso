"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const menuItems = [
  { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
  { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
  { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
  { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
];

export default function Cuentos() {
  const [cuentos, setCuentos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCuentos() {
      try {
        const response = await fetch("/api/cuentos");
        if (!response.ok) throw new Error("Error al obtener cuentos");
        const data = await response.json();
        setCuentos(data);
      } catch (error) {
        console.error("Error cargando cuentos:", error);
      }
    }

    fetchCuentos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row relative">
      {/* Menú desplegable */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-center mt-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#69FF37] text-black px-4 py-2 rounded-lg shadow-md"
            >
              Menú
            </button>
            {isMenuOpen && (
              <div className="absolute top-16 left-0 bg-white border rounded-lg shadow-lg w-48">
              <nav className="flex flex-col items-start p-4 space-y-4">
                {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black"
                >
                  <Image
                  src={item.icon}
                  alt={item.label}
                  width={30}
                  height={30}
                  className="object-contain"
                  />
                  <span>{item.label}</span>
                </a>
                ))}
              </nav>
              </div>
            )}
            </div>
      
            {/* Espaciado para evitar contenido encima del botón */}
            <div className="md:hidden h-20"></div>
      
            {/* Sidebar para pantallas grandes */}
            <aside className="hidden md:flex w-48 h-screen bg-white border-r flex-col items-center py-8">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="mb-10" />
            <nav className="w-full flex flex-col items-start px-4 space-y-8">
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
        <h1 className="text-3xl font-bold text-[#69FF37] mb-8">Cuentos</h1>

        {cuentos.length === 0 ? (
          <p className="text-gray-500">Cargando cuentos...</p>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
            {/* Lista de cuentos (izquierda) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 text-center">
              {cuentos.slice(0, Math.ceil(cuentos.length / 2)).map((cuento, index) => (
                <div
                  key={cuento._id || `cuento-izq-${index}`}
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
                  onClick={() => setSelectedVideo(cuento.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg">{cuento.title}</h2>
                </div>
              ))}
            </div>

            {/* Imagen centrada */}
            <div className="mb-10 lg:mb-0">
              <Image
                src="/cuento2.png"
                alt="Pirata"
                width={450}
                height={450}
                className="mx-auto"
              />
            </div>

            {/* Lista de cuentos (derecha) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 text-center">
              {cuentos.slice(Math.ceil(cuentos.length / 2)).map((cuento, index) => (
                <div
                  key={cuento._id || `cuento-der-${index}`}
                  className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
                  onClick={() => setSelectedVideo(cuento.youtubeId)}
                >
                  <h2 className="font-semibold text-gray-800 text-lg">{cuento.title}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal para mostrar el video cuando se selecciona un cuento */}
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
                title="Video de cuento"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


