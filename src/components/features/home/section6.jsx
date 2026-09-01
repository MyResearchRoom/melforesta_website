import React from 'react'

const section6 = () => {
  return (
    <section className="flex flex-col items-center justify-center space-y-10 px-6 md:px-12 py-16 bg-[#322418]">
      {/* Heading */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl xl:text-5xl font-serif  text-white leading-loose">
          Sweet Deals in Your Inbox
        </h1>
        <h2 className="text-sm lg:text-base xl:text-lg text-gray-300">
          Subscribe to get special offers, recipes, and honey tips
        </h2>
      </div>

      {/* Subscription Form */}
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-lg ">
        <div className='flex gap-5 items-center justify-center text-2xl '>

        <input
          type="email"
          placeholder="Your email address"
          className="w-full sm:flex-1 px-4 py-3 rounded-lg border  text-sm md:text-base   focus:outline-none focus:ring-2 focus:ring-yellow-500 transition border-white bg-[#483B2F] "
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md text-sm md:text-base lg:text-lg hover:bg-yellow-600 transition-colors duration-300">
          Subscribe
        </button>
        </div>
      <p className="text-gray-300 text-center text-md lg:text-lg">
        Join 10,000+ honey enthusiasts. Unsubscribe anytime.
      </p>
      </div>

      {/* Footer Note */}
    </section>
  )
}

export default section6