import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Quote } from "lucide-react";
import confetti from "canvas-confetti";

interface Note {
  id: number;
  type: "memory" | "reason" | "quote";
  text: string;
}

const notes: Note[] = [
  {
    id: 1,
    type: "memory",
    text: "The time we stayed up until 4 AM just talking about the universe.",
  },
  {
    id: 2,
    type: "memory",
    text: "Our first date when I was so nervous I forgot how to use a straw.",
  },
  {
    id: 3,
    type: "reason",
    text: "I love how your eyes light up when you talk about something you're passionate about.",
  },
  {
    id: 4,
    type: "reason",
    text: "The way you make me feel safe even on my worst days.",
  },
  {
    id: 5,
    type: "reason",
    text: "Your laugh is my favorite sound in the world.",
  },
  {
    id: 6,
    type: "quote",
    text: "'Whatever our souls are made of, hers and mine are the same.' — Emily Brontë",
  },
  {
    id: 7,
    type: "quote",
    text: "'In all the world, there is no heart for me like yours.' — Maya Angelou",
  },
  {
    id: 8,
    type: "quote",
    text: "'You are my sun, my moon, and all my stars.' — E.E. Cummings",
  },
  {
    id: 9,
    type: "quote",
    text: "'I have waited for you, I have always been waiting for you.' — Pablo Neruda",
  },
  {
    id: 10,
    type: "reason",
    text: "'I love how genuinely you care about the little things in life, it makes every moment with you feel special.'",
  },
  {
    id: 11,
    type: "memory",
    text: "Remember how nervous I was when I was about to hug you for the first time?",
  },
  {
    id: 12,
    type: "memory",
    text: "Remember that dog who walked with us when we were in godawari and guarded us all the time?",
  },
  {
    id: 13,
    type: "memory",
    text: "Do you remember everyday when we go for a date we always end up finding atleast one dog",
  },
  {
    id: 14,
    type: "reason",
    text: "I love how you always find joy in the simplest things, like a walk in the park or a cup of tea or just us sitting together in silence.",
  },
  {
    id: 15,
    type: "reason",
    text: "I love how you motivate me to be a better person, not by pushing me, but by believing in me and supporting my dreams.",
  },
  {
    id: 16,
    type: "quote",
    text: "'I love you not only for what you are, but for what I am when I am with you.' — Roy Croft",
  },
  {
    id: 17,
    type: "quote",
    text: "'I am catastrophically in love with you.' — Cassandra Clare",
  },
  {
    id: 18,
    type: "memory",
    text: "Remember that time when we went to Naikap for date and You kept on pushing and motivating me to get you rodhodendron. I love that you motivate me to be better person.",
  },
  {
    id: 19,
    type: "reason",
    text: "I love you because you make me feel seen and heard in a way that no one else ever has. You understand me on a deep level and accept me for who I am.",
  },
  {
    id: 20,
    type: "quote",
    text: "'I wish I could turn back the clock. I'd find you sooner and love you longer.' — Unknown",
  },
  {
    id: 21,
    type: "reason",
    text: "I love you because you have seen me in my high and lows my weird and bright sides and you still choose to be with me. I love how you accept me for who I am.",
  },
];

const LittleThingsJar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const drawNote = () => {
    if (isOpen) return;

    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
    setIsOpen(true);

    // Trigger some subtle confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#a78bfa", "#fde047", "#60a5fa"],
    });
  };

  const getNoteStyle = (type: string) => {
    switch (type) {
      case "memory":
        return "bg-blue-100 border-blue-300 text-blue-800 shadow-[0_4px_0_0_rgba(59,130,246,0.5)]";
      case "reason":
        return "bg-yellow-100 border-yellow-300 text-yellow-800 shadow-[0_4px_0_0_rgba(234,179,8,0.5)]";
      case "quote":
        return "bg-purple-100 border-purple-300 text-purple-800 shadow-[0_4px_0_0_rgba(168,85,247,0.5)]";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] relative">
      {/* The Jar Visual */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={drawNote}
        className="relative cursor-pointer group"
      >
        {/* Jar Lid */}
        <div className="w-24 h-6 bg-base-300 rounded-t-xl mx-auto border-b-2 border-base-content/10 shadow-md"></div>
        {/* Jar Body */}
        <div className="w-48 h-64 bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-b-3xl relative overflow-hidden flex flex-wrap p-4 items-end justify-center gap-1 shadow-2xl">
          {/* Little decorative "scraps" inside the jar */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-6 rounded-sm rotate-${i * 15} opacity-60 ${i % 3 === 0 ? "bg-blue-300" : i % 3 === 1 ? "bg-yellow-300" : "bg-purple-300"}`}
            ></div>
          ))}

          {/* Label on the Jar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 px-4 py-2 rounded-lg border-2 border-dashed border-primary text-primary font-bold rotate-[-5deg] text-center">
              <p className="text-xs uppercase tracking-widest">The Jar of</p>
              <p className="text-lg">Little Things</p>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-8 text-base-content/70 italic animate-pulse">
        Click the jar to draw a note...
      </p>

      {/* Note Animation Overlay */}
      <AnimatePresence>
        {isOpen && currentNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: 300, scale: 0, rotate: -20 }}
              animate={{ y: 0, scale: 1, rotate: 0 }}
              exit={{ y: 500, scale: 0, opacity: 0 }}
              className={`relative w-full max-w-sm p-8 rounded-lg shadow-2xl border-2 font-serif ${getNoteStyle(currentNote.type)}`}
            >
              <div className="absolute top-4 right-4 opacity-30">
                {currentNote.type === "memory" && <Music size={40} />}
                {currentNote.type === "reason" && <Heart size={40} />}
                {currentNote.type === "quote" && <Quote size={40} />}
              </div>

              <div className="mb-4 text-xs font-bold uppercase tracking-widest opacity-60">
                {currentNote.type === "memory" && "A Memory I Cherish"}
                {currentNote.type === "reason" && "Why I Love You"}
                {currentNote.type === "quote" && "A Quote for Us"}
              </div>

              <p className="text-2xl leading-relaxed text-center py-6">
                "{currentNote.text}"
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-2 rounded-full border border-current/30 hover:bg-current/10 transition-colors font-sans uppercase text-sm font-bold"
              >
                Put it back
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LittleThingsJar;
