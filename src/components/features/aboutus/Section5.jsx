import React from 'react'
import { heart,aim } from '../../../assets/about'
const Section5 = () => {
  return (
    <section className='bg-gradient-to-br from-[#F5E6D3] to-white pt-6 pb-6'>
<div className='grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-6'>
  
  {/* Mission Card */}
  <div className='flex flex-col items-center text-center gap-4 bg-white rounded-3xl p-6 border shadow-xl'>
    <img src={aim} alt="aim icon" className='w-16 h-16 object-cover rounded-full' />
    
    <h1 className='font-serif text-xl lg:text-2xl text-[#3E2C1C]'>
      Our Mission
    </h1>
    
    <p className='lg:text-lg text-[#8B7355] leading-relaxed'>
      To deliver the finest, purest honey while protecting bee populations and promoting sustainable beekeeping practices. We're committed to transparency, quality, and environmental stewardship in everything we do.
    </p>
  </div>

  {/* Vision Card */}
  <div className='flex flex-col items-center text-center gap-4 bg-white rounded-3xl p-6 border shadow-xl'>
    <img src={heart} alt="heart icon" className='w-16 h-16 object-cover rounded-full' />
    
    <h1 className='font-serif text-xl lg:text-2xl text-[#3E2C1C]'>
      Our Vision
    </h1>
    
    <p className='lg:text-lg text-[#8B7355] leading-relaxed'>
      To become the most trusted name in natural honey, inspiring people worldwide to choose pure, sustainably sourced products that support both their health and the health of our planet.
    </p>
  </div>

</div>
    </section>
  )
}

export default Section5