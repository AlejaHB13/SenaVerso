import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white text-black p-6">
        <div className="flex flex-col sm:flex-row items-center justify-center text-left space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Imagen a la izquierda */}
          <Image
            src="/mano.png"
            alt="Mano"
            width={300}
            height={300}
            className="sm:mr-6 mb-4 sm:mb-0 w-48 sm:w-64"
          />

          {/* Texto a la derecha */}
          <div className="max-w-lg">
            <h1 className="font-bold text-lg sm:text-xl text-center sm:text-left mb-4">
              Una forma divertida de aprender Lengua de Señas Colombianas
            </h1>
            <p className="text-sm sm:text-base text-center sm:text-left leading-relaxed">
              Acompaña a Mani, un aventurero curioso, en un viaje mágico lleno de aprendizajes y diversión.
              Explora la Isla ABC, el Jardín Mágico y la Selva Encantada mientras superas desafíos, resuelves
              lecciones y desbloqueas recompensas. Descubre el gran secreto del mundo mientras aprendes
              Lengua de Señas Colombianas jugando. ¡La aventura te espera!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
