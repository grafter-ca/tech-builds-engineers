"use client";

import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from 'next/image';
import { TeamMembers } from '@/constants';
import { TeamMember } from '@/types';

const About = () => {
const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, y: 40, duration: 1 });

    [metricsRef, missionRef, teamRef].forEach((section, index) => {
      gsap.from(section.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <main className="space-y-24">

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        ref={heroRef}
        className="relative w-full h-[60vh] mt-10 flex items-center justify-center bg-[url('/img/engineering-image.jpeg')] bg-cover bg-center text-white"
      >
        <div className="bg-black/50 p-6 rounded-lg text-center max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-4">We Build Engineers of Tomorrow</h1>
          <p className="text-lg">
            Empowering ambitious learners with CAD, embedded systems & web development skills
            for real-world engineering careers.
          </p>
        </div>
      </section>

      {/* ---------------- MISSION + VISION ---------------- */}
      <section ref={missionRef} className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Mission:</strong> To empower engineering students with hands-on technical skills in
          design, manufacturing, robotics, embedded systems, and digital engineering — enabling them
          to compete confidently in global industries.
        </p>

        <p className="text-gray-700 leading-relaxed">
          <strong>Vision:</strong> Become Rwanda’s leading engineering talent hub, transforming
          students into creators, innovators, and future industry leaders.
        </p>
      </section>

      {/* ---------------- METRICS / ANALYTICS ---------------- */}
      <section ref={metricsRef} className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="p-4">
            <span className="text-4xl font-bold text-blue-600">500+</span>
            <p className="text-gray-700 mt-2">Students to be Trained 2025-2030</p>
          </div>

          <div className="p-4">
            <span className="text-4xl font-bold text-blue-600">120k+</span>
            <p className="text-gray-700 mt-2">Hours of Instruction</p>
          </div>

          <div className="p-4">
            <span className="text-4xl font-bold text-blue-600">95%+</span>
            <p className="text-gray-700 mt-2">Project Success & Skill Growth</p>
          </div>

        </div>
      </section>

      {/* ---------------- WHY ENGINEERING SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl font-bold">
          Why Learn Engineering & Design Today?
        </h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-2 leading-relaxed">
          <li>Engineering drives the world — from manufacturing to robotics.</li>
          <li>Rwanda is rapidly moving toward Industry 4.0 and digital fabrication.</li>
          <li>Companies now require engineers who can design, model, and prototype.</li>
          <li>Learning CAD & embedded systems gives you global job opportunities.</li>
        </ul>

       {/* ------------ Videos ------------ */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

  {/* World Tech */}
  <div className="aspect-video">
    <iframe
      src="https://www.youtube.com/embed/SzMiJFOa6w8?start=11"
      title="Global Engineering & Technology Progress"
      className="w-full h-full rounded-lg"
      allowFullScreen
    ></iframe>
  </div>

  {/* Rwanda Industry */}
  <div className="aspect-video">
    <iframe
      src="https://www.youtube.com/embed/UnSeZdIDz0Q"
      title="Rwanda Industrial & Technology Growth"
      className="w-full h-full rounded-lg"
      allowFullScreen
    ></iframe>
  </div>

  {/* Why SolidWorks */}
  <div className="aspect-video">
    <iframe
      src="https://www.youtube.com/embed/BpbAD37qJqk"
      title="Why Engineering Students Need SolidWorks"
      className="w-full h-full rounded-lg"
      allowFullScreen
    ></iframe>
  </div>

</div>

      </section>

      {/* ---------------- TEAM SECTION ---------------- */}
      <section ref={teamRef} className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl text-center font-bold mb-10">Meet The Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {TeamMembers.map((member :TeamMember) => (
            <div
              key={member.id}
              className="border rounded-xl p-6 text-center hover:shadow-xl transition-all"
            >
              <Image
                src={member.image}
                alt={member.name}
                height={24}
                width={24}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />

              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{member.position}</p>

              <p className="text-gray-700 text-sm leading-relaxed">
                {member.intro}
              </p>

              {/* Social Media */}
              <div className="flex justify-center gap-4 mt-4 text-blue-600">
                {member.socials.linkedin && (
                  <a href={member.socials.linkedin} target="_blank">LinkedIn</a>
                )}
                {member.socials.github && (
                  <a href={member.socials.github} target="_blank">GitHub</a>
                )}
                {member.socials.twitter && (
                  <a href={member.socials.twitter} target="_blank">Twitter</a>
                )}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="bg-blue-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Engineering Future?
        </h2>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
          Join ETB Now
        </button>
      </section>
    </main>
  )
}

export default About