"use client"

import gsap from "gsap";
import { Locate, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    const iconsRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const container = iconsRef.current;
  if (!container) return;

  const icons = container.querySelectorAll(".social-icon");

  // Load animation
  gsap.from(icons, {
    opacity: 0,
    y: 20,
    scale: 0.5,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // Hover animation
  const handleMouseEnter = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    gsap.to(target, {
      scale: 1.25,
      rotate: 8,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    gsap.to(target, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  };

  icons.forEach(icon => {
    icon.addEventListener("mouseenter", handleMouseEnter);
    icon.addEventListener("mouseleave", handleMouseLeave);
  });

  return () => {
    icons.forEach(icon => {
      icon.removeEventListener("mouseenter", handleMouseEnter);
      icon.removeEventListener("mouseleave", handleMouseLeave);
    });
  };
}, []);

  return (
    <>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12 lg:px-20 py-8 border-t border-gray-300">
      {/* About Section */}
      <article className="flex flex-col space-y-4 items-start justify-center">
        <header className="font-poppins text-lg font-bold mb-4">
          <h1>About</h1>
        </header>
        <section className="text-gray-600 font-inter font-semibold">
          <p>
            Engineering Tech Builds (ETB) is a student-centered engineering club
            offering training in SolidWorks, embedded systems, and web
            development.
          </p>
          <p>
            We help aspiring engineers learn faster, build better, and grow
            confidently toward their careers.
          </p>
        </section>
      </article>

      {/* Quick Links */}
      <article className="flex flex-col space-y-4 items-start justify-center lg:pl-20">
        <header className="font-poppins text-lg font-bold mb-4">
          <h1>Quick Links</h1>
        </header>
        <section className="text-gray-600 font-inter font-semibold">
          <Link href="/" className="block mb-2 hover:underline">
            Home
          </Link>
          <Link href="#services" className="block mb-2 hover:underline">
            Services
          </Link>
          <Link href="#courses" className="block mb-2 hover:underline">
            Courses
          </Link>
          <Link href="#about" className="block mb-2 hover:underline">
            About Us
          </Link>
          <Link href="contact" className="block mb-2 hover:underline">
            Contact
          </Link>
        </section>
      </article>

      {/* Resources */}
      <article className="flex flex-col space-y-4 items-start justify-center lg:pl-20">
        <header className="font-poppins text-lg font-bold mb-4">
          <h1>Resources</h1>
        </header>
        <section className="text-gray-600 font-inter font-semibold">
          <Link href="#" className="block mb-2 hover:underline">
            SolidWorks Certification Guide
          </Link>
          <Link href="#" className="block mb-2 hover:underline">
            Embedded Systems Projects
          </Link>
          <Link href="#" className="block mb-2 hover:underline">
            Web Development Basics
          </Link>
          <Link href="#" className="block mb-2 hover:underline">
            Career Path & Mentorship
          </Link>
          <Link href="#" className="block mb-2 hover:underline">
            Join the ETB Community
          </Link>
        </section>
      </article>

      {/* Contact Info */}
      <article className="flex flex-col space-y-4 items-start justify-center lg:pl-20 lg:-mt-8 mt-0">
        <header className="font-poppins text-lg font-bold mb-4">
          <h1>Contact Info</h1>
        </header>
        <section className="text-gray-600 font-inter font-semibold space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={20} />
            <a
              href="mailto:techbuildsengineer@gmail.com"
              className="hover:underline"
            >
              techbuildsengineer@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} />
            <a href="tel:+250786015225" className="hover:underline">
              +250 786 015 225
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Locate size={20} className="text-gray-700" />
            <a
              href="https://maps.google.com/?q=Kigali,Rwanda"
              target="_blank"
              className="hover:underline"
            >
              Kigali, Rwanda
            </a>
          </div>
          <div className="flex items-center gap-3 mt-6" ref={iconsRef}>
  {/* social media links */}
  <Link href="https://www.youtube.com/@TechBuildsEngineer" target="_blank">
    <FaYoutube className="social-icon" size={24} />
  </Link>

  <Link href="https://www.facebook.com/TechBuildsEngineer" target="_blank">
    <FaFacebook className="social-icon" size={24} />
  </Link>

  <Link href="https://www.xTwitter.com/TechBuildsEngineer" target="_blank">
    <FaXTwitter className="social-icon" size={24} />
  </Link>

  <Link href="https://www.instagram.com/TechBuildsEngineer" target="_blank">
    <FaInstagram className="social-icon" size={24} />
  </Link>

  <Link href="https://www.linkedin.com/TechBuildsEngineer" target="_blank">
    <FaLinkedin className="social-icon" size={24} />
  </Link>

  <Link href="https://www.github.com/TechBuildsEngineer" target="_blank">
    <FaGithub className="social-icon" size={24} />
  </Link>
</div>

        </section>
      </article>
    </section>
    <section className="inline-block justify-center lg:flex gap-2 border-t items-center lg:items-baseline border-gray-300 px-12 lg:px-20 py-8">
        <h1 className="font-manrope font-extrabold text-3xl">Tech Build E.</h1>
        <p className="font-inter font-medium">&copy;2025 Engineering Tech Builds Club.All Rights Reserved.</p>
    </section>
    </>
  );
};

export default Footer;
