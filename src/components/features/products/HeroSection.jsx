import React from "react";
import { motion } from "framer-motion";
import OfferBanner from "../../common/offerSection";

export default function HeroSection() {
  const parentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full py-10 bg-cover bg-center bg-no-repeat">
      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#3E2C1C] leading-tight font-serif">
            Our Honey Collection
          </h1>

          <p className="text-[#8B7355] text-base md:text-lg xl:text-xl max-w-3xl">
            Explore our complete range of premium, sustainably sourced honey products
          </p>
        </div>

        {/* Offer Banner */}
        <div className="mt-10">
          <OfferBanner />
        </div>
      </motion.div>
    </section>
  );
}