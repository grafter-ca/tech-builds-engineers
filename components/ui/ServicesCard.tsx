import Link from "next/link";
import React from "react";

interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ServicesCard = ({ item }: { item: ServiceItem }) => {
  const Icon = item.icon;
  return (
      <Link
        href={`/services/${item.slug}`}
        className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
      >
        <h3 className="font-semibold mb-4 text-gray-400 px-2 py-1 text-[16px] text-end">{item.title}</h3>
        <Icon className="size-20 text-blue-600 mb-6" />
        <h4 className="font-medium">{item.description}</h4>
        <p className="text-gray-600 mt-2">{item.details}</p>

        <p className="mt-6 text-blue-600 font-medium">Learn More →</p>
      </Link>
  );
};

export default ServicesCard;
