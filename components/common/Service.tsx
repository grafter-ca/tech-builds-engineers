"use client";

import { Cpu, Code, Cuboid } from "lucide-react";

export default function Services() {
    const services = [
        {
            title: "CAD / Mechanical",
            description: "CSWA, CSWP & CSWPA Preparation",
            details: "Practice questions, mock exams, 1:1 coaching",
            icon: Cuboid,
        },
        {
            title: "Embedded Systems",
            description: "Arduino & Embedded Training",
            details: "Hands-on projects, circuits, programming",
            icon: Cpu,
        },
        {
            title: "Web Dev / Code",
            description: "Web Development Essentials",
            details: "HTML, CSS, JavaScript, React intro, NextJS intro",
            icon: Code,
        },

    ];
  return (
    <section id="services" className="w-full px-6 lg:px-20 mb-30">
      {/* Section Title */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
        Our Services / What We Offer
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-8 px-0">
        
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 hover:shadow-lg transition-shadow duration-200"
          >
            <service.icon className="w-16 h-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700 mb-2">{service.description}</p>
            <p className="text-gray-500">{service.details}</p>
            <button className="mt-8 text-blue-500 hover:underline cursor-pointer transition duration-800 ease-">Learn More</button>
          </div>

))}

      </div>
    </section>
  );
}
