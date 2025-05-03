import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex">
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
            <Image src="/mano3.png" alt="Pirata" width={280} height={280} className="mb-4" />
            <div className="bg-[#a2845e] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
            Acompaña a Mani en sus divertidas aventuras mientras cuida la granja
            </div>
          </div>

          {/* DERECHA */}
          <div className="relative w-[600px] h-[600px] bg-cover bg-center border-4 border-[#a2845e] shadow-lg rounded-lg overflow-hidden w-1/2"
            style={{ backgroundImage: "url('/fondogranja.png')" }}
          >
            <Link href="/" className="absolute top-[30%] left-[50%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/vaca.png"
                  alt="Actividad 1"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/animales" className="absolute top-[32%] left-[6%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/caballo.png"
                  alt="Actividad 2"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link href="/" className="absolute bottom-[10%] right-[6%] hover:scale-110 transition-transform">
              <div className="p-4  rounded-full drop-shadow-lg hover:animate-pulse hover:brightness-125">
                <Image
                  src="/cerdito.png"
                  alt="Actividad 3"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
