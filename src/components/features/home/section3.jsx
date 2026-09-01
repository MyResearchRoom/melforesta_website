import React from "react";
import image from "../../../assets/comman/house.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const section3 = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen px-6 md:px-12 py-12 bg-[#f9efe3]">
      
      {/* Left Column - Image */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <img
          src={image}
          alt="Our Story"
          className="rounded-xl shadow-lg w-full max-w-lg h-[500px] object-cover"
        />
      </motion.div>

      {/* Right Column - Text */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="space-y-10"
      >
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
          Our Story: Forest To Table
        </h2>

        <p className="text-[#a87355] leading-relaxed md:text-lg">
          Mel Foresta was born from a deep respect for nature and a passion for authentic honey. Through
          carefully managed bee boxes placed in pesticide-conscious regions, we collect honey shaped by
          natural floral diversity.
        </p>

        <p className="text-[#a87355] leading-relaxed md:text-lg">
          Working closely with beekeepers and farmers, we support sustainable pollination while
          preserving the purity and integrity of every harvest. Every jar reflects responsible sourcing,
          honest craftsmanship, and honey as nature intended.

        </p>

        <Link to={`/aboutus`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 mt-8 text-white bg-[#d4a017] rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300 md:text-lg"
          >
            Learn More About Us <FaArrowRight />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default section3;