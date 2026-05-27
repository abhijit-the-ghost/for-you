import React, { useState, useMemo } from "react"; // Added useMemo
import { motion, AnimatePresence } from "framer-motion";
import { Star, Moon, Sparkles } from "lucide-react";

interface CelestialPoint {
  id: number;
  x: number;
  y: number;
  label: string;
  message: string;
}

// Define the static points outside or inside useMemo
const points: CelestialPoint[] = [
  {
    id: 1,
    x: 20,
    y: 30,
    label: "Kindness",
    message: "The way you treat everyone with so much grace.",
  },
  {
    id: 2,
    x: 40,
    y: 15,
    label: "Laughter",
    message: "Your laugh is my favorite song in the world.",
  },
  {
    id: 3,
    x: 70,
    y: 25,
    label: "Strength",
    message: "I am constantly in awe of how you handle everything.",
  },
  {
    id: 4,
    x: 30,
    y: 60,
    label: "The Future",
    message: "I can't wait to build a home and a life with you.",
  },
  {
    id: 5,
    x: 60,
    y: 70,
    label: "Warmth",
    message: "Being near you feels like sunshine on a winter day.",
  },
  {
    id: 6,
    x: 85,
    y: 50,
    label: "Intelligence",
    message: "I love the way your mind works and how you see the world.",
  },
  {
    id: 7,
    x: 15,
    y: 80,
    label: "Compassion",
    message: "Your empathy and care for others is truly inspiring.",
  },
  {
    id: 8,
    x: 50,
    y: 50,
    label: "You",
    message: "You are my sun, my moon, and all my stars.",
  },
  {
    id: 9,
    x: 80,
    y: 20,
    label: "Adventures",
    message: "I look forward to all the adventures we'll have together.",
  },
];

const CelestialMap: React.FC = () => {
  const [activePoints, setActivePoints] = useState<number[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<CelestialPoint | null>(null);

  // FIX: Generate random background stars ONCE and memoize them
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      // eslint-disable-next-line react-hooks/purity
      width: Math.random() * 3,
      // eslint-disable-next-line react-hooks/purity
      height: Math.random() * 3,
      // eslint-disable-next-line react-hooks/purity
      left: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/purity
      top: `${Math.random() * 100}%`,
      // eslint-disable-next-line react-hooks/purity
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  const togglePoint = (id: number) => {
    if (activePoints.includes(id)) {
      setActivePoints(activePoints.filter((p) => p !== id));
    } else {
      setActivePoints([...activePoints, id]);
    }
  };

  return (
    <div className="relative w-full max-w-4xl aspect-video bg-linear-to-b from-slate-950 via-indigo-950 to-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-crosshair">
      {/* Background Twinkle Stars using the memoized data */}
      {backgroundStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.width,
            height: star.height,
            left: star.left,
            top: star.top,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: star.duration, repeat: Infinity }}
        />
      ))}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {activePoints.map((id, index) => {
          if (index === 0) return null;
          const prev = points.find((p) => p.id === activePoints[index - 1])!;
          const curr = points.find((p) => p.id === id)!;
          return (
            <motion.line
              key={`line-${prev.id}-${curr.id}`}
              x1={`${prev.x}%`}
              y1={`${prev.y}%`}
              x2={`${curr.x}%`}
              y2={`${curr.y}%`}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          );
        })}
      </svg>

      {/* Interactive Stars */}
      {points.map((point) => {
        const isActive = activePoints.includes(point.id);
        return (
          <div
            key={point.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <motion.button
              onClick={() => togglePoint(point.id)}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="relative group"
              whileHover={{ scale: 1.5 }}
            >
              <div
                className={`absolute inset-0 blur-md rounded-full transition-colors duration-500 ${isActive ? "bg-primary/60 scale-150" : "bg-white/20"}`}
              />
              <Star
                size={isActive ? 24 : 16}
                className={`relative transition-colors duration-500 ${isActive ? "fill-primary text-primary" : "text-white/40"}`}
              />

              {isActive && (
                <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-primary font-bold">
                  {point.label}
                </span>
              )}
            </motion.button>
          </div>
        );
      })}

      {/* Message Overlay */}
      <AnimatePresence mode="wait">
        {hoveredPoint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-white text-sm md:text-base font-light tracking-wide pointer-events-none"
          >
            <Sparkles className="inline-block mr-2 text-primary" size={16} />
            {hoveredPoint.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-6 right-8 text-white/30 pointer-events-none">
        <Moon size={40} className="opacity-20 rotate-12" />
      </div>
    </div>
  );
};

export default CelestialMap;
