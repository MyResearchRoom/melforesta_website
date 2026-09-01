import React from "react";
import { section2Data } from "../../../data/blog/section2Data";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Section2() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#fff5e2] py-16 px-4">
     
      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
       
        {section2Data
        .filter(card => !card.featured)
        .map((card) => (
          <div key={card.id} className="group bg-white rounded-md">
           
            {/* Image */}
           <div className="overflow-hidden rounded-t-xl">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-52 object-cover shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

            {/* Content */}
            <div className="space-y-4 p-4 flex flex-col h-full items-start ">
             
              {/* Badge */}
              <span className="inline-block bg-[#FFF5E1] text-yellow-700 text-base px-3 py-1 rounded-full">
                {card.category}
              </span>

              {/* Title */}
              <h3 className="text-xl text-[#3e2c1c] font-semibold transition-colors duration-300 group-hover:text-yellow-600 cursor-pointer">
                {card.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400 text-base">
                <FaCalendarAlt />
                <span>{card.date}</span>
              </div>

              {/* Description */}
              <p className="text-[#9a7555] text-base">
                {card.desc}
              </p>

              {/* Button */}
             <button
              onClick={() => navigate(`/blog/${card.id}`)}
               className="flex items-center gap-2 text-yellow-600 font-medium hover:gap-3 transition ml-auto mt-auto"
            >
              Read More <FaArrowRight />
            </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}