import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

// 1. Define the interface for the props
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: string;
  y?: string;
}

// 2. Apply the interface to the component
const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  x = "0%",
  y = "0%",
}: FloatingElementProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute pointer-events-none select-none text-4xl"
    style={{ left: x, top: y }}
  >
    {children}
  </motion.div>
);

export const About = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 overflow-hidden bg-base-100 transition-colors duration-500">
      {/* --- FLOATING DECORATIONS --- */}
      <FloatingElement x="10%" y="15%" delay={0}>
        🐰
      </FloatingElement>
      <FloatingElement x="85%" y="20%" delay={1} duration={5}>
        🐰
      </FloatingElement>
      <FloatingElement x="5%" y="70%" delay={2}>
        🌹
      </FloatingElement>
      <FloatingElement x="90%" y="75%" delay={1.5} duration={6}>
        🌸
      </FloatingElement>

      {/* Themed Hearts & Stars */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-1/4 right-[20%] text-primary/40"
      >
        <Heart size={48} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute bottom-1/3 left-[15%] text-secondary/40"
      >
        <Sparkles size={40} />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-1/2 left-[5%] text-accent/30"
      >
        <Star size={32} fill="currentColor" />
      </motion.div>

      {/* --- MAIN CONTENT CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="card bg-base-200/50 backdrop-blur-xl border border-base-content/10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-secondary to-accent"></div>

          <div className="card-body items-center text-center p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <Heart size={14} className="fill-current" />
              Our Digital Sanctuary
              <Heart size={14} className="fill-current" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
              Our love story, in <br />
              <span className="text-primary italic">playful</span> notes
            </h1>

            <p className="mt-6 text-base-content/80 text-lg leading-relaxed font-medium">
              "Every moment with you feels like a page from a fairytale I never
              want to finish."
            </p>

            <div className="divider opacity-20"></div>

            <p className="text-base-content/70 leading-8 text-md italic">
              This site is a little romantic space where I can share memories,
              surprises, and feelings with you. Every route is meant to be soft,
              sweet, and full of warm moments—just like your smile.
            </p>

            <div className="card-actions mt-8">
              <button className="btn btn-primary btn-round px-8 shadow-lg shadow-primary/20">
                Forever & Always ✨
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-base-content/40 font-mono tracking-tighter">
          DESIGNED FOR YOU • 2025-{new Date().getFullYear()} • 💖
        </p>
      </motion.div>

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
};
