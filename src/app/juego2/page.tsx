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
  { id: "A", type: "letter", content: "/a-image.png" }, // Imagen para la letra A
  { id: "B", type: "letter", content: "/b-image.png" }, // Imagen para la letra B
  { id: "C", type: "letter", content: "/c-image.png" }, // Imagen para la letra C
  { id: "C-sign", type: "sign", content: "/c-video.mp4", pair: "C" }, // Video para la seña C
  { id: "A-sign", type: "sign", content: "/a-video.mp4", pair: "A" }, // Video para la seña A
  { id: "B-sign", type: "sign", content: "/b-video.mp4", pair: "B" }, // Video para la seña B
];

// Mapa de mensajes personalizados
const pairMessages: Record<string, { message: string; image: string }> = {
  A: { message: "¡Lograste llegar al cultivo!", image: "/.png" },
  B: { message: "¡Lograste sembrar las semillas!", image: "/.png" },
  C: { message: "¡Lograste tener todo el cultivo!", image: "/.png" },
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
  const [showMessage, setShowMessage] = useState(false);
  const [currentPairMessage, setCurrentPairMessage] = useState<{ message: string; image: string } | null>(null); // Estado para el mensaje actual
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
        setCurrentPairMessage(pairMessages[first.content]); // Establece el mensaje correspondiente
        setTimeout(() => setCurrentPairMessage(null), 1500); // Oculta el mensaje después de 1.5 segundos
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
        body: JSON.stringify({ leccion: "juego2", categoria: "animales" }),
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
    <div className="flex">
      <button
        onClick={() => router.push("/granja")}
        className="absolute top-4 right-4 text-black px-2 py-2 rounded-lg transition-all"
      >
        <Image
          src="/flecha.png"
          alt="Volver"
          width={70}
          height={70}
          className="object-contain"
        />
      </button>
      <aside className="w-48 h-screen bg-white border-r flex flex-col items-center py-10">
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

      <div className="flex flex-1 justify-between p-20">
        {/* Left Section: Text and Game */}
        <div className="flex flex-col items-center w-2/3">
          <h1 className="text-black font-bold">Ayuda a Mani cultivar en la granja</h1>
          <h3 className="text-black font-bold">Debes realizar las parejas respectivas con cada seña y animal</h3>
          <div className="grid grid-cols-3 gap-6 mt-8">
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

        {/* Right Section: Large Image */}
        <div className="flex items-center justify-center w-1/3">
          <Image
            src="/mano3.png"
            alt="Imagen grande"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-black">¡Felicidades!</h2>
            <p className="text-black">Logramos recolectar toda el cultivo.</p>
            <button
              className="mt-4 px-4 py-2 bg-[#facc17] text-white rounded"
              onClick={handleCloseMessage}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {currentPairMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center flex flex-col items-center">
            <Image src={currentPairMessage.image} alt="¡Acierto!" width={100} height={100} className="mb-4" />
            <h2 className="text-xl font-bold text-black">{currentPairMessage.message}</h2>
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
  const isSelected = flipped; // Determina si la tarjeta está seleccionada

  return (
    <div className="flex">
      <div
        className={`w-24 h-24 border-2 rounded-lg flex items-center justify-center cursor-pointer bg-[#a2845e] transition-all ${
          isSelected ? "border-[#69FF37] shadow-lg" : "border-gray-300"
        }`}
        onClick={onFlip}
      >
        {card.type === "letter" ? (
          <img src={card.content} alt="Imagen" className="w-16 h-16 object-contain" />
        ) : (
          <video
            src={card.content}
            className="w-16 h-16 object-contain"
            autoPlay
            loop
            muted
          />
        )}
      </div>
    </div>
  );
}
