import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { fetchProducts } from "../../../redux/actions/prodcutAction";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Section2() {
  const dispatch = useDispatch();
  const { product = [] } = useSelector((state) => state.productState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const bestSellers = product.filter((item) => item.isbestseller).slice(0, 5);
  const productsToShow = bestSellers.length > 0 ? bestSellers : product.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[#3E2C1C] mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-[#8B7355]">
            Customer favorites that you&apos;ll love
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={productsToShow.length > 3}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="best-sellers-slider !px-2 !pb-14"
        >
          {productsToShow.map((productItem, index) => (
            <SwiperSlide key={productItem.id ?? index} className="h-auto">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="flex h-full px-2"
  >
  <div className="group flex h-full  flex-col overflow-hidden rounded-2xl border border-[#D4A017]/10 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <Link
        to={`/productdetail/${productItem.id}`}
        className="block h-full"
      >
        
        {/* Image Section */}
<div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F0] rounded-t-2xl">

  {productItem.isbestseller && (
    <span className="absolute left-4 top-4 z-10 rounded-full bg-[#D4A017] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
      Bestseller
    </span>
  )}

  <img
    src={productItem.images?.[0]?.image}
    alt={productItem.productName}
    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
  />
</div>

        {/* Content */}
    <div className="flex flex-1 flex-col space-y-3 p-6">

          {/* Category */}
      <span className="block text-xs font-bold uppercase tracking-[0.25em] text-[#D4A017]">
            {productItem.category?.name}
          </span>

          {/* Product Name */}
   <h3 className="line-clamp-1 text-2xl font-serif text-[#3E2C1C]">
            {capitalizeFirstLetter(productItem.productName)}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-sm leading-6 text-[#8B7355]">
            {productItem.description}
          </p>

          {/* Bottom Section */}
            <div className="mt-auto flex items-center justify-between pt-2">
              <p className="text-2xl font-bold text-[#D4A017]">
  ₹{Math.round(productItem.variants?.[0]?.discountedPrice || 0)}
</p>

            <span className="rounded-full border border-[#D4A017] px-4 py-2 text-sm font-semibold text-[#3E2C1C] transition-colors duration-300 group-hover:bg-[#D4A017] group-hover:text-white">
              View Details
            </span>
          </div>
        </div>

      </Link>
    </div>
  </motion.div>
</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
