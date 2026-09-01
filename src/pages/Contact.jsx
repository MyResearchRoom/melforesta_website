import React from 'react'
import { HeroSection, Section1 } from '../components/features/contact'
import { motion } from 'framer-motion'
import { fadeUpVariants, revealViewport, sectionStaggerVariants } from '../components/common/motion'

export default function Contact() {
  return (
    <motion.div
      className='min-h-screen'
      variants={sectionStaggerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSection/>
      <motion.div variants={fadeUpVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
        <Section1/>
      </motion.div>
    </motion.div>
  )
}
