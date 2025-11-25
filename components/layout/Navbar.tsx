"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // GSAP Animation on load
  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // GSAP mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        ref={navRef}
        className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-8 md:px-12 py-6 flex justify-between items-center"
      >
        {/* Logo */}
       <Link href={"/"}>
        <h1 className="font-manrope font-extrabold text-3xl">Tech Build E.</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-inter text-gray-700">
          <Link href="/">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
          </Link>
          <Link href="#about">
            <li className="hover:text-blue-600 cursor-pointer">About</li>
          </Link>
          <Link href="#courses">
            <li className="hover:text-blue-600 cursor-pointer">Courses</li>
          </Link>
          <Link href="#services">
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
          </Link>
          <Link href="/contact">
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </Link>
        </ul>

        {/* Desktop Button */}
        <button className="hidden md:block bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg font-poppins shadow hover:bg-blue-700 transition">
          Join ETB
        </button>

        {/* Mobile Icon */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          <svg
            className="w-8 h-8 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
<div
  ref={mobileMenuRef}
  className="md:hidden bg-white w-full shadow-md overflow-hidden h-0 opacity-0 fixed top-[72px] left-0 z-40"
>
  <ul className="flex flex-col gap-6 font-inter text-gray-700 p-6">
    <Link href="/">
      <li className="hover:text-blue-600 cursor-pointer">Home</li>
    </Link>
    <Link href="#about">
      <li className="hover:text-blue-600 cursor-pointer">About</li>
    </Link>
    <Link href="#courses">
      <li className="hover:text-blue-600 cursor-pointer">Courses</li>
    </Link>
    <Link href="#services">
      <li className="hover:text-blue-600 cursor-pointer">Services</li>
    </Link>
    <Link href="/contact">
      <li className="hover:text-blue-600 cursor-pointer">Contact</li>
    </Link>

    <button className="bg-blue-500 text-white w-full px-5 py-2 rounded-lg font-poppins shadow hover:bg-blue-700 transition">
      Join ETB
    </button>
  </ul>
</div>

    </>
  );
}
