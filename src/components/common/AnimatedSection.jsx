// src/components/common/AnimatedSection.jsx

import React from "react";
import { motion } from "framer-motion";
import { revealViewport } from "./motion";

export default function AnimatedSection({
  children,
  variant,
  className = "",
}) {
  return (
    <motion.div
      variants={variant}
      whileInView="visible"
      initial="hidden"
      viewport={revealViewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}