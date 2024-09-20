import React from "react";
import classnames from "classnames";

const defaultCategoryStyles = {
  background: "bg-gray-200", // Default background color
  hoverBackground: "hover:bg-gray-300", // Default hover background color
  textColor: "text-gray-800", // Default text color
  hoverTextColor: "hover:text-gray-900", // Default hover text color
};

export default function CategoryList({ onFilterChange, categories }) {
  return (
    <div className="w-full flex flex-wrap">
      {categories.map((category) => {
        const {
          name,
          bg = defaultCategoryStyles.background,
          hoverBg = defaultCategoryStyles.hoverBackground,
          text = defaultCategoryStyles.textColor,
          hoverText = defaultCategoryStyles.hoverTextColor,
          icon
        } = category;

        return (
          <button
            key={name}
            onClick={() => onFilterChange(name)}
            className={classnames(
              "py-2 px-4 w-max rounded-full border border-current flex items-center justify-center transition-colors",
              bg,
              hoverBg,
              text,
              hoverText
            )}
          >
            {icon}
            <span className="ml-2">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
