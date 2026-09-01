import React from 'react'
import {Section1,Section2,Section3,Section4,Section5,Section6,Section7} from  "../components/features/bulkorder/index"
import { motion } from 'framer-motion'
import {
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpVariants,
  revealViewport,
  sectionStaggerVariants,
} from '../components/common/motion'

const Bulkorder = () => {
  return (
    <motion.div variants={sectionStaggerVariants} initial="hidden" animate="visible">
        <Section1/>
        <motion.div variants={fadeUpVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section2/>
        </motion.div>
        <motion.div variants={fadeLeftVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section3/>
        </motion.div>
        <motion.div variants={fadeRightVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section4/>
        </motion.div>
        <motion.div variants={fadeUpVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section5/>
        </motion.div>
        <motion.div variants={fadeLeftVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section6/>
        </motion.div>
        <motion.div variants={fadeUpVariants} whileInView="visible" initial="hidden" viewport={revealViewport}>
          <Section7/>
        </motion.div>
    </motion.div>
  )
}

export default Bulkorder
