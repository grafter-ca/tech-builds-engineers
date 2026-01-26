"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { hero_image } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/JoinCTA";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef<(HTMLImageElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Text animation
    if (textRef.current) {
      gsap.from(textRef.current, {
        opacity:0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Floating images
    imageRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { y: 0 },
        {
          y: -12,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full min-h-screen lg:flex items-center justify-between px-6 md:px-16 bg-linear-to-b from-white to-[#A8C7FF]"
    >
      {/* LEFT CONTENT */}
      <article className="max-w-xl mt-36 mx-auto px-2" ref={textRef}>
        {/* Heading */}
        <h1 className="md:text-5xl text-3xl font-bold leading-tight text-gray-900">
          Empowering Engineers to Learn, Build & Innovate.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-700 font-medium flex items-center gap-2">
          <span>SolidWorks</span>
          <span className="w-1 h-1 bg-gray-900 rounded-full" />
          <span>Embedded Systems</span>
          <span className="w-1 h-1 bg-gray-900 rounded-full" />
          <span>Web Development</span>
        </p>

       {/* Buttons Container */}
<div className="flex flex-col sm:flex-row gap-4 mt-10">
  <Button 
    variant="primary" 
    type="button"
    onClick={() => router.push('/courses')}
    className="w-full sm:w-auto" // Mobile full-width, desktop auto
    label="Start Learning"
  />

   <Button
    variant="outline" 
    type="button"
    onClick={() => router.push('/register')}
    className="w-full sm:w-auto"
    label="Join the Club"
  />
  </div>
      </article>

      {/* RIGHT — Floating Images */}
      <section className="grid grid-cols-3 gap-3 mt-20 lg:mt-0">
        {hero_image.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={90}
            width={90}
            alt={`Hero Image ${index + 1}`}
            title={`Our Course ${index + 1}`}
            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full shadow-lg border border-gray-200 bg-white"
            ref={(el) => {
              imageRef.current[index] = el;
            }}
          />
        ))}
      </section>
    </section>
  );
};

export default Hero;
