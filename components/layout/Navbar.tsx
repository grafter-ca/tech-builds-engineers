"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { publicLinks, memberLinks, adminLinks } from "@/constants";
import Button from "../buttons/JoinCTA";

// ───────────────────────────────────────────────
// Auth hook (using your localStorage token)
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsAuthenticated(true);
        setRole(payload.role || "member");
      } catch {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  return { isAuthenticated, role, loading };
};

export default function Navbar() {
  const { isAuthenticated, role, loading } = useAuth();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // GSAP fade-in (no flash)
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }
  }, []);

  // GSAP mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        height: mobileOpen ? "auto" : 0,
        opacity: mobileOpen ? 1 : 0,
        duration: 0.5,
        ease: mobileOpen ? "power2.out" : "power2.in",
      });
    }
  }, [mobileOpen]);

  // Dynamic links
  let links = publicLinks;
  if (isAuthenticated) {
    links = [...memberLinks];
    if (role === "admin" || role === "coordinator") {
      links = [...links, ...adminLinks];
    }
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
    setMobileOpen(false);
  };
  return (
    <>
      {/* Sticky Navbar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-base-200 px-6 md:px-12 py-4 flex justify-between items-center"
      >
        {/* Logo */}
        <Link href="/" className="flex gap-1 flex-col">
          <div className="avatar placeholder">
            <div className="bg-primary text-neutral-content rounded-lg w-12 p-1 flex items-center justify-center">
              <span className="text-xl font-bold text-white">ETB</span>
            </div>
          </div>
          <h1 className="font-extrabold text-xl md:text-2xl text-primary">
            Engineering Tech Builders Club
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-base-content font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
                onClick={link.name === "Logout" ? handleLogout : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA / Logout */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <Link href="/auth/register">
              <Button
                label="Join the Club"
                variant="primary"
              />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden btn btn-ghost btn-circle"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg overflow-hidden h-0 opacity-0 z-40 border-t border-base-200"
      >
        <ul className="flex flex-col p-6 gap-5 text-base-content font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-3 hover:text-primary transition-colors"
                onClick={() => {
                  setMobileOpen(false);
                  if (link.name === "Logout") handleLogout();
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {!isAuthenticated && (
            <Link href="/auth/register">
              <Button
                label="Join the Club"
                variant="secondary"
                onClick={() => setMobileOpen(false)}
                className="bg-blue-600"
              />
            </Link>
          )}
        </ul>
      </div>
      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
}
