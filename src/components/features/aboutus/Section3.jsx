import React from "react";
import { kunal } from "../../../assets/about";
export default function Section3() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen flex items-center justify-center px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="mx-auto h-full bg-cover w-full">
          <img src={kunal} alt="Founder" className="rounded-2xl w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-[#3E2C1C] font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
            Message from Our  <br /> Founder
          </h1>
          <hr className="max-w-xs bg-yellow-600 h-1 lg:h-2"/>
          <div className="text-[#8B7355] text-sm leading-relaxed lg:text-base  text-justify">

<i>
  <strong>
    Mel Foresta
    <sup className="text-lg relative -top-1">™</sup>
  </strong>{" "}
  began with a personal search for something better.
</i>
            <br /><br/>

            <p>When our grandmother (Dadi), living with diabetes, had to give up many of the sweets she
              loved, we began exploring natural alternatives that could allow her to still enjoy sweetness in moderation. What started as a simple family concern became a deeper journey of
              experimentation, learning, and discovery.</p><br />

            <p>Through that journey, we found honey not just as a sweetener, but as a remarkable natural food with value far beyond taste. That discovery inspired us to look deeper into purity, sourcing, and the way authentic honey reaches people.</p><br />

            <p>Over time, that personal journey evolved into Mel Foresta - a brand built around responsibly sourced honey, monofloral collection through managed bee boxes, support for farmers through pollination, and a commitment to sharing honey in its most honest form.</p><br/>

            <p>What began with care for one person became a purpose to serve many.</p><br/>

            {/* <p>Thank you for being part of our journey.</p><br/> */}
          </div>

          <h1 className="text-[#3E2C1C] font-serif text-xl lg:text-2xl leading-tight font-semibold" > 
            Kunal Lohiya
          </h1>
          <p className="text-yellow-600 text-md lg:text-lg ">The Co-Founder, Mel Foresta</p>
        </div>
      </div>
    </section>
  );
}
