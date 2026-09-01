import React from "react";
import { FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function Section7() {
  return (
    <section className="bg-[#f9f1e7] py-12 px-4">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
        
        {/* Email */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-600">
            <FaEnvelope className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold">Email</h3>
          <p className="text-gray-600 text-base">
           skfoodsandspies@gmail.com
          </p>
        </div>

        {/* Call Us */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-600">
            <FaPhoneAlt className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold">Call Us</h3>
          <p className="text-gray-600 text-base">
           7796695552 / 9112112722
          </p>
        </div>

        {/* Business Hours */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-600">
            <FaClock className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold">Business Hours</h3>
          <p className="text-gray-600 text-base">
           Mon-Sat: 11AM – 7PM
          </p>
        </div>

      </div>

    </section>
  );
}

