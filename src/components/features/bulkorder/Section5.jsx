import React from "react";

export default function Section5() {
  return (
    <section className="bg-[#362719] py-16 px-4 text-center">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
        Volume Discounts
      </h2>

      {/* Subheading */}
      <p className="text-[#f5e6d3] mb-12">
        Save more with larger orders
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {[
          { title: "10% OFF", subtitle: "25-50 units" },
          { title: "15% OFF", subtitle: "51-100 units" },
          { title: "20% OFF", subtitle: "101-200 units" },
          { title: "25% OFF", subtitle: "200+ units" },
        ].map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-200">
              {item.subtitle}
            </p>
          </div>
        ))}

      </div>

      {/* Bottom Note */}
      <p className="text-[#f5e6d3] text-base mt-10 max-w-2xl mx-auto">
        *Discounts apply to the retail price. Contact us for custom quotes on larger orders.                                                                                                                                                                                                                                                                        
      </p>

    </section>
  );
}

