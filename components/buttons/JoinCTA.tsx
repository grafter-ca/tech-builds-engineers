"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  type?: "button" | "submit";
}

const Button = ({ 
  label, 
  onClick, 
  variant = "primary", 
  className = "",
  type = "button" 
}: ButtonProps) => {
  
  // Mapping variants to your CSS classes
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full mt-4 ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;