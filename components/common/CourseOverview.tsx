"use client";

import React from "react";
import { courses } from "@/constants";
import CourseCard from "../ui/CourseCard";
import { RxDoubleArrowRight } from "react-icons/rx";

export default function CoursesOverview() {
  const navigate =  require('next/navigation').useRouter();
  return (
    <section id="courses" className="w-full pb-10 px-6 md:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
        Courses Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {courses.slice(0,3).map((course, index) => (
          <CourseCard key={index} item={course} />
        ))}
      </div>
      <div className="mt-12 flex items-center justify-end gap-2"
      role="button"
        aria-label="View all courses"
        onClick={()=> navigate.push('/courses')}
      >
        <p
        className="text-blue-500 hover:text-blue-600 transition-all block cursor-pointer "
        >
          View All Courses 

        </p>
        <RxDoubleArrowRight size={20} className="animate-pulse cursor-pointer" />
      </div>
    </section>
  );
}
