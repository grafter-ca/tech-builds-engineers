import React from "react";
import { CourseItem } from "@/types";
import Link from "next/link";

const CourseCard = ({ item }: { item: CourseItem }) => {
  return (
    <Link href={`/courses/${item.slug}`}>
    <div className="flex items-start gap-6">
      {/* ICON */}
      <item.icon className="size-20 text-black mb-6" />
      {/* TEXT */}
      <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-gray-700 text-sm mt-2 leading-relaxed">
          {item.desc1}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">{item.desc2}</p>

        {/* Button */}
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-800 transition-all">
          Explore →
        </button>
      </div>
    </div>
  </Link>
  );
};

export default CourseCard;
