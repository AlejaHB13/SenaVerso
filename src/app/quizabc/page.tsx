"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Question = {
  letter: string;
  options: string[];
  answer: string;
};

const allQuizData: Question[] = [
  { letter: "W", options: ["a.png", "m.png", "w.png"], answer: "w.png" },
  { letter: "C", options: ["c.png", "z.png", "o.png"], answer: "c.png" },
  { letter: "M", options: ["a.png", "m.png", "n.png"], answer: "m.png" },
  { letter: "P", options: ["p.png", "q.png", "r.png"], answer: "p.png" },
  { letter: "T", options: ["t.png", "u.png", "v.png"], answer: "t.png" },
  { letter: "G", options: ["g.png", "h.png", "j.png"], answer: "g.png" },
];

export default function Quiz() {
  const [shuffledQuiz, setShuffledQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ message: string; type: "success" | "error" } | null>(null);
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
      setModalContent({ message: "¡Respuesta correcta! Continúa con la siguiente pregunta.", type: "success" });
      setTimeout(() => {
        setModalContent(null);
        if (currentQuestion + 1 < shuffledQuiz.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          completarRegistro();
        }
      }, 1500);
    } else {
      setModalContent({ message: "Respuesta incorrecta. Intenta de nuevo.", type: "error" });
      setTimeout(() => {
        setModalContent(null);
      }, 1500);
    }
  };

  const completarRegistro = async () => {
    await fetch("/api/progreso", {
      method: "POST",
      body: JSON.stringify({
        leccion: "Quiz 1.1",
        categoria: "abecedario",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompleted(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      router.push("/isla");
    }, 500);
  };

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
      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black bg-white">
        {/* Botón de volver */}
        <button
          onClick={() => router.push("/isla")}
          className="self-end mb-4 px-4 py-2 transition-all "
        >
          <Image
            src="/flecha.png"
            alt="Volver"
            width={70}
            height={70}
            className="object-contain"
          />
        </button>
        <div className="bg-yellow-400 text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl mb-6">
          Resuelve estas preguntas para encontrar la llave del tesoro
        </div>

        {/* Modal dinámico */}
        {modalContent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center ${
                modalContent.type === "success" ? "border-green-500" : "border-red-500"
              }`}
            >
              <h2
                className={`text-xl font-bold ${
                  modalContent.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {modalContent.message}
              </h2>
            </div>
          </div>
        )}

        {!completed && shuffledQuiz.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Selecciona la imagen correcta para la letra "{shuffledQuiz[currentQuestion].letter}"
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {shuffledQuiz[currentQuestion].options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`p-2 border-2 rounded-lg ${
                    selectedAnswers[currentQuestion] === option ? "border-blue-500" : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image src={`/${option}`} alt={option} width={500} height={500} className="rounded-md" />
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Modal final */}
        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 text-center">
              <h2 className="text-xl font-bold text-green-600">¡Felicidades!</h2>
              <p className="mt-2 text-gray-700">Tenemos la llave, solo falta encontrar el tesoro</p>
              <img
                src="/llave.png"
                alt="Llave encontrada"
                className="mx-auto my-4 w-40 h-40 sm:w-60 sm:h-60"
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
