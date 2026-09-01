import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCounts } from "../../../redux/actions/countActions";
import { motion } from "framer-motion";
import { mobBg, honeybg } from '../../../assets/comman';

export default function HeroSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { counts, error } = useSelector(state => state.countState);

  // ✅ Detect mobile vs desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(fetchCounts());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const parentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${isMobile ? mobBg : honeybg})`
      }}
      className="relative flex flex-col justify-center md:justify-center items-center md:items-start gap-8 px-6 min-h-screen bg-cover bg-center bg-no-repeat text-white overflow-x-hidden"
    >
      <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>

      <motion.div
        className="relative z-10 flex flex-col items-start gap-2 lg:gap-6 w-full max-w-md  lg:max-w-3xl px-2 lg:px-12"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        <i className="w-full text-lg md:text-2xl lg:text-3xl font-normal">
          From Hives to Home
        </i>

        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-semibold font-serif w-full lg:-mt-2">
          Natural Honey, Straight from Nature
        </h1>

        <p className=" mt-2 mb-6 text-base lg:text-2xl font-normal text-white">
          Experience the golden essence of pristine forests in every jar of our sustainably harvested honey
        </p>

        <div className="flex gap-4 text-base md:text-sm xl:text-base shadow-2xl">
          <button
            className="bg-[#e99905] text-white hover:bg-yellow-700 px-6 py-4 rounded-full flex items-center gap-1 hover:scale-105 font-bold"
            onClick={() => navigate("/productpage")}
          >
            Shop Now ➜
          </button>
        </div>
      </motion.div>
    </div>
  )
}