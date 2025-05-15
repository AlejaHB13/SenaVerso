"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Question = {
  image: string;
  options: string[];
  answer: string;
};

const allQuizData: Question[] = [
  { image: "amarillo.png", options: ["amarillo.mp4", "azul.mp4", "rojo.mp4"], answer: "amarillo.mp4" },
  { image: "azul.png", options: ["azul.mp4", "morado.mp4", "gris.mp4"], answer: "azul.mp4" },
  { image: "blanco.png", options: ["naranja.mp4", "verde.mp4", "blanco.mp4"], answer: "blanco.mp4" },
  { image: "cafe.png", options: ["negro.mp4", "cafe.mp4", "azul.mp4"], answer: "cafe.mp4" },
  { image: "morado.png", options: ["morado.mp4", "rojo.mp4", "cafe.mp4"], answer: "morado.mp4" },
];

export default function Quiz() {
  const [shuffledQuiz, setShuffledQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
        leccion: "Quiz 3.1",
        categoria: "colores",
      }),
      headers: { "Content-Type": "application/json" },
    });
    setCompleted(true);
    setMostrarModal(true);
  };

  const cerrarModalYRedirigir = () => {
    setMostrarModal(false);
    setTimeout(() => {
      router.push("/jardin");
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
      {/* Botón de menú móvil */}
      <button
        className="md:hidden p-4 bg-[#69FF37] text-white font-bold"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block absolute md:relative z-50 w-48 h-screen bg-white border-r flex flex-col items-center py-10`}
      >
        <Image
          src="/logo.png"
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

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 text-black bg-white">
        {/* Botón de volver */}
        <button
          onClick={() => router.push("/jardin")}
          className="self-start mb-4 bg-gray-200 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-all"
        >
          <Image
            src="/flecha.png"
            alt="Volver"
            width={30}
            height={30}
            className="object-contain"
          />
        </button>
        <div className="bg-[#17a7e8] text-black font-semibold text-center rounded-lg p-4 shadow-lg text-2xl mb-6">
          Encontremos más flores
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
              Selecciona el video correcto para el color:
            </h2>
            <div className="flex justify-center items-center mb-4">
              <Image
                src={`/${shuffledQuiz[currentQuestion].image}`}
                alt="Pregunta"
                width={300}
                height={300}
                className="mb-4"
              />
            </div>
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
                  <video
                    src={`/${option}`}
                    controls
                    className="rounded-md"
                    width={150}
                    height={150}
                  />
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 bg-[#17a7e8] text-white rounded-lg shadow-md hover:bg-blue-600"
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
              <p className="mt-2 text-gray-700">Recogiste la segunda flor.</p>
              <img
                src="/flor.png"
                alt="Llave encontrada"
                className="mx-auto my-4 w-40 h-40 sm:w-60 sm:h-60"
              />
              <p className="mt-2 text-gray-700">Ahora debemos recoger más</p>
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
