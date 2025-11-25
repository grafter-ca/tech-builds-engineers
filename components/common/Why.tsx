import { reasons } from "@/constants";
import { title } from "process";
import React from "react";

const WhyChooseUs = () => {

  return (
    <article id="why-choose-us" className="w-full px-6 lg:px-20 mb-10">
      <header>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
          Why Choose Us
        </h2>
      </header>

      <section className="flex flex-col font-semibold text-lg">

        {reasons.map((reason, index) => (

        <details key={index} className="group border border-gray-200  max-w-[900px] w-full rounded-xl p-5 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200">
          <summary className="text-gray-800 mb-4 font-poppins font-medium">{reason.title}</summary>
          <p className="font-inter font-light text-gray-600">
           {reason.description}
          </p>
        </details>
        ))}
      </section>
    </article>
  );
};

export default WhyChooseUs;
