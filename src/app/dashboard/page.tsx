"use client";
import { useSession, signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function ProfilePage() { 
    const { data: session, status } = useSession(); 
    console.log(session, status); 
    const menuItems = [
        { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
        { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
        { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
        { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
      ];

    return(
          <div className="flex">
              {/* Sidebar */}
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
         
  <div className="flex-1 p-8 text-center font-bold text-2xl text-black mb-8">
    <h1 className="font-bold text-3xl text-center mb-6 text-[#69FF37]"> Perfil</h1>

    <div className="space-y-4">
      

      {session?.user && (
        <>

          <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-[#69FF37]/40">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-800 font-semibold">{session.user.email ?? 'No disponible'}</span>
          </div>
        </>
      )}
    </div>

    <button
      className="w-full mt-6 bg-[#69FF37] hover:bg-green-400 text-white font-semibold py-2 rounded-xl transition duration-200"
      onClick={() => signOut()}
    >
    Cerrar sesión
    </button>
  </div>
</div>

    );
}
    export default ProfilePage;