import React from "react";
import { section4Data } from "../../../data/bulkorders_Data/section4Data";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function Section4() {
  return (
    <section className="bg-[#faf3e9] ] py-16 px-4">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
          Customization Options
        </h2>
        <p className="text-[#9a7555] max-w-2xl mx-auto text-lg">
          Tailor your order to perfectly match your brand and occasion
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section4Data.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            
            {/* Title */}
            <h3 className="text-2xl font-semibold mb-4 text-[#3e2c1c]">
              {card.title}
            </h3>

            {/* List */}
            <ul className="space-y-3">
              {card.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  
                  {/* Tick Icon */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    <IoMdCheckmarkCircleOutline  className="text-yellow-600 text-2xl" />
                  </div>

                  {/* Text */}
                  <span className="text-gray-600 text-base">
                    {item}
                  </span>

                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

    </section>
  );
}