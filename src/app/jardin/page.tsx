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
  
      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black">
        <div className="flex items-center justify-center w-full mb-8">
          {/* IZQUIERDA */}
          <div className="flex flex-col items-center mr-8 w-1/2">
            <Image src="/mano2.png" alt="Pirata" width={280} height={280} className="mb-4" />
            <div className="bg-[#17a7e8] text-white font-semibold text-center rounded-lg p-4 shadow-lg text-2xl">
              Empieza una nueva aventura para encontrar con Mani flores en el jardín mágico
            </div>
          </div>

          {/* DERECHA */}
          <div className="relative w-[600px] h-[400px] bg-cover bg-center border-4 border-[#17a7e8] shadow-lg rounded-lg overflow-hidden w-1/2"
            style={{ backgroundImage: "url('/jardinfondo.png')" }}
          >
            <Link href="/colores" className="absolute top-[80%] left-[50%] hover:scale-110 transition-transform">
              <Image src="/flor.png" alt="Actividad 1" width={70} height={70} />
            </Link>
            <Link href="/quizcolores" className="absolute top-[80%] left-[90%] hover:scale-110 transition-transform">
             <Image src="/flor.png" alt="Actividad 2" width={70} height={70} />
            </Link>
            <Link href="/quizcoloresdos" className="absolute bottom-[44%] right-[53%] hover:scale-110 transition-transform">
              <Image src="/flor.png" alt="Actividad 3" width={50} height={50} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}