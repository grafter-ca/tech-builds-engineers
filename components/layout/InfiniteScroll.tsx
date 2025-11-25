"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function InfiniteScroll({ children  } : {children : React.ReactNode}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 18,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0),
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex space-x-10 overflow-hidden items-center"
    >
      {children}
      {children} {/* doubled for looping */}
    </div>
  );
}
