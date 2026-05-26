import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Memories } from "../components/Memories";

export const MemoriesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="min-h-screen w-full overflow-y-auto bg-[#020202] text-white"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          ← Back
        </Link>
      </div>
      <Memories />
    </motion.div>
  );
};
