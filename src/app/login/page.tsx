"use client"

import { FormEvent, useState } from 'react';
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import Navbar from '@/components/Navbar';

function LoginPage() { 

    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

            const res = await signIn('credentials',{
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });

            if(res?.error) return setError(res.error as string);

            if(res?.ok) return router.push("/lecciones");
           console.log(res)
    }
    return ( 
      <div>
        <Navbar />
        <div className="flex items-center justify-center bg-white">
        
        {/* Contenedor principal */}
        <div className="flex items-center space-x-10">

         {/* Sección del logo */}
    <div className="flex flex-col items-center">
      <img src="/logo.png" alt="El Mundo de las Señas" className="w-120" />
      <h2 className="text-center  font-semibold text-[#69FF37]">
                 SeñaVerso </h2>
               <h3 className="text-center text-[#69FF37] text-xs  mb-8">
                 Explora el mundo en señas
               </h3>
    </div>
          {/* Sección del formulario */}
          <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-center text-black font-semibold mb-4">Inicia la aventura</h2>      
    <form onSubmit={handleSubmit}> 
    {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
    <label className="block text-sm font-medium text-gray-700">Correo</label>
    <input type="email" placeholder="ejemplo@mail.com" name="email" className="border border-gray-300 px-4 py-2 w-full mb-4 rounded text-black"/>
    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
    <input type="password" placeholder="*******" name="password" className="border border-gray-300 px-4 py-2 w-full mb-4 rounded text-black"/>
    <button 
                className="px-4 py-2 w-full rounded text-black" 
                style={{ backgroundColor: "#69FF37" }}
              >
                Iniciar sesión
              </button>
    </form> 
    </div> 
        </div>
      </div>
      </div>
)
}

export default LoginPage;