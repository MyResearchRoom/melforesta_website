import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { videoGalleryData } from "../../../data/categoryData";
import {V2, V3, V4, V5, V6} from "../../../assets/video/index"


export default function Section7() {

  const [activeVideo, setActiveVideo] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    let isPaused = false;
    let lastTime = 0;

    const speed = 1.5; // 🔥 increased speed

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        const halfwayPoint = container.scrollWidth / 2;

        // ✅ delta-based smooth movement
        container.scrollLeft += speed * (delta / 16);

        if (container.scrollLeft >= halfwayPoint) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const pause = () => (isPaused = true);
    const resume = () => (isPaused = false);

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-white to-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-serif text-[#3E2C1C] mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-[#8B7355]">
            Customer favorites that you'll love
          </p>
        </div>

        {/* Slider */}
        <div className="overflow-hidden w-full">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-6 overflow-x-auto whitespace-nowrap will-change-transform"
          >
           {[...videoGalleryData, ...videoGalleryData].map((item, index) => (
  <div key={`${item.id}-${index}`} className="flex-shrink-0">
    
    <div
      onClick={() => setActiveVideo(item.vedio)} // ✅ modal trigger
      className="
        cursor-pointer
        w-[200px] h-[300px]
        md:w-[240px] md:h-[360px]
        lg:w-[260px] lg:h-[390px]
        bg-black
        rounded-2xl
        overflow-hidden
        shadow
        hover:shadow-xl
        transition-all duration-300
      "
    >
      <video
        src={item.vedio}
        controls
        controlsList="nofullscreen"
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>

  </div>
))}
          </div>
        </div>

      </div>

      {activeVideo && (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
    
    <div className="relative flex items-center justify-center w-full h-full">
      
      {/* Close Button */}
      <button
        onClick={() => setActiveVideo(null)}
        className="absolute top-4 right-4 text-white text-3xl z-10"
      >
        ✕
      </button>

      {/* Video Wrapper */}
      <div className="flex items-center justify-center w-full h-full">
        
        <video
          src={activeVideo}
          controls
          autoPlay
          className="
            max-h-[90vh]
            max-w-[90vw]
            w-auto
            h-auto
            object-contain
            rounded-lg
            bg-black
          "
        />
        
      </div>
    </div>
  </div>
)}
    </section>
  );
}