import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { GiftHamper } from "../../../assets/product";

export default function Section8() {
  return (
    <section className="bg-[#faf5f1] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex rounded-full border-2 border-[#d4a017] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#b4811b]">
              Gifting
            </span>

            <h2 className="mt-6 max-w-xl text-3xl font-serif text-[#3e2c1c] md:text-5xl">
              Tasty, Thoughtful Gift Sets
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#8d6748]">
              Send the sweetest, healthiest gift and show how much you care.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6f5339]">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-yellow-300">
                Beautifully packed
              </span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-yellow-300">
                Perfect for celebrations
              </span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm border border-yellow-300">
                Bulk gifting available
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex items-start gap-3 bg-gradient-to-r from-yellow-50 to-[#fff7e6] border border-yellow-200 rounded-xl px-4 py-3 shadow-sm max-w-xl"
            >
              <div className="text-yellow-600 text-xl">✨</div>

              <div>
                <p className="text-sm md:text-base font-semibold text-[#3e2c1c]">
                  Customization Available
                </p>
                <p className="text-xs md:text-sm text-[#8d6748] mt-1 leading-relaxed">
                  Hampers can be fully customized with your choice of honey variants, packaging, and quantities to suit your event needs.<br/>Pricing varies based on customization, packaging, and order quantity.
                </p>
              </div>
            </motion.div>

            <Link to="/productpage" 
             state={{ category: "Premium Honey & Wellness Gift box" }} 
            className="inline-flex">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#D4A017] px-7 py-3 text-base font-semibold text-white shadow-lg shadow-[#3e2c1c]/15 transition-colors duration-300 hover:bg-[#d4a017]"
              >
                Explore
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-md">
              <div className="absolute inset-0" />
                <img
                  src={GiftHamper}
                  alt="Mel Foresta gifting honey jars"
                  className="relative h-[420px] w-full rounded-[1.5rem] object-cover object-center"
                />
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
