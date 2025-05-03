// pages/index.js
import Image from "next/image";
import Link from "next/link";


export default function Home() {
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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
               <Image
                 src="/logo.png"
                 alt="Logo El Mundo de las Señas"
                 width={100}
                 height={100}
               />
               <h2 className="text-center  font-semibold text-[#69FF37]">
                 SeñaVerso
               </h2>
               <h3 className="text-center text-[#69FF37] text-xs  mb-8">
                 Explora el mundo en señas
               </h3>
      
               <nav className="w-full flex flex-col items-start px-6 space-y-8 mb-6">
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
      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-center font-bold text-2xl text-black mb-8">
          Lugares que puedes conocer con Mani:
        </h2>
        <div className="flex justify-center space-x-6 flex-wrap">
          {places.map((place) => (
            <Link href={place.link} key={place.title} className="bg-white rounded-2xl shadow-md p-4 w-64 text-center hover:shadow-lg transition-transform transform hover:scale-105">
             
              <div>
            
                <h3 className="font-bold text-lg mb-2 text-black">{place.title}</h3>
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

