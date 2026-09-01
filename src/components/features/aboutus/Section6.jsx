import React from 'react'
import {leaf, quality , community} from "../../../assets/about/index"
const Section6 = () => {
  return (
    <section className='bg-[#fffbf5] py-16 px-6'>
    {/* Header Section */}
    <div className='max-w-4xl mx-auto text-center mb-12 space-y-2'>
        <h2 className='text-3xl md:text-4xl font-serif text-[#3E2C1C]'>Our Core Values</h2>
        <p className='text-lg text-gray-600 font-light'>The principles that guide everything we do</p>
    </div>
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {[
                    { img: leaf,name:"leaf", title: "Sustainability", desc: "We practice responsible beekeeping that protects ecosystems and supports biodiversity." },
                    { img: quality,name:"quality",  title: "Quality Excellence", desc: "Every jar meets our rigorous standards for purity, taste, and nutritional value." },
                    { img: community,name:"community",  title: "Community First", desc: "We support local beekeepers and educate communities about the importance of bees." }
                ].map((member, index) => (
                    <div key={index} className='group bg-white rounded-2xl shadow-sm  '>
                        {/* Image Container with aspect ratio forcing consistency */}
                        <div className='w-full flex   justify-center'>
                            <img 
                                src={member.img} 
                                alt={member.name} 
                                className='rounded-full '
                            />
                        </div>
                        
                        {/* Content */}
                        <div className='p-6 text-center'>
                            <h3 className='font-serif text-xl text-[#3E2C1C]'>{member.title}</h3>
                            <p className=' text-sm  tracking-wide text-[#8B7355] mt-1'>{member.desc}</p>
                        </div>
                    </div>
                ))}
    </div>
    </section>
  )
}

export default Section6