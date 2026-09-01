import React from 'react'
import {correct} from "../../../assets/about/index"
const Section7 = () => {
  return (
    <section className='bg-[#332517] py-16 px-6'>
    {/* Header Section */}
    <div className='max-w-4xl mx-auto text-center mb-12 space-y-2'>
        <h2 className='text-3xl md:text-4xl font-serif text-white '>Trusted & Certified</h2>
        <p className='text-lg  font-light text-white'>Quality you can trust, certified by the best</p>
    </div>
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 '>
        {[
                    { img: correct,name:"correct", title: "Raw & Natural", desc: "FSSAI Certified" },
                    { img: correct,name:"correct",  title: "Quality Assured", desc: "FDA Compliant Facility" },
                    { img: correct,name:"correct",  title: "Fair Trade", desc: "Ethically Sourced" },
                    { img: correct,name:"correct",  title: "Sustainable", desc: "Eco-Conscious Practices" }
                ].map((member, index) => (
                    <div key={index} className='group bg-[#45392E] rounded-2xl shadow-sm border border-white p-2  '>
                        {/* Image Container with aspect ratio forcing consistency */}
                        <div className='w-full flex   justify-center'>
                            <img 
                                src={member.img} 
                                alt={member.name} 
                                className='rounded-full bg-amber-900'
                            />
                        </div>
                        
                        {/* Content */}
                        <div className='p-6 text-center text-white '>
                            <h3 className='font-serif text-xl '>{member.title}</h3>
                            <p className=' text-sm  tracking-wide  mt-1'>{member.desc}</p>
                        </div>
                    </div>
                ))}
    </div>
    </section>
  )
}

export default Section7