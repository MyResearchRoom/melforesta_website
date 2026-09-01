import React from "react";
import { useParams } from "react-router-dom";
import { section2Data } from "../data/blog/section2Data";
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  fadeLeftVariants,
  fadeUpVariants,
  revealViewport,
  sectionStaggerVariants,
} from "../components/common/motion";

export default function BlogDetails() {
  const { id } = useParams();

  const blog = section2Data.find((item) => item.id === Number(id));

  if (!blog) {
    return <h2 className="text-center py-20">Blog not found</h2>;
  }

  return (
    <motion.section
      className="bg-[#fffbf5] py-16 px-4"
      variants={sectionStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* Image */}
        <motion.img
          variants={fadeLeftVariants}
          whileInView="visible"
          initial="hidden"
          viewport={revealViewport}
          src={blog.image}
          alt={blog.title}
          className="w-full h-[260px] md:h-[380px] lg:h-[550px] object-cover object-center rounded-xl mb-8"
        />

        {/* Content */}
        <motion.div
          variants={fadeUpVariants}
          whileInView="visible"
          initial="hidden"
          viewport={revealViewport}
          className="space-y-6"
        >

          <span className="bg-[#FFF5E1] text-yellow-700 px-4 py-1 rounded-full">
            {blog.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-serif text-[#3e2c1c]">
            {blog.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400">
            <FaCalendarAlt />
            {blog.date}
          </div>

{/* ✅ Dynamic long content */}
<p className="text-[#9a7555] text-lg leading-relaxed">
  {blog.content}
</p>

        </motion.div>
      </div>
    </motion.section>
  );
}
