"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Jardin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [showRotateMessage, setShowRotateMessage] = useState(true);

  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 768); // Detecta si el ancho es menor a 768px
    };

    handleResize(); // Ejecuta al cargar la página
    window.addEventListener("resize", handleResize); // Escucha cambios de tamaño

    return () => window.removeEventListener("resize", handleResize); // Limpia el evento
  }, []);

  useEffect(() => {
    if (isPortrait) {
      const timer = setTimeout(() => {
        setShowRotateMessage(false); // Oculta el mensaje después de 5 segundos
      }, 5000);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    } else {
      setShowRotateMessage(true); // Muestra el mensaje si vuelve a modo vertical
    }
  }, [isPortrait]);

  return (
    <div className="flex">
      {/* Mostrar mensaje si está en modo vertical */}
      {isPortrait && showRotateMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <p className="text-lg font-bold mb-4">
              Por favor, gira tu dispositivo a modo horizontal para una mejor experiencia.
            </p>
          </div>
        </div>
      )}

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
                src="/hoja2.png"
                alt="hoja2"
                className="w-full h-auto rounded-lg"
              />

              {/* Contenedor de texto centrado */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] p-4 bg-white bg-opacity-0 text-center">
                <p className="text-black text-sm font-bold leading-tight">
                  Haz clic en los íconos de las flores para realizar cada actividad y en la palita encontrarás otra aventura.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menú desplegable */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#69FF37] text-black px-4 py-2 rounded-lg shadow-md"
        >
          Menú
        </button>
        {isMenuOpen && (
          <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg w-48">
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

      {/* Sidebar para pantallas grandes */}
      <aside className="hidden md:flex w-48 h-screen bg-white border-r flex-col items-center py-8">
        <Image
          src="/logo.png"
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
        <div className="flex flex-col md:flex-row items-center justify-center w-full mb-8">
          {/* IZQUIERDA */}
          <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-8 w-full md:w-1/2">
            <Image src="/mano2.png" alt="Pirata" width={280} height={280} className="mb-4" />
            <div className="bg-[#17a7e8] text-white font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
              Empieza una nueva aventura para encontrar con Mani flores en el jardín mágico
            </div>
          </div>

          {/* DERECHA */}
          <div
            className="relative w-full md:w-[600px] h-[400px] bg-cover bg-center border-4 border-[#17a7e8] shadow-lg rounded-lg overflow-hidden"
            style={{ backgroundImage: "url('/jardinfondo.png')" }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-3 left-3 bg-[#17a7e8] text-black font-bold rounded-lg hover:scale-110 transition-transform px-4 py-2"
            >
              ?
            </button>
            <Link href="/quizcolores" className="absolute bottom-[10%] right-[15%] hover:scale-110 transition-transform">
              <div className="p-4 rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
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
              <div className="p-4 rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/flor.png"
                  alt="Actividad 2"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/quizcoloresdos" className="absolute bottom-[10%] top-[75%] right-[0%] hover:scale-110 transition-transform">
              <div className="p-4 rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/flor.png"
                  alt="Actividad 3"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/juego3" className="absolute bottom-[10%] top-[32%] right-[62%] hover:scale-110 transition-transform">
              <div
                className="p-4 rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125"
                style={{ transform: "rotate(-60deg)" }}
              >
                <Image
                  src="/pala.png"
                  alt="juego 3"
                  width={70}
                  height={70}
                  className="object-contain"
                  style={{ transform: "rotate(360deg)" }}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}