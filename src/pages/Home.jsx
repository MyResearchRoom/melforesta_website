// src/pages/Home.jsx

import React, { useEffect } from "react";
import {
  HeroSection,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7,
  Section8,
  Section9
} from "../components/features/home";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpVariants,
  sectionStaggerVariants,
} from "../components/common/motion";

import AnimatedSection from "../components/common/AnimatedSection";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToCategories) {
      const el = document.getElementById("categories");

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [location.state]);

  return (
    <motion.div
      className="min-h-screen"
      variants={sectionStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSection />

      <AnimatedSection
        variant={fadeUpVariants}
        className="px-3 md:px-10 lg:px-20"
      >
        <Section1
          id="categories"
          heading="Featured Products"
          paragraph="Discover our handpicked selection of premium honey varieties."
          digit={6}
        />
      </AnimatedSection>

      <AnimatedSection variant={fadeUpVariants}>
        <Section3 />
      </AnimatedSection>

      <AnimatedSection variant={fadeUpVariants}>
        <Section4 />
      </AnimatedSection>

      <AnimatedSection variant={fadeUpVariants}>
        <Section2 />
      </AnimatedSection>

      <AnimatedSection variant={fadeUpVariants}>
        <Section8 />
      </AnimatedSection>

      <Section9 />

      <AnimatedSection variant={fadeUpVariants}>
        <Section5 />
      </AnimatedSection>

      <AnimatedSection variant={fadeUpVariants}>
        <Section7 />
      </AnimatedSection>



      <AnimatedSection variant={fadeUpVariants}>
        <Section6 />
      </AnimatedSection>
    </motion.div>
  );
}
