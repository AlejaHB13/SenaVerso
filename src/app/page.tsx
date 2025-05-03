import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div>
        <Navbar />
    <div className="flex flex-col min-h-screen bg-white text-black p-6">

    <div className="flex flex-col sm:flex-row items-center justify-center text-left">
  {/* Imagen a la izquierda */}
  <Image
    src="/mano.png"
    alt="Mano"
    width={300}
    height={300}
    className="sm:mr-6 mb-4 sm:mb-0"
  />

  {/* Texto a la derecha */}
  <div className="max-w-lg">
    <h1 className="font-bold text-xl text-center sm:text-left">
      Una forma divertida de aprender Lengua de Señas Colombianas
    </h1>
    <p className="text-center sm:text-left">
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
