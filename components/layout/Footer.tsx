"use client";

import gsap from "gsap";
import { Locate, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { FooterInformations } from "@/constants";

const Footer = () => {
  const iconsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = iconsRef.current;
    if (!container) return;

    const icons = container.querySelectorAll(".social-icon");

    gsap.from(icons, {
      opacity: 0,
      y: 20,
      scale: 0.5,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    const enter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      gsap.to(t, { scale: 1.25, rotate: 8, duration: 0.3, ease: "power3.out" });
    };

    const leave = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      gsap.to(t, { scale: 1, rotate: 0, duration: 0.3, ease: "power3.inOut" });
    };

    icons.forEach((i) => {
      i.addEventListener("mouseenter", enter);
      i.addEventListener("mouseleave", leave);
    });

    return () => {
      icons.forEach((i) => {
        i.removeEventListener("mouseenter", enter);
        i.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12 lg:px-20 py-8 border-t border-gray-300">
        {/* ABOUT */}
        <article className="flex flex-col space-y-4">
          <h1 className="font-poppins text-lg font-bold">
            {FooterInformations[0].title}
          </h1>
          <div className="text-gray-600 font-inter font-semibold">
            {FooterInformations[0].content?.map((c, i) => (
              <p key={i}>{c}</p>
            ))}
          </div>
        </article>

        {/* QUICK LINKS */}
        <article className="flex flex-col space-y-4 lg:pl-20">
          <h1 className="font-poppins text-lg font-bold">
            {FooterInformations[1].title}
          </h1>
          <div className="text-gray-600 font-inter font-semibold">
            {FooterInformations[1].links?.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="block mb-2 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </article>

        {/* RESOURCES */}
        <article className="flex flex-col space-y-4 lg:pl-20">
          <h1 className="font-poppins text-lg font-bold">
            {FooterInformations[2].title}
          </h1>
          <div className="text-gray-600 font-inter font-semibold">
            {FooterInformations[2].links?.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="block mb-2 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </article>

        {/* CONTACT + SOCIALS */}
        <article className="flex flex-col space-y-4 lg:pl-20">
          <h1 className="font-poppins text-lg font-bold">
            {FooterInformations[3].title}
          </h1>

          <div className="text-gray-600 font-inter font-semibold space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail size={20} />
              <a
                href={`mailto:${FooterInformations[3].contact?.email}`}
                className="hover:underline"
              >
                {FooterInformations[3].contact?.email}
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <a
                href={`tel:${FooterInformations[3].contact?.phone}`}
                className="hover:underline"
              >
                {FooterInformations[3].contact?.phone}
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <Locate size={20} />
              <span>{FooterInformations[3].contact?.location}</span>
            </div>

            {/* Social Media */}
            <div ref={iconsRef} className="flex items-center gap-4 mt-6">
              {FooterInformations[3].socials?.map((social, i) => {
                const IconComponent = social.icon as React.ComponentType<
                  React.SVGProps<SVGSVGElement> & { size?: number }
                >;
                return (
                  <Link
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <IconComponent
                      className="social-icon text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                      size={24}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </article>
      </section>

      {/* COPYRIGHT */}
      <section className="inline-block lg:flex lg:space-x-2 space-y-2 border-t border-gray-300 px-12 lg:px-20 py-8">
        <Link href="/">
          <h1 className="font-manrope font-extrabold text-3xl">
            Tech Build E.
          </h1>
        </Link>
        <p className="font-inter font-medium">
          &copy;2025 Engineering Tech Builds Club. All Rights Reserved.
        </p>
      </section>
    </>
  );
};

export default Footer;
