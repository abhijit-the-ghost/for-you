import { motion } from "framer-motion";
import { MoodCards } from "../components/MoodCards";

export const MoodCardsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <MoodCards />
    </motion.div>
  );
};
