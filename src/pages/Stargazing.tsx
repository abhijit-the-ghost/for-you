import React from 'react';
import CelestialMap from '../components/CelestialMap';

const Stargazing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12 space-y-4">
        <h2 className="text-white text-xs uppercase tracking-[0.4em] opacity-60">The Night We Met</h2>
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-primary">
          Our Constellation
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto font-light text-sm md:text-base leading-relaxed">
          I once read that we are all made of stardust. If that's true, then you are the brightest star in my sky. Click the stars to connect our story.
        </p>
      </div>

      <CelestialMap />

      <div className="mt-12 text-slate-500 text-xs italic">
        "Yours is the light by which my spirit's born: you are my sun, my moon, and all my stars."
      </div>
    </div>
  );
};

export default Stargazing;