"use client";

import { patern_image } from "@/constants";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Patern() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to(sectionRef.current, {
      xPercent: -100,
      ease: "none",
      repeat: -1,
      duration: 20,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0),
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex justify-end items-center p-4 space-x-8 mb-20"
    >
      {patern_image.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Pattern ${index + 1}`}
          className="object-cover"
          height={165}
          width={165}
        />
      ))}
    </div>
  );
}
