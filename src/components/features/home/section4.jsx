import React from "react";
import { benefits } from "../../../data/categoryData";
import { motion } from "framer-motion";

const section4 = () => {

  // Parent container (controls stagger)
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  // Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-6 bg-[#fffbf5] space-y-4">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center space-y-2 mb-12 text-center"
      >
<h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
  <span className="block md:inline">Why Choose</span>{" "}
  <span className="block md:inline">Mel Foresta</span>
</h2>
      <p className="text-[#9a7555] mb-12 max-w-2xl mx-auto text-xl">
          Quality, purity, and sustainability in every jar
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
      >
        {benefits.map((data, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.03 }}
            className="flex flex-col justify-center items-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 space-y-2"
          >
            <img
              src={data.image}
              alt="icons"
              className="w-14 h-14 mb-6 object-contain rounded-full"
            />
            <h1 className="text-lg lg:text-xl font-serif text-[#3e2c1c] text-center">
              {data.title}
            </h1>
            <p className="text-[#9a7555] text-base lg:text-md text-center mt-3 leading-relaxed max-w-xs">
              {data.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default section4;