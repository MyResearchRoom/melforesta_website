import React from 'react'
import { bg } from '../../../assets/about'
import { motion } from "framer-motion";

export default function  Section1  () {
   const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay }
    })
  };
  return (
<section 
  style={{ backgroundImage: `url(${bg})` }}
  className="bg-cover bg-center font-serif bg-no-repeat min-h-[500px] text-white flex flex-col space-y-5 items-center justify-center p-4 relative"
>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  <motion.h1 
    custom={0}
    variants={textVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10 text-3xl md:text-5xl xl:text-7xl font-serif"
  >
    Our Story
  </motion.h1>

  <motion.h3 
    custom={0.15}
    variants={textVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10 text-lg md:text-xl lg:text-3xl"
  >
    Connecting <span className="text-green-400">Nature's</span> Bounty To Your Table
  </motion.h3>
        
</section>
  )
}

