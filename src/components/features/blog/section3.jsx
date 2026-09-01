import React from "react";

export default function Section3() {
  return (
    <section className="bg-[#FFF5E1] py-12 px-4">
      
      <div className="max-w-6xl mx-auto text-center bg-[#c79411] rounded-2xl p-8">
        
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-serif text-white mb-3">
          Never Miss a Post
        </h2>

        {/* Subheading */}
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Subscribe to receive our latest articles, recipes, and honey tips
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="max-w-2xl sm:w-auto flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none"
          />

          <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}