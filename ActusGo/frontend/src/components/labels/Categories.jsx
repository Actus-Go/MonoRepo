import React from "react";
import avatar from "./Avatar.png";

const categories = [
  {
    name: "ALL",
    bg: "purple-300",
    hoverBg: "purple-400",
    text: "purple-400",
    hoverText: "purple-800",
  },
  {
    name: "Top Offers",
    bg: "green-200",
    hoverBg: "green-400",
    text: "green-600",
    hoverText: "green-800",
  },
  {
    name: "Food & Beverage",
    bg: "red-200",
    hoverBg: "red-400",
    text: "red-400",
    hoverText: "red-800",
  },
  {
    name: "Fun & Activities",
    bg: "purple-100",
    hoverBg: "purple-400",
    text: "purple-400",
    hoverText: "purple-800",
  },
  {
    name: "Clothing & Accessories",
    bg: "green-200",
    hoverBg: "green-400",
    text: "green-600",
    hoverText: "green-800",
  },
  {
    name: "Health & Beauty",
    bg: "purple-100",
    hoverBg: "purple-200",
    text: "purple-700",
    hoverText: "purple-800",
  },
];

const Categories = () => {
  return (
    <div className="min-w-[320px] max-w-[1024px] flex flex-wrap mx-auto mt-4">
      {categories.map((category) => (
        <button
          key={category.name}
          className={`py-2 px-4 w-max bg-${category.bg} hover:bg-${
            category.hoverBg
          } ${category.text ? `text-${category.text}` : ""} hover:text-${
            category.hoverText ? category.hoverText : "white"
          } rounded-full border border-current flex items-center justify-center transition-colors`}
        >
          <img className="w-6 h-6 rounded-full" src={avatar} alt="" />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
