"use client";

import React from "react";
import { services } from "@/constants";
import ServicesCard from "../ui/ServicesCard";



export default function Services() {
  return (
    <section id="services" className="w-full px-6 lg:px-20 mb-30">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
        Our Services / What We Offer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-8 px-0">
        {services.slice(0,3).map((service, i) => (
          <ServicesCard key={i} item={service} />
        ))}
      </div>
    </section>
  );
}
