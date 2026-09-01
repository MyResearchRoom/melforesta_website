import React from 'react'
import {Section1,  Section2, Section3 } from  "../components/features/blog/index"
import { motion } from 'framer-motion'
import {
  fadeLeftVariants,
  fadeRightVariants,
  revealViewport,
  sectionStaggerVariants,
} from '../components/common/motion'

const Blog = () => {
  return (
    <motion.div variants={sectionStaggerVariants} initial="hidden" animate="visible">
        <Section1/>
        <motion.div variants={fadeLeftVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section2/>
        </motion.div>
        <motion.div variants={fadeRightVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section3/>
        </motion.div>
    </motion.div>
  )
}

export default Blog
