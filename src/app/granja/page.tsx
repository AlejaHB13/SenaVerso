import Image from "next/image";
import Link from "next/link";

export default function Jardin() {
  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex">
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
  
            <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black">
  <div className="flex items-center justify-center mb-8">
    <div className="mr-8">
      <Image src="/mano3.png" alt="Pirata" width={280} height={280} />
    </div>
    <div className="bg-[#a2845e] text-white font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
    Exploremos la granja encantada
    </div>
  </div>

  <div className="flex gap-8 justify-center">
    <Link href="/actividad1" className="hover:scale-110 transition-transform">
      <Image src="/establo.png" alt="Actividad 1" width={120} height={120} />
    </Link>
    <Link href="/actividad2" className="hover:scale-110 transition-transform">
      <Image src="/establo.png" alt="Actividad 2" width={120} height={120} />
    </Link>
    <Link href="/actividad3" className="hover:scale-110 transition-transform">
      <Image src="/establo.png" alt="Actividad 3" width={120} height={120} />
    </Link>
  </div>
</div>

</div>

  
  );
}