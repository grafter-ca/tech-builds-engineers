"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BookX } from "lucide-react";
import Link from "next/link";

 function CoursesNotFound() {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6" ref={contentRef}>
      <BookX size={60} className="text-blue-600 mb-4" />
      <h1 className="text-3xl font-bold font-manrope mb-2">Course Not Found</h1>
      <p className="text-gray-600 text-center max-w-md font-inter mb-6">
        We couldn’t find the course you are looking for. It may be unavailable or removed.
      </p>

      <Link
        href="/courses"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition"
      >
        Back to Courses
      </Link>
    </section>
  );
}

export default CoursesNotFound;
