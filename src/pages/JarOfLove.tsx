import React from "react";
import LittleThingsJar from "../components/LittleThingsJar";
import { Sparkles } from "lucide-react";

const JarOfLove: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4 overflow-hidden">
      <div className="max-w-2xl w-full text-center mb-12">
        <div className="flex justify-center mb-4">
          <Sparkles className="text-primary animate-pulse" size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4 font-serif">
          The Why Behind <span className="text-primary italic">Us</span>
        </h1>
        <p className="text-base-content/60 max-w-md mx-auto">
          I've gathered my favorite memories, reasons why I love you, and words
          that remind me of you. Whenever you need a smile, just reach in.
        </p>
      </div>

      <LittleThingsJar />

      <div className="mt-16 flex gap-6 text-sm opacity-50 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-300"></div> Memories
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-300"></div> Reasons
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-300"></div> Quotes
        </div>
      </div>
    </div>
  );
};

export default JarOfLove;
