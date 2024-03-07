import { motion } from "framer-motion";
import AnimText from "./AnimText";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function A4Animation() {
  return (
    <motion.div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,

      }}
    >
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px",
          borderRadius: "16px",
          backgroundColor: "transparent",
        }}
      >
        <motion.span
          variants={itemVariants}
          style={{
            display: "inline-block",
            padding: "32px",
            fontSize: "4rem",
            color: "white",
            fontFamily: "monospace",
            backgroundColor: "transparent",
          }}
        >
          <AnimText delay={1} />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
