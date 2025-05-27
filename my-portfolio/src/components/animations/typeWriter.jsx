import { motion } from "framer-motion";

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } }
};

export const Typewriter = ({ text, staggerChildren = 0.025, className = "", ...rest }) => {
  const sentenceVariants = {
    hidden: {},
    visible: { opacity: 1, transition: { staggerChildren } }
  };

  return (
    <motion.p
      key={text}
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
      {...rest}
      // Remove className from here
    >
      {text.split("").map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={letterVariants} className={className}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};