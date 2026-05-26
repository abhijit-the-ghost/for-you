import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RefreshCw } from "lucide-react";

type MoodId = "happy" | "sad" | "angry" | "surprise";

interface MoodConfig {
  id: MoodId;
  label: string;
  color: string;
  bg: string;
  messages: string[];
}

const MOODS: MoodConfig[] = [
  {
    id: "happy",
    label: "HAPPY",
    color: "#ffb703",
    bg: "#fff9e6",
    messages: [
      "Your smile is my favorite thing! ✨",
      "You're glowing today! 😍",
      "You're the sunshine of my life. ☀️",
      "I love the way your eyes sparkle when you laugh.",
      "You make everything better just by being here. 💖",
      "Seeing you happy is the best part of my day. 🌸",
      "Your laugh is my favorite soundtrack. 🎶",
      "You have the most amazing energy—it lights up every room! 💡",
      "You make even ordinary moments feel like magic. ✨",
      "I’m so lucky that I get to be the one by your side. 🍀",
      "You’re my favorite reason to smile. 🥰",
      "The world is just better when you’re this happy. 🌍",
      "You're more stunning than any sunset. 🌅",
      "Keep shining, baby. You look incredible today! 💎",
    ],
  },
  {
    id: "sad",
    label: "SAD",
    color: "#48cae4",
    bg: "#e8f8fc",
    messages: [
      "Sending you 1000 virtual hugs. 🫂",
      "It’s okay to not be okay. I’m right here. ❤️",
      "I wish I could hold you and melt the sadness away.",
      "Everything will be okay, I promise. ✨",
      "I’m holding your hand in my heart right now. You’re not alone. 🤝",
      "Take all the time you need. I'm not going anywhere. 🕰️",
      "You are so much stronger than this bad day. 💪",
      "Even when you're sad, you're the most beautiful person I know. 🌹",
      "Whatever is weighing on your heart, let's carry it together. ☁️",
      "I’m sending you a huge forehead kiss and a warm blanket. 💋",
      "If you want to talk, I’m listening. If you want to be silent, I’ll just sit with you. 🤍",
    ],
  },
  {
    id: "angry",
    label: "ANGRY",
    color: "#e63946",
    bg: "#fde8e8",
    messages: [
      "Take a deep breath... Still cute even when mad! 😤",
      "I'm on your team. Want to vent? I'm listening. 👂",
      "Let’s go get some 'angry snacks' later. My treat! 🍔",
      "I'll go punch a wall for you! (Just kidding, but I'm here!)",
      "Can I bribe your anger with some kisses and your favorite food? 🍕💋",
      "You have every right to be mad. I'm in your corner. 🥊",
      "I’m sorry for being a dummy. Let me make it up to you? 🥺",
      "Applying to be your favorite person again. Status: Pending? 📝❤️",
      "Even with those angry eyebrows, you’re still the prettiest girl ever. 😍",
      "I'd rather fight with you than laugh with anyone else. 🤍",
      "Let me know when you're ready for a 'peace-offering' hug. 🫂",
    ],
  },
  {
    id: "surprise",
    label: "SURPRISE",
    color: "#9d4edd",
    bg: "#f3e8ff",
    messages: [
      "Remember that time we couldn't stop laughing when i said 'K Hereko' to a security camera after kissing your hand? 😂",
      "I'm thinking about our first date and how nervous I was... and how you made me feel so at ease. 🥰",
      "Scratch for a kiss next time I see you! 💋",
      "I'm still surprised every day that I get to call you mine. 😍",
      "I was just looking at our photos and my heart did that little skip again. 💓",
      "Check your pocket next time we meet... I might have hidden a little love note. 📝",
      "I have a tiny surprise planned for our next date. Any guesses? 🎁✨",
      "Just a random reminder: You’re my favorite person in the whole wide world. 🌍❤️",
      "Close your eyes and imagine I’m giving you a forehead kiss right now. 🪄😘",
      "I still remember the exact moment I realized I was falling for you. 💘",
      "Every time my phone lights up, I hope it’s you. You still give me butterflies. 🦋",
    ],
  },
];

const ScratchCard = ({
  moodConfig,
  message,
  onBgChange,
  onReset,
}: {
  moodConfig: MoodConfig;
  message: string;
  onBgChange: (c: string) => void;
  onReset: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCleared, setIsCleared] = useState(false);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  const playScratchSound = useCallback(() => {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    const audioCtx = new AudioContextClass();
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1000 + Math.random() * 500;
    filter.Q.value = 0.5;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ced4da"; // Metallic gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.fillStyle = "#adb5bd";
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        1,
      );
    }
    setIsCleared(false);
    scratchCount.current = 0;
  }, []);

  // Only re-init when the message changes (Reset)
  useEffect(() => {
    initCanvas();
  }, [message, initCanvas]);

  const checkTransparency = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isCleared) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 64) {
      if (imageData.data[i] === 0) transparent++;
    }

    if (transparent / (imageData.data.length / 256) > 0.55) {
      setIsCleared(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: [moodConfig.color, "#ffffff"],
      });
    }
  }, [moodConfig.color, isCleared]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      if (scratchCount.current % 3 === 0) playScratchSound();

      scratchCount.current++;
      if (scratchCount.current % 10 === 0) checkTransparency();
    };

    const handleStart = () => {
      isDrawing.current = true;
      onBgChange(moodConfig.bg); // Changes the global page background
    };

    const handleEnd = () => (isDrawing.current = false);

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    window.addEventListener("mousemove", scratch);
    window.addEventListener("touchmove", scratch, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("touchstart", handleStart);
      window.removeEventListener("mousemove", scratch);
      window.removeEventListener("touchmove", scratch);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [moodConfig.bg, onBgChange, playScratchSound, checkTransparency]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-xl border border-white/40 touch-none"
    >
      {/* 
          REVEALED LAYER: 
          Now uses moodConfig.bg and moodConfig.color 
      */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-colors duration-700"
        style={{
          backgroundColor: moodConfig.bg, // Card interior matches mood theme
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
        }}
      >
        <p className="text-gray-800 font-semibold leading-relaxed text-base">
          {message}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={288}
        height={176}
        className="absolute inset-0 cursor-crosshair"
      />

      {/* Label and Reset Button */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span
          className="px-3 py-1 text-[10px] font-black text-white rounded-full uppercase tracking-tighter shadow-sm"
          style={{ backgroundColor: moodConfig.color }}
        >
          {moodConfig.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="p-1 rounded-full bg-white/60 hover:bg-white transition-all shadow-sm"
        >
          <RefreshCw size={12} className="text-gray-700" />
        </button>
      </div>
    </motion.div>
  );
};

export const MoodCards = () => {
  const [messages, setMessages] = useState<Record<MoodId, string>>(() => {
    const initial = {} as Record<MoodId, string>;
    MOODS.forEach((m) => {
      initial[m.id] = m.messages[Math.floor(Math.random() * m.messages.length)];
    });
    return initial;
  });

  const [bgColor, setBgColor] = useState("#fff0f3");

  // Stable random hearts
  const [heartAnimations] = useState(() =>
    [...Array(12)].map(() => ({
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      fontSize: 12 + Math.random() * 14,
    })),
  );

  const handleReset = (id: MoodId) => {
    const mood = MOODS.find((m) => m.id === id);
    if (mood) {
      setMessages((prev) => ({
        ...prev,
        [id]: mood.messages[Math.floor(Math.random() * mood.messages.length)],
      }));
    }
  };

  return (
    <section
      className="relative min-h-screen py-16 px-4 transition-colors duration-1000 ease-in-out flex flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {heartAnimations.map((heart, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
            className="absolute"
            style={{ left: `${heart.left}%`, fontSize: `${heart.fontSize}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-3 drop-shadow-sm">
          How are you feeling today?
        </h1>
        <p className="text-gray-600 font-medium italic">
          Scratch the silver foil to see your message...
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {MOODS.map((mood) => (
          <ScratchCard
            key={mood.id}
            moodConfig={mood}
            message={messages[mood.id]}
            onBgChange={setBgColor}
            onReset={() => handleReset(mood.id)}
          />
        ))}
      </div>
    </section>
  );
};
