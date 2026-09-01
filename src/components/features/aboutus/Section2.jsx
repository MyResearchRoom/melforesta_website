import React from "react";
import { bee,bg,comb,insect,maria,sanju,rahul } from '../../../assets/about/index'
import { house } from '../../../assets/comman'

const Section2 = () => {
  return (
<section className=" mx-auto min-h-screen flex items-center justify-center px-5 md:px-14 py-20 bg-gradient-to-br from-white to-[#F5E6D3]">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    
    {/* Left Side: Content */}
    <div className="flex flex-col space-y-8">
      <h1 className="text-[#3E2C1C] font-serif text-3xl md:text-5xl  leading-tight">
        Natural Honey, <br /> Responsibly Harvested
      </h1>
      
      <div className="text-[#8B7355]  md:text-base xl:text-xl leading-relaxed space-y-6">
        <p>
          <span className="italic font-semibold">Mel Foresta</span> was founded with a clear purpose: To bring authentic, high-quality forest honey
          from natural ecosystems to people who value purity, sustainability, and honest sourcing.
        </p>
        <p>
          Our journey began through partnerships with traditional beekeepers and farmers in biodiverse
          regions, where we collect honey through carefully managed bee boxes placed in areas free from
          pesticides and harmful chemicals. This not only helps preserve the purity of our honey, but also
          supports natural pollination and contributes to improved farm productivity.
        </p>
        <p>
          Shaped by floral diversity and natural conditions, our honey is harvested responsibly while
          protecting the balance between bees, communities, and the environment.
        </p>
        <p>
          Today, every jar of Mel Foresta reflects our commitment to purity, responsible harvesting, and
          sustainable beekeeping.
        </p>
      </div>
    </div>

    {/* Right Side: Staggered Image Grid */}
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      
      {/* Column 1 - Starts higher */}
      <div className="space-y-4 md:space-y-6">
        <img src={bee} alt="Bees" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm" />
        <img src={insect} alt="Flower" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm" />
      </div>

      {/* Column 2 - Pushed down to create the offset */}
      <div className="space-y-4 md:space-y-6 mt-12 md:mt-20">
        <img src={comb} alt="Honeycomb" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm" />
        <img src={house} alt="Beehives" className="w-full  h-64 md:h-80 object-cover rounded-2xl shadow-sm" />
        


      </div>
      
    </div>
  </div>
</section>
 
    
  );
};

export default Section2;
