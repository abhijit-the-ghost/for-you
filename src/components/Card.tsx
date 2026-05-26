import { motion } from "framer-motion";

interface CardProps {
  icon: string;
  title: string;
  text: string;
  delay?: number;
}

export const Card = ({ icon, title, text, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card bg-base-100 shadow-lg border border-primary/10 rounded-box cursor-pointer"
    >
      <div className="card-body items-center text-center p-6 gap-3">
        <motion.div
          whileHover={{ scale: 1.25, rotate: 5 }}
          className="text-4xl bg-base-200/60 p-3 rounded-full"
        >
          {icon}
        </motion.div>

        <h2 className="card-title text-xl font-bold text-primary">{title}</h2>

        <p className="text-base-content/70 leading-relaxed text-sm">{text}</p>
      </div>
    </motion.div>
  );
};
