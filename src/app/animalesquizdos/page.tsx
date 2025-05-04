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
  { video: "/videos/w.mp4", options: ["/images/w.png", "/images/m.png", "/images/a.png"], answer: "/images/w.png" },
  { video: "/videos/c.mp4", options: ["/images/c.png", "/images/z.png", "/images/o.png"], answer: "/images/c.png" },
  { video: "/videos/m.mp4", options: ["/images/a.png", "/images/m.png", "/images/n.png"], answer: "/images/m.png" },
  { video: "/videos/p.mp4", options: ["/images/p.png", "/images/q.png", "/images/r.png"], answer: "/images/p.png" },
  { video: "/videos/t.mp4", options: ["/images/t.png", "/images/u.png", "/images/v.png"], answer: "/images/t.png" },
  { video: "/videos/g.mp4", options: ["/images/g.png", "/images/h.png", "/images/j.png"], answer: "/images/g.png" },
];

export default function Quiz() {
  const [shuffledQuiz, setShuffledQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const shuffled = [...allQuizData].sort(() => Math.random() - 0.5).slice(0, 3);
    setShuffledQuiz(shuffled);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion] === shuffledQuiz[currentQuestion].answer) {
      alert("¡Respuesta correcta!"); // Mostrar mensaje de respuesta correcta

      if (currentQuestion + 1 < shuffledQuiz.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completarRegistro();
      }
    } else {
      alert("Respuesta incorrecta. Intenta de nuevo."); // Mostrar mensaje de respuesta incorrecta
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({ 
        leccion: "Quiz 2",
        categoria: "colores"
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompleted(true);
    setMostrarModal(true);
    
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      window.location.href = "/juego1"; // Redirige a la isla
    }, 500);
  };

  const menuItems = [
    { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
    { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
    { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
    { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
  ];

  return (
     <div className="flex">
      <button
                    onClick={() => router.push("/jardin")}
                    className="absolute top-4 right-4  text-black px-2 py-2 rounded-lg  transition-all"
                  >
                   <Image
                src="/flecha.png" // Cambia esta ruta a la imagen que deseas usar
                alt="Volver"
                width={70}
                height={70}
                className="object-contain"
              />
                  </button>
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black bg-white">
      <div className="bg-[#17a7e8] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl mb-6">
        Resuelve estas preguntas para encontrar lmas flores 
      </div>
      {!completed && shuffledQuiz.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-2xl font-bold mb-4">
            ¿Qué imagen corresponde a este video?
          </h2>
          <video
            src={shuffledQuiz[currentQuestion].video}
            controls
            className="rounded-md mx-auto mb-4 w-full"
          />
          <div className="grid grid-cols-3 gap-4">
            {shuffledQuiz[currentQuestion].options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleSelect(option)}
                className={`p-2 border-2 rounded-lg ${
                  selectedAnswers[currentQuestion] === option ? "border-blue-500" : "border-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <img src={option} alt="Option" className="w-full h-20 object-contain" />
              </motion.button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-[#17a7e8] text-white rounded-lg shadow-md"
          >
            Siguiente
          </button>
        </div>
      )}
      {mostrarModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
        <h2 className="text-xl font-bold text-green-600">¡Lo lograste!</h2>
        <p className="mt-2 text-gray-700">Encontraste el tesoro con Mani</p>
        <img 
        src="/tesoro.png" 
        alt="Llave encontrada" 
        className="mx-auto my-4 w-80 h-80"
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
