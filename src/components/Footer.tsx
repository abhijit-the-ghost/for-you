import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-10 text-center border-t bg-base-200 border-primary/10">
      <p className="flex items-center justify-center gap-2 font-medium">
        Made with
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-error"
        >
          ❤️
        </motion.span>
        just for you
      </p>
      <p className="mt-2 text-xs opacity-50">
        © {new Date().getFullYear()} Our Forever Story
      </p>
    </footer>
  );
};
