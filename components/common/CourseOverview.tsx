"use client";

import React from "react";
import { 
  PiCubeThin,
  PiCubeFill,
  PiCpuThin,
  PiMonitorThin,
  PiCodeThin,
  PiStackSimpleThin
} from "react-icons/pi"; 

const courses = [
  {
    icon: <PiCubeThin size={55} className="text-clsblack" />,
    title: "SolidWorks Beginner Track",
    desc1: "Learn the fundamentals of 3D modeling, sketches, features, and assemblies.",
    desc2: "Perfect for students starting their journey into mechanical design.",
  },
  {
    icon: <PiCubeFill size={55} className="text-black" />,
    title: "SolidWorks Professional Track",
    desc1: "Advanced modeling techniques, design strategies, complex assemblies, and",
    desc2: "exam-focused practice for CSWP certification.",
  },
  {
    icon: <PiCpuThin size={55} className="text-black" />,
    title: "Arduino Starter Track",
    desc1: "Build your first electronic circuits, sensors, and automation projects using Arduino.",
    desc2: "No previous electronics experience needed.",
  },
  {
    icon: <PiMonitorThin size={55} className="text-black" />,
    title: "Embedded Projects",
    desc1: "Hands-on embedded systems projects involving sensors, communication modules,",
    desc2: "and real-world problem-solving. Perfect for project-based learning.",
  },
  {
    icon: <PiCodeThin size={55} className="text-black" />,
    title: "Web Dev Basics for Engineers",
    desc1: "Learn HTML, CSS, JavaScript, and essential web concepts to build simple",
    desc2: "websites and engineering tools. No experience needed.",
  },
  {
    icon: <PiStackSimpleThin size={55} className="text-black" />,
    title: "Engineering Career Path",
    desc1: "Guidance on certifications, portfolios, internships, and career strategies",
    desc2: "to prepare you for the engineering industry.",
  },
];

export default function CoursesOverview() {
  return (
    <section className="w-full pb-20 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
        Courses Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {courses.map((course, index) => (
          <div key={index} className="flex items-start gap-6">
            
            {/* ICON */}
            <div className="min-w-[60px]">{course.icon}</div>

            {/* TEXT */}
            <div>
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">{course.desc1}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{course.desc2}</p>

              {/* Button */}
              <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-800 transition-all"
              >
                Explore
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
