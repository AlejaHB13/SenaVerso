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
  { id: "A", type: "letter", content: "A" },
  { id: "B", type: "letter", content: "B" },
  { id: "C", type: "letter", content: "C" },
  { id: "D", type: "letter", content: "D" },
  { id: "E", type: "letter", content: "E" },
  { id: "F", type: "letter", content: "F" },
  { id: "A-sign", type: "sign", content: "/a.png", pair: "A" },
  { id: "B-sign", type: "sign", content: "/b.png", pair: "B" },
  { id: "C-sign", type: "sign", content: "/c.png", pair: "C" },
  { id: "D-sign", type: "sign", content: "/d.png", pair: "D" },
  { id: "E-sign", type: "sign", content: "/e.png", pair: "E" },
  { id: "F-sign", type: "sign", content: "/f.png", pair: "F" }
];

const useGameStore = create<GameState>((set) => ({
  matchedPairs: [],
  addMatch: (pair: string) => set((state) => ({ matchedPairs: [...state.matchedPairs, pair] })),
  resetGame: () => set({ matchedPairs: [] })
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
  const [showMessage, setShowMessage] = useState(false);
  const [showPairMessage, setShowPairMessage] = useState(false);
  const matchedPairs = useGameStore((state) => state.matchedPairs);
  const addMatch = useGameStore((state) => state.addMatch);
  const resetGame = useGameStore((state) => state.resetGame);
  const router = useRouter();

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;

      if (
        (first.type === "letter" && second.pair === first.content) ||
        (second.type === "letter" && first.pair === second.content)
      ) {
        addMatch(first.content);
        setShowPairMessage(true);
        setTimeout(() => setShowPairMessage(false), 1500);
      }

      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  }, [flipped, addMatch]);

  useEffect(() => {
    if (matchedPairs.length === letters.filter((c) => c.type === "letter").length) {
      fetch("/api/progreso", {
        method: "POST",
        body: JSON.stringify({ leccion: "juego1", categoria: "abecedario" }),
        headers: { "Content-Type": "application/json" },
      });
      setShowMessage(true);
    }
  }, [matchedPairs]);

  const handleFlip = (card: Card) => {
    if (
      flipped.length < 2 &&
      !flipped.some((c) => c.id === card.id) &&
      !matchedPairs.includes(card.pair ?? card.content) &&
      !disabled
    ) {
      setFlipped((prev) => [...prev, card]);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    resetGame();
    router.push("/lecciones");
  };

  return (
    <div className="flex flex-col md:flex-row">


      {/* Sidebar */}
      <aside className="hidden md:block w-48 h-screen bg-white border-r flex flex-col items-center py-10">
        <Image src="/logo.png" alt="Logo El Mundo de las Señas" width={120} height={120} />
        <h2 className="text-center font-semibold text-[#69FF37]">SeñaVerso</h2>
        <h3 className="text-center text-[#69FF37] text-xs mb-8">Explora el mundo en señas</h3>
        <nav className="w-full flex flex-col items-start px-6 space-y-8 mb-6">
          {menuItems.map((item) => (
            <a key={item.label} href={item.link} className="flex items-center space-x-2 text-[#69FF37] font-medium text-sm hover:text-black">
              <Image src={item.icon} alt={item.label} width={50} height={50} className="object-contain" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row flex-1 p-4 md:p-10">
          {/* Botón de volver */}
                      <button
                        onClick={() => router.push("/isla")}
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
        {/* Sección izquierda: Juego */}
        <div className="flex flex-col items-center w-full md:w-2/3">
          <h1 className="text-black font-bold text-center">
            Ayuda a Mani a encontrar diamantes de la isla
          </h1>
          <h3 className="text-black font-bold text-center">
            Debes realizar las parejas respectivas con cada seña y letra
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {letters.map((card) => (
              <MemoryCard
                key={card.id}
                card={card}
                flipped={
                  flipped.includes(card) ||
                  matchedPairs.includes(card.pair ?? card.content)
                }
                onFlip={() => handleFlip(card)}
              />
            ))}
          </div>
        </div>

        {/* Sección derecha: Imagen grande */}
        <div className="flex items-center justify-center w-full md:w-1/3 mt-8 md:mt-0">
          <Image
            src="/piratamani.png"
            alt="Imagen grande"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      {/* Modal de éxito */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center w-11/12 md:w-1/2">
            <Image src="/diamantes.png" alt="¡Felicidades!" width={100} height={100} className="mb-4" />
            <h2 className="text-2xl font-bold text-black">¡Felicidades!</h2>
            <p className="text-black">Logramos encontrar todos los diamantes. Completaste la misión</p>
            <button
              className="mt-4 px-4 py-2 bg-[#facc17] text-white rounded"
              onClick={handleCloseMessage}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de pareja encontrada */}
      {showPairMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center w-11/12 md:w-1/3">
            <Image src="/diamante.png" alt="¡Acierto!" width={100} height={100} className="mb-4" />
            <h2 className="text-xl font-bold text-black">¡Encontraste un diamante!</h2>
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
  return (
    <motion.div
      className="w-24 h-24 border-2 rounded-lg flex items-center justify-center cursor-pointer bg-yellow-400"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={onFlip}
    >
      {flipped ? (
        card.type === "letter" ? (
          <span className="text-xl font-bold">{card.content}</span>
        ) : (
          <img src={card.content} alt="Seña" className="w-16" />
        )
      ) : (
        <span className="text-black">?</span>
      )}
    </motion.div>
  );
}
