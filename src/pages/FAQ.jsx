import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FQAData } from "../data/faq";
import { fadeUpVariants, revealViewport, sectionStaggerVariants } from "../components/common/motion";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      className="py-8 px-4 md:px-12 xl:px-20"
      variants={sectionStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={fadeUpVariants}
        className="flex items-center space-x-2 cursor-pointer mb-6 hover:text-yellow-600"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardBackspace className="text-xl md:text-2xl" />
        <p className="text-base md:text-lg lg:text-xl font-semibold ">
          FAQs
        </p>
      </motion.div>

      <div className="space-y-5">
        {FQAData.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              whileInView="visible"
              initial="hidden"
              viewport={revealViewport}
              className={`border rounded-2xl shadow-sm transition-all duration-300 
                ${isOpen ? "border-yellow-600 shadow-md bg-yellow-50" : "border-gray-300"}
              `}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="font-medium text-sm md:text-base lg:text-lg text-gray-800">
                  {faq.question}
                </span>

                {isOpen ? (
                  <IoChevronUp className="text-xl text-yellow-600" />
                ) : (
                  <IoChevronDown className="text-xl text-gray-500" />
                )}
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 
                  ${isOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="px-5 pb-4 text-gray-700 text-xs md:text-sm lg:text-base">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
