"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const videos = [
  { src: "caballito.png", text: ".mp4" },
  { src: "/cerdo.png", text: "/cerdo.png" },
  { src: "/burro.png", text: "/burro.png" },
  { src: "/conejo.png", text: "/conejo.png" },
  { src: "/gallina.png", text: "/gallina.png" },
  { src: "/gallo.png", text: "/gallo.png" },
  { src: "/gato.png", text: "/gato.png" },
  { src: "/mariposa.png", text: "/mariposa.png" },
  { src: "/oveja.png", text: "/oveja.png" },
  { src: "/pajaro.png", text: "/pajaro.png" },
  { src: "/perro.png", text: "/perro.png" },
  { src: "/vaquita.png", text: "/vaquita.png" },
];

export default function VerAbecedario() {
  const [completado, setCompletado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [progreso, setProgreso] = useState(1); // Estado para rastrear el progreso
  const router = useRouter();

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
        leccion: "Teoria",
        categoria: "animales"
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompletado(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      window.location.href = "/isla";
    }, 500);
  };

  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex relative">
      {/* Botón Volver en la esquina superior derecha */}
      <button
              onClick={() => router.push("/granja")}
              className="absolute top-4 right-4  text-black px-2 py-2 rounded-lg  transition-all"
            >
             <Image
          src="/flecha.png" // Cambia esta ruta a la imagen que deseas usar
          alt="Volver"
          width={70}
          height={70}
          className="object-contain"
        />
            </button>

      {/* Sidebar */}
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
        <img
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
              <img src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black bg-white">
        <div className="bg-[#a2845e]  text-white font-semibold text-center rounded-lg p-4 shadow-lg text-2xl mb-6">
          Aprende animales con Mani en su granja 
        </div>

        {/* Progreso */}
        <div className="text-lg font-semibold mb-4">
          Progreso: {progreso} / {videos.length}
        </div>

        <div className="flex items-center gap-8">
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
            className="w-60 h-100 object-cover rounded-lg shadow-lg border-4 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Botones Anterior y Siguiente */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={anteriorVideo}
            className={`bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md transition-all ${
              index === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            disabled={index === 0}
          >
            Anterior
          </button>

          <button
            onClick={siguienteVideo}
            className="bg-[#a2845e]  text-white px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Siguiente
          </button>
        </div>

        {/* Botón Completado */}
        {completado && (
          <div className="mt-4">
            <button
              onClick={completarRegistro}
              className="bg-[#69FF37] text-black px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Completado
            </button>
          </div>
        )}

        {/* MODAL */}
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
              <h2 className="text-xl font-bold text-green-600">¡Felicidades!</h2>
              <p className="mt-2 text-gray-700">Recogiste la primera flor.</p>
              <img src="/" alt="Llave encontrada" className="mx-auto my-4 w-100 h-80" />
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

