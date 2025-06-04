"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { create } from "zustand";
import Image from "next/image";

interface Card {
  id: string;
  type: "letter" | "sign";
  content: string;
  pair?: string;
}

interface GameState {
  matchedPairs: string[];
  addMatch: (pair: string) => void;
  resetGame: () => void;
}

const letters: Card[] = [
  { id: "A", type: "letter", content: "/caballito.png" },
  { id: "B", type: "letter", content: "/vaquita.png" },
  { id: "C", type: "letter", content: "/gato.png" },
  { id: "C-sign", type: "sign", content: "/gato.mp4", pair: "C" },
  { id: "A-sign", type: "sign", content: "/caballo.mp4", pair: "A" },
  { id: "B-sign", type: "sign", content: "/vaca.mp4", pair: "B" },
];

const pairMessages: Record<string, { message: string; image: string }> = {
  A: { message: "¡Lograste llegar al cultivo!", image: "/cultivo.png" },
  B: { message: "¡Lograste sembrar las semillas!", image: "/semillas.png" },
  C: { message: "¡Lograste tener todo el cultivo!", image: "/cosecha.png" },
};

const useGameStore = create<GameState>((set) => ({
  matchedPairs: [],
  addMatch: (pair: string) => set((state) => ({ matchedPairs: [...state.matchedPairs, pair] })),
  resetGame: () => set({ matchedPairs: [] }),
}));

const menuItems = [
  { label: "LECCIONES", icon: "/lecciones.png", link: "/lecciones" },
  { label: "CANCIONES", icon: "/musica.png", link: "/canciones" },
  { label: "CUENTOS", icon: "/cuento.png", link: "/cuento" },
  { label: "PERFIL", icon: "/perfil.png", link: "/dashboard" },
];

export default function MemoryGame() {
  const [flipped, setFlipped] = useState<Card[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [currentPairMessage, setCurrentPairMessage] = useState<{ message: string; image: string } | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const matchedPairs = useGameStore((state) => state.matchedPairs);
  const addMatch = useGameStore((state) => state.addMatch);
  const resetGame = useGameStore((state) => state.resetGame);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;

      if (
        (first.type === "letter" && second.pair === first.id) ||
        (second.type === "letter" && first.pair === second.id)
      ) {
        addMatch(first.id);
        setCurrentPairMessage(pairMessages[first.id]);
        setTimeout(() => setCurrentPairMessage(null), 1500);
      }

      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  }, [flipped, addMatch]);

  useEffect(() => {
    if (matchedPairs.length === letters.filter((c) => c.type === "letter").length) {
      setGameCompleted(true);
      setTimeout(() => {
        fetch("/api/progreso", {
          method: "POST",
          body: JSON.stringify({ leccion: "juego2", categoria: "animales" }),
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          router.push("/lecciones");
        });
      }, 2000);
    }
  }, [matchedPairs, router]);

  const handleFlip = (card: Card) => {
    if (
      flipped.length < 2 &&
      !flipped.some((c) => c.id === card.id) &&
      !matchedPairs.includes(card.pair ?? card.id) &&
      !disabled
    ) {
      setFlipped((prev) => [...prev, card]);
    }
  };

  const handleCloseMessage = () => {
    resetGame();
    router.push("/granja");
  };

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

           {/* Botón de volver */}
           <button
             onClick={() => router.push("/granja")}
             className="self-start mb-4 px-4 py-2 transition-all "           >
             <Image
               src="/flecha.png"
               alt="Volver"
               width={70}
               height={70}
               className="object-contain"
             />
           </button>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row flex-1 p-4 md:p-10">
        {/* Sección izquierda: Juego */}
        <div className="flex flex-col items-center w-full md:w-2/3">
          <h1 className="text-black font-bold text-center">
            Ayuda a Mani cultivar en la granja
          </h1>
          <h3 className="text-black font-bold text-center">
            Debes realizar las parejas respectivas con cada seña y animal
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
            {letters.map((card) => (
              <MemoryCard
                key={card.id}
                card={card}
                flipped={
                  flipped.includes(card) ||
                  matchedPairs.includes(card.pair ?? card.id)
                }
                onFlip={() => handleFlip(card)}
              />
            ))}
          </div>
        </div>

        {/* Sección derecha: Imagen grande */}
        <div className="flex items-center justify-center w-full md:w-1/3 mt-8 md:mt-0">
          <Image
            src="/mano3.png"
            alt="Imagen grande"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      {/* Modal de pareja encontrada */}
      {currentPairMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center w-11/12 md:w-1/3">
            <Image src={currentPairMessage.image} alt="¡Acierto!" width={100} height={100} className="mb-4" />
            <h2 className="text-xl font-bold text-black">{currentPairMessage.message}</h2>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {gameCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 md:w-1/2">
            <h2 className="text-2xl font-bold text-black">¡Felicidades! Completaste el juego.</h2>
          </div>
        </div>
      )}
    </div>
  );
}

interface MemoryCardProps {
  card: Card;
  flipped: boolean;
  onFlip: () => void;
}

function MemoryCard({ card, flipped, onFlip }: MemoryCardProps) {
  const isSelected = flipped;

  return (
    <motion.div
      className={`w-150 h-150 border-4 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
        isSelected ? "border-[#69FF37] shadow-lg" : "border-gray-300"
      }`}
      onClick={onFlip}
    >
      {card.type === "letter" ? (
        <img src={card.content} alt="Imagen" className="w-150 h-150 object-contain" />
      ) : (
        <video
          src={card.content}
          className="w-150 h-150 object-contain"
          autoPlay
          loop
          muted
        />
      )}
    </motion.div>
  );
}
