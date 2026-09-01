import React from 'react'
import { motion } from "framer-motion";
import bulkimage from "../../../assets/comman/bulkimage.png";

export default function Section1() {

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay }
    })
  };

  return (
    <> 
      <section 
        style={{ backgroundImage: `url(${bulkimage})` }}
        className="relative bg-cover bg-center font-serif bg-no-repeat min-h-[500px] text-white flex flex-col space-y-10 items-center justify-center p-4"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#3b2f2f]/80"></div>

        {/* Heading */}
        <motion.h1 
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-3xl md:text-5xl xl:text-6xl font-serif"
        >
          Bulk Orders & Corporate Gifting
        </motion.h1>

        {/* Subheading */}
        <motion.h3 
          custom={0.15}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-[#fff7e3] text-lg md:text-xl lg:text-2xl"
        >
          Premium honey solutions for businesses and special events
        </motion.h3>

      </section>
    </>
  )
}