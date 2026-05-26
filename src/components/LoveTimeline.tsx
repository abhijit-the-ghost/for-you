import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flower,
  Camera,
  Key,
  Shirt,
  Heart,
  Coffee,
  Stethoscope,
  Timer,
  Trees,
  Bell,
} from "lucide-react";
import confetti from "canvas-confetti";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const events: TimelineEvent[] = [
  {
    id: 1,
    date: "December 26, 2025",
    title: "The Very First Date",
    description:
      "The day we met, and I knew from the moment I saw you that my life was about to change forever. The way you smiled at me across the table, I felt like the luckiest person alive. You let me tie your shoe laces. You made me feel seen that day.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-pink-500",
  },
  {
    id: 2,
    date: "December 29, 2025",
    title: "The date at Pashupati Nath",
    description:
      "Our second date, where you held my hand for the first time. My mind went blank and I was so nervous, but you made it feel so natural and right. That moment when our fingers intertwined, I felt like I was home. And you made me a bouquet of paper tulips.",
    icon: <Flower className="w-6 h-6" />,
    color: "bg-orange-500",
  },
  {
    id: 3,
    date: "December 30, 2025",
    title: "First Time I Posted You",
    description:
      "The day I couldn't help but share how amazing you are with the world. I was so proud to call you mine and wanted everyone to see how lucky I am.",
    icon: <Camera className="w-6 h-6" />, // Changed to Camera
    color: "bg-purple-500",
  },
  {
    id: 4,
    date: "January 2, 2026",
    title: "Your Jhumka as My Keyring",
    description:
      "Every time I see it, I'm reminded of your love and the way you make even the simplest things feel special.",
    icon: <Key className="w-6 h-6" />, // Changed to Key
    color: "bg-blue-500",
  },
  {
    id: 5,
    date: "January 3, 2026",
    title: "AI Image",
    description:
      "AI image of me playing while wearing the jersey of Real madrid and my number was your birth day '14'.",
    icon: <Shirt className="w-6 h-6" />, // Changed to Shirt (Jersey)
    color: "bg-sky-600", // Real Madrid Blue
  },
  {
    id: 6,
    date: "January 4, 2026",
    title: "First Hug",
    description:
      "The first time you hugged me, it felt like the world had made sense for the first time. I felt safe and loved. Like all the pieces of my heart finally fit together.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-rose-500",
  },
  {
    id: 7,
    date: "January 11, 2026",
    title: "First meeting at Radhe Radhe",
    description:
      "The first time we sat together at a cafe near your house. And first time you marked me yours when you bit my hand.",
    icon: <Coffee className="w-6 h-6" />,
    color: "bg-amber-600",
  },
  {
    id: 8,
    date: "January 18, 2026",
    title: "First Hospital Date",
    description:
      "Patan Hospital for your checkup. Even though we didn't get tickets, we had Haddi Biriyani. I kissed your forehead for the first time. Then Godawari. Amazing day.",
    icon: <Stethoscope className="w-6 h-6" />, // Changed to Stethoscope
    color: "bg-teal-500",
  },
  {
    id: 9,
    date: "January 20, 2026",
    title: "Second Hospital Date",
    description:
      "I picked you up and we spent a few hours together. I wanted to do planks just to make time slow down because I never want to leave your side.",
    icon: <Timer className="w-6 h-6" />, // Changed to Timer (Time stopping)
    color: "bg-indigo-500",
  },
  {
    id: 10,
    date: "Feb 1, 2026",
    title: "Date at Pharping",
    description:
      "We went to pharping together. We went to a park and we hugged and kissed each other. It was so much fun.",
    icon: <Trees className="w-6 h-6" />, // Changed to Trees (Nature/Park)
    color: "bg-emerald-600",
  },
  {
    id: 11,
    date: "Feb 3, 2026",
    title: "The Guardian Bell Charm",
    description:
      "You gifted me the guardian bell charm for my bike. Every time I ride, I feel like you’re right there with me, protecting me.",
    icon: <Bell className="w-6 h-6" />, // Changed to Bell
    color: "bg-yellow-500",
  },
];

const LoveTimeline = () => {
  const handleCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd"],
    });
  };

  return (
    <div className="py-12 px-4 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-2"
          >
            Our Story So Far
          </motion.h1>
          <p className="text-base-content/70">
            Every moment with you is a favorite memory.
          </p>
        </header>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20 rounded-full" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Desktop Empty Space */}
                <div className="hidden md:block w-5/12" />

                {/* Dot on Timeline */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-10 h-10 rounded-full border-4 border-base-100 ${event.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {event.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow border border-white/5">
                    <div className="card-body p-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {event.date}
                      </span>
                      <h3 className="card-title text-xl">{event.title}</h3>
                      <p className="text-base-content/80 text-sm italic">
                        "{event.description}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20"
        >
          <button
            onClick={handleCelebrate}
            className="btn btn-primary btn-lg rounded-full gap-2 shadow-lg"
          >
            <Heart className="fill-current" />
            To be continued...
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveTimeline;
