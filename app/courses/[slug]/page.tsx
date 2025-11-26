"use client";

import React, { useEffect, useRef } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { courses } from "@/constants";
import { useParams } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CourseDetail() {
  const params = useParams();
  const course = courses.find((c) => c.slug === params.slug);

  if (!course)
    return (
      <div className="flex items-center justify-center mt-40 text-2xl font-semibold">
        Course Not Found
      </div>
    );

  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fade-in Hero
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });

    // Content Animation on Scroll
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
        className="relative mt-21 w-full h-[270px] md:h-[350px] flex items-center justify-center bg-gray-200 overflow-hidden"
      >
        <Image
          src={course.image || "/img/engineering-image.jpeg"}
          alt="Course Hero"
          fill
          className="object-cover opacity-70"
        />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg font-manrope">
            {course.title}
          </h1>
          <p className="text-lg text-white mt-2 drop-shadow font-inter">
            Learn and Advance Your Career
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 md:px-0 py-16">
        <div ref={contentRef}>
          {/* TITLE + ICON */}
          <div className="flex items-center gap-4 mb-8">
            <course.icon className="w-14 h-14 text-blue-600" />
            <h2 className="text-3xl font-bold font-manrope">
              {course.title}
            </h2>
          </div>

          {/* BASIC DESCRIPTION */}
          <p className="text-lg text-gray-700 leading-relaxed mb-4 font-inter">
            {course.desc1}
          </p>
          <p className="text-gray-600 leading-relaxed mb-10 font-inter">
            {course.desc2}
          </p>

          {/* OVERVIEW */}
          <h3 className="text-2xl font-bold font-manrope mb-4">Overview</h3>
          <p className="text-gray-700 leading-relaxed mb-10 font-inter">
            {course.overview}
          </p>

          {/* HIGHLIGHTS */}
          <h3 className="text-2xl font-bold font-manrope mb-4">
            What You Will Learn
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-2 font-inter mb-10">
            {course.highlights.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* MODULES */}
          <h3 className="text-2xl font-bold font-manrope mb-4">Course Modules</h3>
          <div className="space-y-6">
            {course.modules.map((mod, i) => (
              <div
                key={i}
                className="p-5 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold font-manrope mb-2">
                  {mod.title}
                </h4>
                <p className="text-gray-700 font-inter">{mod.content}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button className="bg-blue-600 text-white px-10 py-3 rounded-lg font-medium hover:bg-blue-800 shadow transition">
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
