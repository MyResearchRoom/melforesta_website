import React from "react";
import { section3Data } from "../../../data/bulkorders_Data/section3Data";
import jar from "../../../assets/comman/jar.jpg";
import { BulkOrder } from "../../../assets/product";

export default function Section3() {
  return (
    <section className="bg-[#faf3e9] py-16 px-4">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
        Perfect For Every Occasion
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-[#9a7555]">
         Our honey makes the perfect gift for any corporate event
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left - Image Window */}
        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-xl max-w-xl w-full h-[350px]">
            <img 
              src={BulkOrder} 
              alt="Honey" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right - Points */}
        <div className="space-y-6">
          {section3Data.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-start gap-4">
                
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#c79412] shrink-0">
                  <Icon className="text-white text-2xl" />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-xl font-semibold text-[#3e2c1c]">
                    {item.title}
                  </h4>
                  <p className="text-[#9a7555] text-lg">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
