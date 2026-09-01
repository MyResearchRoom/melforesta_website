import React from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { section2Data } from "../../../data/blog/section2Data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



export default function Section1() {
   const parentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  const navigate = useNavigate();
  const card = section2Data.find(item => item.id === 6);
  return (
    <section className="bg-[#fffbf5] py-10 px-4">
     
      {/* Heading */}
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
          The Honey Journal
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-[#9a7555]">
          Discover tips, recipes, and stories from the world of honey and beekeeping.
        </p>
      </motion.div>

      {/* Content Row */}
      <div className="max-w-6xl md:h-[650px] h-auto mx-auto flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl shadow-md">
       
        {/* Left - Image */}
        <div className="md:w-1/2 overflow-hidden group">
  <img
    src={card.image}
    alt="Honey Journal"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</div>

        {/* Right - Content */}
       <div className="md:w-1/2 bg-white flex flex-col justify-center items-start text-left p-8 space-y-4">

              <span className="inline-block bg-[#FFF5E1] text-yellow-700 text-base px-3 py-1 rounded-full">
         {card.category}</span>
 
  {/* Title */}
  <h3 className="text-2xl md:text-4xl text-[#3e2c1c] font-semibold leading-tight">
  {card.title}
  </h3>

  {/* Date */}
  <div className="flex items-center gap-2 text-gray-400 text-sm md:text-lg">
    <FaCalendarAlt />
<span>{card.date}</span>
  </div>

  {/* Description */}
  <p className="max-w-md text-[#9a7555]">
  {card.desc}
</p>

  {/* Button */}
  <button
  onClick={() => navigate(`/blog/${card.id}`)}
  className="self-end md:self-start flex items-center gap-2 text-yellow-600 font-medium hover:gap-3 transition"
>
  Read More <FaArrowRight />
</button>

</div>
  </div>

    </section>
  );
}