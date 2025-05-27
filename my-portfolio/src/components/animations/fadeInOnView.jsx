// components/FadeInOnView.jsx
import { motion } from "framer-motion";

export default function FadeInOnView({ children, className = "", duration = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: duration }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
