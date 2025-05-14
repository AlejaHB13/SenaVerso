"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const videos = [
  { src: "/amarillo.png", text: "/amarillo.mp4" },
  { src: "/azul.png", text: "/azul.mp4" },
  { src: "/blanco.png", text: "/blanco.mp4" },
  { src: "/cafe.png", text: "/cafe.mp4" },
  { src: "/gris.png", text: "/gris.mp4" },
  { src: "/morado.png", text: "/morado.mp4" },
  { src: "/naranja.png", text: "/naranja.mp4" },
  { src: "/rojo.png", text: "/rojo.mp4" },
  { src: "/negro.png", text: "/negro.mp4" },
  { src: "/verde.png", text: "/verde.mp4" },
];

export default function VerColores() {
  const [completado, setCompletado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [progreso, setProgreso] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const siguienteVideo = () => {
    if (index < videos.length - 1) {
      setIndex(index + 1);
      setProgreso(progreso + 1);
    } else {
      setCompletado(true);
    }
  };

  const anteriorVideo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setProgreso(progreso - 1);
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({
        leccion: "Teoria 3",
        categoria: "colores",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompletado(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      window.location.href = "/jardin";
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
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-8 text-black bg-white">
          {/* Botón de volver */}
                      <button
                        onClick={() => router.push("/jardin")}
                        className="self-start mb-4 bg-gray-200 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                      >
                        <Image
                          src="/flecha.png"
                          alt="Volver"
                          width={30}
                          height={30}
                          className="object-contain"
                        />
                      </button>

        <div className="bg-[#17a7e8] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-lg md:text-2xl mb-6">
          Aprende los colores para recolectar una flor que necesita Mani
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
            src={videos[index].src.replace(".mp4", ".png")}
            alt="Imagen del color"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-lg shadow-lg border-4 border-white"
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
            className="bg-[#17a7e8] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-blue-500 transition-all"
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
              <p className="mt-2 text-gray-700">Recogiste la primera flor.</p>
              <Image
                src="/flor.png"
                alt="Llave encontrada"
                width={200}
                height={200}
                className="mx-auto my-4"
              />
              <p className="mt-2 text-gray-700">Ahora debemos recoger más</p>
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

