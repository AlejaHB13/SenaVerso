"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Jardin() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 relative">
            {/* Botón para cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              ×
            </button>

            <div className="relative w-[90%] max-w-lg mx-auto">
              {/* Imagen de fondo */}
              <img
                src="/hoja2.png" // Asegúrate de que la URL sea correcta
                alt="hoja2"
                className="w-full h-auto rounded-lg"
              />

              {/* Contenedor de texto centrado */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] p-4 bg-white bg-opacity-0 text-center">
                <p className="text-black text-sm font-bold leading-tight">
                  Haz clic en los íconos de las flores para realizar cada actividad y en la palita encontraras otra aventura.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-8">
        <Image
          src="/logo.png" // Asegúrate de tener esta imagen en public/images/
          alt="Logo El Mundo de las Señas"
          width={120}
          height={120}
          className="mb-10"
        />
        <nav className="w-full flex flex-col items-start px-4 space-y-8">
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

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black">
        <div className="flex items-center justify-center w-full mb-8">
          {/* IZQUIERDA */}
          <div className="flex flex-col items-center mr-8 w-1/2">
            <Image src="/mano2.png" alt="Pirata" width={280} height={280} className="mb-4" />
            <div className="bg-[#17a7e8] text-white font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
              Empieza una nueva aventura para encontrar con Mani flores en el jardín mágico
            </div>
          </div>

          {/* DERECHA */}
          <div className="relative w-[600px] h-[400px] bg-cover bg-center border-4 border-[#17a7e8] shadow-lg rounded-lg overflow-hidden w-1/2"
            style={{ backgroundImage: "url('/jardinfondo.png')" }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-3 left-3 
             bg-[#17a7e8] text-black font-bold rounded-lg 
             hover:scale-110 transition-transform px-4 py-2"
            >
              ?
            </button>
            <Link href="/quizcolores" className="absolute bottom-[10%] right-[15%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/flor.png"
                  alt="Actividad 1"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/colores" className="absolute bottom-[10%] top-[75%] right-[40%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/flor.png"
                  alt="Actividad 1"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/quizcoloresdos" className="absolute bottom-[10%] top-[75%] right-[0%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/flor.png"
                  alt="Actividad 1"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/juego3" className="absolute bottom-[10%] top-[32%] right-[62%] hover:scale-110 transition-transform">
              <div
              className="p-4 rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125"
              style={{ transform: "rotate(-60deg)" }} // Rotar la imagen en diagonal
              >
              <Image
                src="/pala.png"
                alt="juego 3"
                width={70}
                height={70}
                className="object-contain"
                style={{ transform: "rotate(360deg)" }} // Revertir la rotación del contenedor
              />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}