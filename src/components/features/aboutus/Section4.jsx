import React from 'react'
import { kunal, smita, kavita,sunil} from '../../../assets/about'
const Section4 = () => {
  return (
 <section className='bg-gradient-to-br from-[#F5E6D3] to-white py-16 px-6'>
    {/* Header Section */}
    <div className='max-w-4xl mx-auto text-center mb-12 space-y-2'>
        <h2 className='text-3xl md:text-4xl font-serif text-gray-900'>Meet Our Team</h2>
        <p className='text-lg text-gray-600 font-light'>The passionate people behind Mel Foresta</p>
    </div>

    {/* Team Grid */}
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {[
            { img: sunil, name: "Sunil Lohiya", role: "Director & CEO" },
            { img: kavita, name: "Kavita Lohiya", role: "Director & CEO" },
            { img: kunal, name: "Kunal Lohiya", role: "Managing Director"},
            { img: smita, name: "Smita Solanki", role: "Advisor" },

        ].map((member, index) => (
            <div key={index} className='group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100'>
                {/* Image Container with aspect ratio forcing consistency */}
                <div className='aspect-square overflow-hidden'>
                    <img 
                        src={member.img} 
                        alt={member.name} 
                        className='w-full h-full object-cover transition-all duration-500'
                    />
                </div>
                
                {/* Content */}
                <div className='p-6 text-center'>
                    <h3 className='font-serif text-xl text-gray-800'>{member.name}</h3>
                    <p className='text-amber-600 text-sm font-medium tracking-wide uppercase mt-1'>{member.role}</p>
                </div>
            </div>
        ))}
    </div>
</section>

  )
}

export default Section4