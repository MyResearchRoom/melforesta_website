import { featuresData } from "../../../data/bulkorders_Data/section2Data";

const FeaturesSection = () => {
  return (
    <section className="bg-[#fffbf5] py-24 px-6 text-center">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
      Why Choose Mel Foresta for Your Business
      </h2>

      {/* Subheading */}
      <p className="text-[#9a7555] mb-12 max-w-2xl mx-auto text-xl">
       Premium quality, flexible solutions, and exceptional service
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
            >
              
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#c49211]   mb-4">
                <Icon className="text-white text-2xl" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-[#3e2c1c] ">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#9a7555] text-md">
                {item.desc}
              </p>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FeaturesSection;

