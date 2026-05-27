import { Link } from "react-router-dom";
import { Card } from "../components/Card";

const sweetCards = [
  {
    id: 1,
    icon: "📸",
    title: "Our Memories",
    text: "Tap to explore our little moments...",
    to: "/memories",
  },
  {
    id: 2,
    icon: "💝",
    title: "Mood Cards",
    text: "Tell me how you're feeling today...",
    to: "/moods",
  },
  {
    id: 3,
    icon: "📅",
    title: "Love Timeline",
    text: "Relive the moments that brought us together...",
    to: "/timeline",
  },
  {
    id: 4,
    icon: "✨",
    title: "Jar of Love",
    text: "A little jar filled with reasons why I love you...",
    to: "/jar",
  },
  {
    id: 5,
    icon: "🌌",
    title: "Stargazing",
    text: "Gaze at the stars and reflect on our journey...",
    to: "/stargazing",
  },
];

export const Home = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-sm uppercase tracking-[0.4em] text-pink-500/80">
          Sweet things
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-primary">
          A little romantic adventure
        </h1>
        <p className="mt-4 text-base-content/70 leading-8">
          Choose one of the cards below to open a special page made just for us.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sweetCards.map((card, index) => (
          <Link key={card.id} to={card.to} className="group">
            <Card
              icon={card.icon}
              title={card.title}
              text={card.text}
              delay={index * 0.1}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
