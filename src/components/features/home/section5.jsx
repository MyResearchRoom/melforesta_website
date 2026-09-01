import React from "react";
import { reviews } from "../../../data/categoryData";
import { FaStar } from "react-icons/fa";


// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// ✅ Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Section5 = () => {
  return (
    <section className="bg-[#fffbf5] p-5 w-full flex flex-col items-center justify-center py-10 space-y-10">
      
      {/* Heading */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-serif text-[#3e2c1c]">
          What Our Customers Say
        </h2>
        <p className="text-[#9a7555] max-w-2xl text-xl text-center">
          Real reviews from real honey lovers
        </p>
      </div>

      {/* ✅ Swiper Slider */}
     <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".custom-pagination",   // 👈 custom container
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-6xl"
      >
        {reviews.map((data, idx) => (
          <SwiperSlide key={idx}>
            
            <div
              className="flex flex-col justify-between h-full bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition"
            >
              
              {/* ⭐ Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 text-md mb-4">
                "{data.comment}"
              </p>

              {/* User */}
              <div>
                <p className="font-semibold text-[#3e2c1c]">
                  {data.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {data.designation}
                </p>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-6 flex justify-center"></div>

    </section>
  );
};

export default Section5;  