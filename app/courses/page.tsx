
import React from "react";
import { courses } from "@/constants";
import CourseCard from "@/components/ui/CourseCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CoursesOverview() {
  return (
    <>
    <Navbar />
    <section className="w-full pt-35 px-6 md:px-20 min-h-screen">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
        Our Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {courses.map((course, index) => (
          <CourseCard key={index} item={course} />
        ))}
      </div>
    </section>
    <Footer />
    </>
  );
}
