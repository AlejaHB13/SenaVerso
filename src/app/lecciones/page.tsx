// pages/index.js
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const places = [
    {
      title: "Isla ABC",
      description:
        "Recorre la isla con Mani, aprendiendo el abecedario en LSC.",
      image: "/isla.png",
      link: "/isla",
    },
    {
      title: "Granja encantada",
      description:
        "Ten una aventura con Mani, aprendiendo animales en LSC.",
      image: "/granja.png",
      link: "/granja",
    },
    {
      title: "Jardín mágico",
      description:
        "Recolecta flores con Mani y aprende colores en LSC.",
      image: "/jardin.png",
      link: "/jardin",
    },
  ];
  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex flex-col md:flex-row">
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

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <h2 className="text-center font-bold text-2xl text-black mb-8">
          Lugares que puedes conocer con Mani:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Link
              href={place.link}
              key={place.title}
              className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">
                  {place.title}
                </h3>
                {place.image && (
                  <Image
                    src={place.image}
                    alt={place.title}
                    width={200}
                    height={200}
                    className="rounded-lg mb-3 w-full h-48 object-cover"
                    priority
                  />
                )}
                <p className="text-sm text-black">{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

