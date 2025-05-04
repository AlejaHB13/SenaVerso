"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const images = [
  { src: "/a.png", text: "/28.png" },
  { src: "/b.png", text: "/27.png" },
  { src: "/c.png", text: "/26.png" },
  { src: "/d.png", text: "/25.png" }, 
  { src: "/e.png", text: "/24.png" },
  { src: "/f.png", text: "/23.png" },
  { src: "/g.png", text: "/22.png" },
  { src: "/h.png", text: "/21.png" },
  { src: "/i.png", text: "/20.png" },
  { src: "/j.png", text: "/19.png" },
  { src: "/k.png", text: "/18.png" },
  { src: "/l.png", text: "/17.png" },
  { src: "/m.png", text: "/16.png" },
  { src: "/n.png", text: "/15.png" },
  { src: "/ñ.png", text: "/14.png" },
  { src: "/o.png", text: "/13.png" },
  { src: "/p.png", text: "/12.png" },
  { src: "/q.png", text: "/11.png" },
  { src: "/r.png", text: "/10.png" },
  { src: "/s.png", text: "/9.png" },
  { src: "/t.png", text: "/8.png" },
  { src: "/u.png", text: "/7.png" },
  { src: "/v.png", text: "/6.png" },
  { src: "/w.png", text: "/5.png" },
  { src: "/x.png", text: "/4.png" },
  { src: "/y.png", text: "/3.png" },
  { src: "/z.png", text: "/2.png" }
];

export default function VerAbecedario() {
  const [completado, setCompletado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const siguienteImagen = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setCompletado(true);
    }
  };

  const anteriorImagen = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({ 
        leccion: "Teoria",
        categoria: "abecedario", // Incluye la categoría aquí // Incluye la categoría aquí
        completado: true // ¡clave!
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
        onClick={() => router.push("/isla")}
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
              <Image src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black bg-white">
        <div className="bg-yellow-400 text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl mb-6">
          Aprende el abecedario en LSC para llegar a la isla
        </div>

        <div className="flex items-center gap-8">
          <Image src={images[index].text} alt="Letra correspondiente" width={300} height={300} />
          <motion.img
            key={index}
            src={images[index].src}
            alt="Imagen del abecedario"
            className="w-80 h-80 object-cover rounded-lg shadow-lg border-4 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Botones Anterior y Siguiente */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={anteriorImagen}
            className={`bg-gray-500 text-black px-6 py-3 rounded-lg shadow-md transition-all ${
              index === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            disabled={index === 0}
          >
            Anterior
          </button>

          <button
            onClick={siguienteImagen}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all"
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
              <p className="mt-2 text-gray-700">Has llegado a la isla.</p>
              <img src="/llegada.png" alt="Llave encontrada" className="mx-auto my-4 w-100 h-80" />
              <p className="mt-2 text-gray-700">Ahora debemos encontrar la llave.</p>
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

