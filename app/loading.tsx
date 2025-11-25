"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".loader-circle",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );

    gsap.from(".loader-text", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="h-screen w-full flex flex-col justify-center items-center bg-white"
    >
      <div className="loader-circle h-14 w-14 rounded-full border-4 border-blue-600"></div>

      <p className="loader-text mt-6 text-blue-700 font-semibold text-lg tracking-wide">
        Loading...
      </p>
    </div>
  );
}
