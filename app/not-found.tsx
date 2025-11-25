"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

export default function NotFound() {
  useEffect(() => {
    gsap.from(".not-title", { opacity: 0, y: -20, duration: 0.6 });
    gsap.from(".not-text", { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
    gsap.from(".not-btn", { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.4 });
  }, []);

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center text-center px-4 bg-gray-50">
      <h1 className="not-title text-7xl font-bold text-blue-600 mb-4">404</h1>

      <p className="not-text text-gray-600 text-lg mb-6 max-w-lg">
        Oops! The page you are looking for doesn't exist or was moved.
      </p>

      <Link
        href="/"
        className="not-btn px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>
    </main>
  );
}
