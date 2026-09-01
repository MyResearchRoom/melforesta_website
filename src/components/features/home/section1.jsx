import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/actions/categoryActions";
import { FaArrowRight } from "react-icons/fa";
import capitalizeFirstLetter from "../../common/capitalizeFirstLetter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { fetchProducts } from "../../../redux/actions/prodcutAction";
import { addToCart } from "../../../service/addToCart";
import { fetchCoupons } from "../../../redux/actions/couponsActions";

function OfferTicker() {
  const [copiedCode, setCopiedCode] = useState(null);
  const dispatch=useDispatch();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    // toast.success(`Coupon "${code}" copied successfully!`);

    setTimeout(() => setCopiedCode(null), 6000);
  };

  useEffect(() => {
      dispatch(fetchCoupons({ page:1, limit: "all" }));
    }, [dispatch]);
      
    const { coupons = [], error } = useSelector(
      (state) => state.couponState
    );
  const offers = [...coupons, ...coupons];

  return (
   <>
    {coupons.length > 0 && (
    <div
      className="
        relative left-1/2 right-1/2 -mx-[50vw] w-screen
        overflow-hidden
        bg-gradient-to-r from-[#C68A0F] via-[#D9A017] to-[#C68A0F]
        border-y border-[#B8790A]/40
      "
    >
      <style>{`
        @keyframes offerTickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .offer-ticker-track {
          animation: offerTickerScroll 32s linear infinite;
          width: max-content;
        }
        .offer-ticker-wrap:hover .offer-ticker-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="offer-ticker-wrap overflow-hidden py-2.5">
        <div className="offer-ticker-track flex items-center whitespace-nowrap">
          {offers.map((offer, index) => (
            <button
              key={`${offer.code}-${index}`}
              onClick={() => handleCopy(offer.code)}
              className="flex items-center px-6 group focus:outline-none"
              title={`Click to copy code ${offer.code}`}
            >
              <span className="text-sm md:text-base font-semibold text-white tracking-wide group-hover:underline underline-offset-4">
                {offer.description ? offer.description : offer.name}
              </span>

               <span
                className={`
                  px-3 py-1 text-sm font-extrabold tracking-wider
                  transition-all duration-300 rounded-md ml-3
                  ${
                    copiedCode === offer.code
                      ? "bg-green-600 text-white"
                      : "bg-[#8B5E00] text-yellow-200"
                  }
                `}
              >
                {copiedCode === offer.code ? "COPIED!" : offer.code}
              </span>

              <span className="mx-3 text-white/50 text-sm">✦</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    )}
  </>
  );
}

export default function Section1({ id, heading, paragraph }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const { categories = [] } = useSelector(
    (state) => state.categoryState
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { product, totalRecords, error } = useSelector(
    (state) => state.productState,
  );

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     dispatch(
  //       fetchProducts()
  //     );
  //   }, [dispatch]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await dispatch(fetchProducts(1, 4));
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [dispatch]);

  const handleCategoryClick = (cat) => {
    // navigate("/productpage", { state: { category: cat.category } });
    navigate(`/productdetail/${cat.id}`);
  };

 const toggleCart = async (productId, quantity, variantId) => {
  if (!storedUser || !token) {
    navigate("/cartpage");
    return;
  }

  await dispatch(addToCart(productId, quantity, variantId));

  navigate("/cartpage");
};

  return (
  <>
    <OfferTicker />
    <section
      id={id}
      className="mx-auto py-10 px-4 sm:px-6 lg:px-8 rounded-3xl my-12 bg-white shadow-md shadow-yellow-500 border border-yellow-100 border-t border-t-yellow-500"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-[#3e2c1c]">
          {heading}
        </h2>
        <p className="text-[#9a7555] mb-4 max-w-2xl mx-auto text-xl">
          {paragraph}
        </p>
        <div className="w-28 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        observer={true}
        observeParents={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!px-2 !pb-14"
      >
         {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="aspect-square w-full rounded-xl bg-gray-200"></div>

                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : ( product.slice(0, 4).map((cat, idx) => (
          <SwiperSlide key={cat.id ?? idx}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCategoryClick(cat)}
              className="group relative bg-white rounded-2xl border border-gray-200 p-4
              flex flex-col justify-between h-full transition-all duration-300
              hover:shadow-xl hover:border-amber-200 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#fbf4eb]">
                <img
                  src={cat.images?.[0]?.image}
                  alt={cat.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="mt-6 flex flex-col flex-grow text-left min-h-[120px] p-2">
                <span className="text-xs uppercase tracking-widest text-[#d4a017] font-bold mb-1">
                  {cat.category?.name}
                </span>

                <h3 className="text-xl font-serif font-bold text-gray-900 capitalize line-clamp-1">
                  {capitalizeFirstLetter(cat.productName)}
                </h3>

                <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between p-4">
                <div>
                  <span className="text-sm font-semibold text-gray-400 block">
                    {cat?.variants?.[0]?.weight}
                  </span>

                  <p className="text-xl font-bold text-[#D4A017]">
                    ₹{Math.round(cat?.variants?.[0]?.discountedPrice || 0)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCart(
                      cat.id,
                      1,
                      cat?.variants?.[0]?.id
                    );
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 text-base font-semibold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </SwiperSlide>
        )))}
      </Swiper>

      {/* Footer */}
      <Link to="/productpage">
        <div className="mt-8 flex justify-center">
          <button className="group flex items-center gap-3 px-6 py-2 border-2 border-amber-600 text-amber-700 text-lg rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300">
            View All Products
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </Link>
    </section>
  </>
  );
}