import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  // { label: "Memories", to: "/memories" },
  // { label: "Moods", to: "/moods" },
  { label: "About", to: "/about" },
];

const Header = () => {
  const [theme, setTheme] = useState("rosepetal");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "rosepetal" ? "oceandream" : "rosepetal");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 transition-all border-b backdrop-blur-md bg-base-100/70 border-primary/10">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <Heart fill="currentColor" size={24} />
          <span>For My Girl</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.to} whileHover={{ y: -2 }}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-secondary"
                      : "text-base-content/80 hover:text-secondary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 transition-transform rounded-full bg-primary/10 text-primary hover:scale-110 active:scale-95"
        >
          {theme === "rosepetal" ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
