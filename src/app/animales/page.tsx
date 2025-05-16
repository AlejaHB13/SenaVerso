"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const videos = [
  { src: "caballito.png", text: "caballo.mp4" },
  { src: "/cerdo.png", text: "/cerdo.mp4" },
  { src: "/burro.png", text: "/burro.mp4" },
  { src: "/conejo.png", text: "/conejo.mp4" },
  { src: "/gallina.png", text: "/gallina.mp4" },
  { src: "/gallo.png", text: "/gallo.mp4" },
  { src: "/gato.png", text: "/gato.mp4" },
  { src: "/mariposa.png", text: "/mariposa.mp4" },
  { src: "/oveja.png", text: "/oveja.mp4" },
  { src: "/pajaro.png", text: "/pajaro.mp4" },
  { src: "/perro.png", text: "/perro.mp4" },
  { src: "/vaquita.png", text: "/vaca.mp4" },
];

export default function VerAnimales() {
  const [completado, setCompletado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [progreso, setProgreso] = useState(1); // Estado para rastrear el progreso
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const siguienteVideo = () => {
    if (index < videos.length - 1) {
      setIndex(index + 1);
      setProgreso(progreso + 1); // Incrementa el progreso
    } else {
      setCompletado(true);
    }
  };

  const anteriorVideo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setProgreso(progreso - 1); // Decrementa el progreso
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({
        leccion: "Teoria 2",
        categoria: "animales",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompletado(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      window.location.href = "/granja";
    }, 500);
  };

  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

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
    

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-8 text-black bg-white">
        {/* Botón de volver */}
        {/* Botón de volver */}
        <button
          onClick={() => router.push("/granja")}
          className="self-end mb-4 px-4 py-2 transition-all "        >
          <Image
            src="/flecha.png"
            alt="Volver"
            width={70}
            height={70}
            className="object-contain"
          />
        </button>

        <div className="bg-[#a2845e] text-white font-semibold text-center rounded-lg p-4 shadow-lg text-lg md:text-2xl mb-6">
          Aprende animales con Mani en su granja
        </div>

        {/* Progreso */}
        <div className="text-lg font-semibold mb-4">
          Progreso: {progreso} / {videos.length}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Video principal */}
          <video
            src={videos[index].text}
            width={300}
            height={300}
            controls
            className="rounded-lg shadow-lg"
          />

          {/* Imagen animada */}
          <motion.img
            key={index}
            src={videos[index].src.replace(".mp4", ".png")} // Cambia el video a una imagen (asumiendo que las imágenes tienen el mismo nombre pero con extensión .png)
            alt="Imagen del animal"
            className="w-40 h-40 md:w-60 md:h-60 object-contain rounded-lg shadow-lg border-4 border-white" // Cambiado a object-contain
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Botones Anterior y Siguiente */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={anteriorVideo}
            className={`bg-gray-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md transition-all ${
              index === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            disabled={index === 0}
          >
            Anterior
          </button>

          <button
            onClick={siguienteVideo}
            className="bg-[#a2845e] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md  transition-all"
          >
            Siguiente
          </button>
        </div>

        {/* Botón Completado */}
        {completado && (
          <div className="mt-4">
            <button
              onClick={completarRegistro}
              className="bg-[#69FF37] text-black px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Completado
            </button>
          </div>
        )}

        {/* MODAL */}
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 text-center">
              <h2 className="text-xl font-bold text-green-600">¡Felicidades!</h2>
              <p className="mt-2 text-gray-700">Entraste al establo.</p>
              <img
                src="/entrar.png"
                alt="Llave encontrada"
                className="mx-auto my-4 w-full h-48 object-contain"
              />
              <p className="mt-2 text-gray-700">Descubre el resto de la granja</p>
              <button
                onClick={cerrarModalYRedirigir}
                className="mt-4 bg-[#69FF37] text-black px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

