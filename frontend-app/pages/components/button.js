import React from "react";

const Button = ({ children, className = "", onClick, variant = "default" }) => {
  const baseStyles = "px-4 py-2 rounded text-white font-semibold";
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600",
    ghost: "bg-transparent text-blue-500 hover:bg-yellow-400",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
