import { useEffect } from "react";
import { motion } from "framer-motion";

// import cute from "../assets/cute.png";
import firstDate from "../assets/firstDate.jpg";
import keyring from "../assets/keyring.jpg";
import rememberThis from "../assets/rememberThis.jpg";
import food from "../assets/food.jpg";
import kiss from "../assets/kiss.jpg";
import mine from "../assets/mine.jpg";

type ScrapItem = {
  id: number;
  type: "photo" | "note";
  src?: string;
  text: string;
  x: number;
  y: number;
  rotation: number; // Pre-calculated to prevent hydration mismatch
};

// Pre-generate rotations so SSR & hydration stay consistent
const scrapItems: ScrapItem[] = [
  {
    id: 1,
    type: "photo",
    src: firstDate,
    text: "The beginning",
    x: 10,
    y: 5,
    rotation: -4,
  },
  {
    id: 2,
    type: "note",
    text: "I still remember our first hug.",
    x: 60,
    y: 15,
    rotation: 6,
  },
  {
    id: 3,
    type: "photo",
    src: keyring,
    text: "Your earring as my keyring",
    x: 25,
    y: 35,
    rotation: -2,
  },
  {
    id: 4,
    type: "note",
    text: "Scroll down... there is more.",
    x: 50,
    y: 50,
    rotation: 8,
  },
  {
    id: 5,
    type: "photo",
    src: rememberThis,
    text: "Remember This?",
    x: 70,
    y: 70,
    rotation: -5,
  },
  {
    id: 6,
    type: "photo",
    src: food,
    text: "Ending of our every date",
    x: 15,
    y: 95,
    rotation: 3,
  },
  {
    id: 7,
    type: "note",
    text: "We have so many memories...",
    x: 50,
    y: 120,
    rotation: -7,
  },
  {
    id: 8,
    type: "photo",
    src: kiss,
    text: "I can't get enough of you",
    x: 65,
    y: 140,
    rotation: 4,
  },
  {
    id: 9,
    type: "photo",
    src: mine,
    text: "You are mine, and I am yours",
    x: 20,
    y: 170,
    rotation: -6,
  },
  {
    id: 10,
    type: "note",
    text: "To be continued...",
    x: 45,
    y: 190,
    rotation: 2,
  },
];

export const Memories = () => {
  useEffect(() => {
    // Set initial center position
    document.documentElement.style.setProperty(
      "--cursor-x",
      `${window.innerWidth / 2}px`,
    );
    document.documentElement.style.setProperty(
      "--cursor-y",
      `${window.innerHeight / 2}px`,
    );

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <section
      id="memories"
      className="relative w-full min-h-[250vh] bg-[#020202]"
    >
      {/* 🔦 Flashlight Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(circle 180px at var(--cursor-x) var(--cursor-y), rgba(255,255,230,0.08) 0%, rgba(0,0,0,0.92) 80%, rgba(0,0,0,1) 100%)`,
        }}
      />

      {/* 📸 Scrap Container */}
      <div className="relative w-full min-h-screen pt-6 pb-24 px-4 sm:px-8 lg:px-12">
        {scrapItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            {item.type === "photo" ? (
              <div className="bg-white p-3 pb-8 shadow-2xl w-[180px] md:w-[200px]">
                <div className="w-full h-40 bg-neutral-200 mb-3 overflow-hidden rounded-sm">
                  <img
                    src={item.src}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-['Reenie_Beanie',cursive] text-xl text-center mt-2 text-gray-800">
                  {item.text}
                </p>
              </div>
            ) : (
              <p className="font-['Dancing_Script',cursive] text-2xl md:text-3xl text-white/70 max-w-[380px] leading-relaxed drop-shadow-lg">
                {item.text}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
