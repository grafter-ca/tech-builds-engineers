"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

function ServicesNotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-6" ref={containerRef}>
      <AlertTriangle size={60} className="text-blue-600 mb-4" />
      <h1 className="text-3xl font-bold font-manrope mb-2">Service Not Found</h1>
      <p className="text-gray-600 text-center max-w-md font-inter mb-6">
        The service you’re looking for is not available or may have been moved.  
      </p>

      <Link
        href="/services"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition"
      >
        Back to Services
      </Link>
    </section>
  );
}

export default ServicesNotFound;
