import React from 'react'
import { motion } from "framer-motion";

export default function Section1  ()  {
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
          animate="visible" className=" p-16 space-y-4">
        <h1 className="text-[#3E2C1C] text-2xl lg:text-5xl font-serif text-center">Gallery</h1>
        <p className="text-[#8B7355] text-lg lg:text-xl text-center">
          Explore the journey of our honey — from buzzing hives to pristine forests.
        </p>
      </motion.div>
    </section>
  )
}

