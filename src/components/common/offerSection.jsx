import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, Sparkles, Clock3 } from "lucide-react";

// import couponData from "../../data/couponsData"; // adjust path if needed
import { fetchCoupons } from "../../redux/actions/couponsActions";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function OfferBanner() {
  const [copiedCode, setCopiedCode] = useState(null);
  const dispatch=useDispatch();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchCoupons({ page:1, limit: "all" }));
  }, [dispatch]);
    
  const { coupons = [], error } = useSelector(
    (state) => state.couponState
  );

  // duplicate for marquee effect
  const offers = [...coupons, ...coupons];

  return (
    <>
    {coupons.length > 0 && (
      <>
      <style>{`
        @keyframes scrollOffers {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .offer-track {
          animation: scrollOffers 35s linear infinite;
          width: max-content;
        }

        .offer-wrapper:hover .offer-track {
          animation-play-state: paused;
        }

        .offer-mask {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );

          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-[#E7CC95] bg-gradient-to-r from-[#FFFDF8] via-[#FFF8EA] to-[#FFFDF8] shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F1E0B8] bg-[#FFF5DE]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE8B8] flex items-center justify-center">
            <Gift className="w-6 h-6 text-[#D98A11]" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D98A11] font-semibold">
              Exclusive Offers
            </p>
            <h3 className="font-serif text-xl text-[#5C3D1A]">
              Available Coupon Codes
            </h3>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-2 text-[#D98A11]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time Deals</span>
          </div>
        </div>

        {/* Marquee */}
        <div className="offer-wrapper offer-mask overflow-hidden py-5">
          <div className="offer-track flex items-center">
            {offers.map((coupon, index) => (
              <div
                key={`${coupon.code}-${index}`}
                className="
                  mx-3
                  min-w-[420px]
                  rounded-2xl
                  border
                  border-[#F3E2B9]
                  bg-white
                  px-5
                  py-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                {/* Title */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-xl text-[#5C3D1A]">
                      {coupon.name}
                    </h4>
                    <p className="text-sm text-[#7A6545] mt-1">
                      {coupon.description}
                    </p>
                  </div>

                  <Sparkles className="w-4 h-4 text-[#D98A11]" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 gap-3">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      rounded-xl
                      bg-gradient-to-r
                      from-[#FFF7E5]
                      to-[#FFECC0]
                      border border-[#E7CC95]
                      font-bold
                      text-[#8B4B00]
                      hover:shadow-md
                      transition
                    "
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {coupon.code}
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-sm text-[#7A6545]">
                    <Clock3 className="w-4 h-4 text-[#D98A11]" />
                    Valid till {formatDate(coupon.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      </>
    )}
    </>
  );
}