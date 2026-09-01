import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const parentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };
  return (
    <section className="bg-[#fffbf5]">
      <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
          className=" p-16 space-y-6">
        <h1 className="text-[#3E2C1C] text-2xl lg:text-6xl font-serif text-center">Get in Touch</h1>
        <p className="text-[#8B7355] text-lg lg:text-xl text-center">
          We’d love to hear from you — connect with us for anything about our pure honey.
        </p>
      </motion.div>
    </section>
  );
}
