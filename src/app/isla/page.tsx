"use client"
import Image from "next/image";
import Link from "next/link";
import { useState} from "react";



export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];



  return (
    <div className="flex">

      <div className="relative">

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

              <div className="relative w-full max-w-lg mx-auto">
                {/* Imagen de fondo */}
                <img
                  src="/instrucciones.png" // Asegúrate de que la URL sea correcta
                  alt="Pergamino"
                  className="w-full h-auto rounded-lg"
                />

                {/* Contenedor de texto centrado */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] p-4 bg-white bg-opacity-0 text-center">
                  <p className="text-black text-lg font-bold leading-tight">
                   
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      {/* Sidebar */}
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-8">
        <Image src="/logo.png" alt="Logo" width={120} height={120} className="mb-10" />
        <nav className="w-full flex flex-col items-start px-4 space-y-8">
          {menuItems.map((item) => (
            <a key={item.label} href={item.link} className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black">
              <Image src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
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
            <Image src="/piratamani.png" alt="Pirata" width={280} height={280} className="mb-4" />
            <div className="bg-[#facc17] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
              Empieza una nueva aventura para encontrar con Mani el tesoro en la isla del ABC
            </div>
          </div>

          {/* DERECHA */}


          <div className="relative w-[600px] h-[400px] bg-cover bg-center border-4 border-yellow-500 shadow-lg rounded-lg overflow-hidden w-1/2"
            style={{ backgroundImage: "url('/mapa.png')" }} >
            <button
              onClick={() => setIsOpen(true)}
              className="absolute bottom-3 right-3 
             bg-[#facc17] text-black font-bold rounded-lg 
             hover:scale-110 transition-transform px-4 py-2"
            >
              ?
            </button>

            <Link
              href="/abecedario"
              className="absolute top-[70%] left-[25%] hover:scale-110 transition-transform"
            >
              <Image
                src="/moneda.png"
                alt="Actividad 1"
                width={50}
                height={50}
                className="object-contain drop-shadow-lg  rounded-full hover:animate-pulse"
              />
            </Link>
            <Link
              href="/quizabc"
              className="absolute top-[40%] left-[18%] hover:scale-110 transition-transform"
            >
              <Image
                src="/moneda.png"
                alt="Actividad 2"
                width={50}
                height={50}
                className="object-contain drop-shadow-lg  rounded-full hover:animate-pulse"
              />
            </Link>
            <Link
              href="/quizabcdos"
              className="absolute bottom-[55%] right-[25%] hover:scale-110 transition-transform"
            >
              <Image
                src="/moneda.png"
                alt="Actividad 3"
                width={50}
                height={50}
                className="object-contain drop-shadow-lg   rounded-full hover:animate-pulse"
              />
            </Link>
            <Link
              href="/juego1"
              className="absolute bottom-[70%] right-[30%] hover:scale-110 transition-transform"
            >
              <Image
                src="/volcan.png"
                alt="juego 1"
                width={100}
                height={100}
                className="object-contain drop-shadow-lg  rounded-full hover:animate-pulse"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}