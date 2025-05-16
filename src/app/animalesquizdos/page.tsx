"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Question = {
  video: string;
  options: string[];
  answer: string;
};

const allQuizData: Question[] = [
  { video: "/conejo.mp4", options: ["/conejo.png", "/gato.png", "/gallina.png"], answer: "/conejo.png" },
  { video: "/mariposa.mp4", options: ["/perro.png", "/cerdo.png", "/mariposa.png"], answer: "/mariposa.png" },
  { video: "/oveja.mp4", options: ["/gallo.png", "/oveja.png", "/conejo.png"], answer: "/oveja.png" },
  { video: "/pajaro.mp4", options: ["/pajaro.png", "/gallina.png", "/gato.png"], answer: "/pajaro.png" },
  { video: "/perro.mp4", options: ["/oveja.png", "/vaquita.png", "/perro.png"], answer: "/perro.png" },
];

export default function Quiz() {
  const [shuffledQuiz, setShuffledQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const shuffled = [...allQuizData].sort(() => Math.random() - 0.5).slice(0, 3);
    setShuffledQuiz(shuffled);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === shuffledQuiz[currentQuestion].answer) {
      alert("¡Respuesta correcta!");

      if (currentQuestion + 1 < shuffledQuiz.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completarRegistro();
      }
    } else {
      alert("Respuesta incorrecta. Intenta de nuevo.");
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({
        leccion: "Quiz 2.2",
        categoria: "animales",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompleted(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      window.location.href = "/granja";
    }, 500);
  };

  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
    <div className="flex flex-col md:flex-row relative">
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
     

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-8 text-black bg-white">
             {/* Botón de volver */}
             <button
               onClick={() => router.push("/granja")}
               className="self-end mb-4 px-4 py-2 transition-all "             >
               <Image
                 src="/flecha.png"
                 alt="Volver"
                 width={70}
                 height={70}
                 className="object-contain"
               />
             </button>

        <div className="bg-[#a2845e] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-lg md:text-2xl mb-6">
          Resuelve estas preguntas para ver más animales
        </div>

        {!completed && shuffledQuiz.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full md:w-3/4 lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              ¿Qué imagen corresponde a este video?
            </h2>
            <video
              src={shuffledQuiz[currentQuestion].video}
              controls
              className="rounded-md mx-auto mb-4 w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shuffledQuiz[currentQuestion].options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`p-2 border-2 rounded-lg ${
                    selectedAnswers[currentQuestion] === option ? "border-blue-500" : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={option}
                    alt="Option"
                    className="w-full h-32 object-contain"
                  />
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 bg-[#a2845e] text-white rounded-lg shadow-md"
            >
              Siguiente
            </button>
          </div>
        )}

        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 text-center">
              <h2 className="text-xl font-bold text-green-600">¡Lo lograste!</h2>
              <p className="mt-2 text-gray-700">Encontraste todos los animales de la granja de Mani</p>
              <img
                src="/animales.png"
                alt="Llave encontrada"
                className="mx-auto my-4 w-full h-48 object-contain"
              />
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
