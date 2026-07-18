"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="page-stage"
      initial={{ opacity: 0, rotateX: 2.5, y: 34 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="route-wipe"
        initial={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }}
        animate={{ clipPath: "polygon(0 0,100% 0,100% 0,0 0)" }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      />
      {children}
    </motion.div>
  );
}
