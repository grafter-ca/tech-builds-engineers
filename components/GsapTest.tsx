"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function GsapScroll() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({ ease: "power1.out" });

gsap.from('.fade-item',{
    opacity:0,
    y:50,
    x:200,
    duration:1,
    ease:"power3.out",
    scrollTrigger:{
      trigger:'.fade-item',
        start:"top 80%",
        toggleActions:"play none none reset",
    }
    
})


    gsap.from(boxRef.current, {
      y: 150,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 90%", // when box appears
        end: "top 40%", // where animation ends
        scrub: false, // true = animation syncs with scroll
      },
    });

    gsap.from(".fade-item", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".fade-item",
        start: "top 85%",
        toggleActions: "play none none reset",
      },
    });
  }, []);

  return (
    <div className="h-[100vh] p-20">
      <div className="h-[50vh]"></div> {/* spacer */}
      <div ref={boxRef} className="w-40 h-40 bg-blue-600 rounded-xl"></div>
      <div className="fade-item">Content</div>
    </div>
  );
}
