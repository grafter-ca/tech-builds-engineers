"use client";

import React, { useRef, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { services } from "@/constants";
import { useParams } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const params = useParams();
  const service = services.find((s) => s.slug === params.slug);

  if (!service)
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
        Service Not Found
      </div>
    );

  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const Icon = service.icon;

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(contentRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        ref={headerRef}
        className="relative w-full h-[280px] md:h-[350px] flex items-center justify-center bg-gray-200 overflow-hidden mt-21"
      >
        <Image
          src={service.image || "/img/engineering-image.jpeg"}
          alt="Service Hero"
          fill
          className="object-cover opacity-70"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg font-manrope">
            {service.title}
          </h1>
          <p className="text-lg text-white mt-2 drop-shadow font-inter">
            Discover Our Service
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:px-0" >
        <div ref={contentRef}>
          {/* Title + Icon */}
          <div className="flex items-center gap-4 mb-10">
            <Icon className="w-14 h-14 text-blue-600" />
            <h2 className="text-3xl font-bold font-manrope">
              {service.title}
            </h2>
          </div>

          {/* Overview */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-3 font-manrope">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed font-inter">
              {service.overview}
            </p>
          </div>

          {/* Highlights */}
          {service.highlights && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-4 font-manrope">
                Key Highlights
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 font-inter">
                {service.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Modules */}
          {service.modules && (
            <div className="mb-14">
              <h3 className="text-2xl font-semibold mb-6 font-manrope">
                Training Modules
              </h3>

              <div className="space-y-5">
                {service.modules.map((module, i) => (
                  <div
                    key={i}
                    className="border p-5 rounded-xl shadow-sm bg-gray-50"
                  >
                    <h4 className="text-xl font-bold mb-2 font-manrope">
                      {module.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-inter">
                      {module.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-3 font-manrope">
              Additional Details
            </h3>
            <p className="text-gray-600 leading-relaxed font-inter">
              {service.details}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 shadow transition">
              Contact Us To Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
