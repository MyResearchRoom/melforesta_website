import React from 'react'
import {Section1,Section2} from "../components/features/gallery/index"
import { motion } from 'framer-motion'
import { fadeLeftVariants, revealViewport, sectionStaggerVariants } from '../components/common/motion'

const Gallery = () => {
  return (
    <motion.div variants={sectionStaggerVariants} initial="hidden" animate="visible">
        <Section1/>
        <motion.div variants={fadeLeftVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section2/>
        </motion.div>
    </motion.div>
  )
}

export default Gallery
