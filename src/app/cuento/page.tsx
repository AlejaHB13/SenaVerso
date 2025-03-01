"use client"
import { useState } from "react";
import Image from "next/image"; 

const cuentos = [
  {
    id: 1,
    title: "Patito feo",
    youtubeId: "jyRVSyzz6l8?si=Z8xjAsRol3hrsqlo",
    image: "/patocuento.jpg", 
  },
  {
    id: 2,
    title: "El pirata y el tesoro escondido",
    youtubeId: "dPTVEKrAW0M?si=JApRBrDFRQiz4K7T",
    image: "/piratacuento.jpg", 
  },
  {
    id: 3,
    title: "El zapatero y los duendes",
    youtubeId: "DS0uZ76HUCI?si=atNTChJY9mPgLJba",
    image: "/zapaterocuento.jpg", 
  },
  {
    id: 4,
    title: "Ricitos de oro y los tres osos",
    youtubeId: "Qf028XI_cEQ?si=KlTEaFBH2kPRdShF",
    image: "/ricitoscuento.jpg", 
  },
  {
    id: 5,
    title: "Hansel y Gretel",
    youtubeId: "HMtd6qULsGE?si=NaL0OQYPB9s4S5_j",
    image: "/hanzelcuento.jpeg", 
  },
  {
    id: 6,
    title: "Caperucita roja",
    youtubeId: "v0CWV_BSszQ?si=URcZPtuyh3iYhAn-",
    image: "/caperucita.jpeg", 
  },
];

const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];


export default function Cuentos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="flex">
              <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
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
    
    <div className="mflex-1 p-8 text-center font-bold text-2xl text-black mb-8">
        
      <h1 className="text-3xl font-bold text-[#69FF37] mb-8">Cuentos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {cuentos.map((cuento) => (
          <div
            key={cuento.id}
            className="bg-gray-100 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
            onClick={() => setSelectedVideo(cuento.youtubeId)}
          >
            <Image
              src={cuento.image} // ✅ Ahora usando el componente Image de Next.js
              alt={cuento.title}
              width={500}
              height={300}
              className="rounded-lg mb-3 w-full h-48 object-cover"
              priority
            />
            <h2 className="font-semibold text-gray-800 text-lg text-center">
              {cuento.title}
            </h2>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-4 w-full max-w-6xl relative">
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
    </div>
  );
}

