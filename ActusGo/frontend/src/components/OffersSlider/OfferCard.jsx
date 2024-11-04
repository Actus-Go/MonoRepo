// OfferCard.js
import React from "react";
import PropTypes from "prop-types";
import Button, { ButtonVariants } from "../Buttons/Button";

const OfferCard = ({ title, content, buy, details }) => {
  const layoutClass =
    content.length === 1
      ? "grid-cols-1"
      : content.length === 2
      ? "grid-rows-2"
      : content.length === 3
      ? "grid-rows-[auto,auto] grid-cols-2"
      : "grid-cols-2 grid-rows-2";

  return (
    <div className="bg-[#222222] text-white p-4 flex flex-col gap-4 max-w-[500px] text-start rounded-2xl shadow-lg h-full w-full min-w-[300px]">
      <h3 className="text-lg font-semibold w-full">{title}</h3>
      <div className={`grid ${layoutClass} gap-2 w-full min-h-[296px] h-full`}>
        {content.map((Component, index) => (
          <div
            key={index}
            className={`transition-transform transform rounded-lg overflow-hidden ${
              content.length === 3 && index === 2 ? "col-span-2" : "col-span-1"
            }`}
          >
            {Component}
          </div>
        ))}
      </div>

        <div className="h-14 w-full min-w-60">
          <button
            label={"Details"}
            onClick={details}
            className="relative animate-shimmer bg-[linear-gradient(110deg,#7B1FA2,45%,#CE93D8,55%,#7B1FA2)] bg-[length:200%_100%] bg-purple-700 group/buttonComponent cursor-pointer shadow-2xl rounded-full p-px text-white font-bold leading-6 inline-block w-full h-full undefined"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover/buttonComponent:opacity-100 rotate-180"></span>
            </span>
            <div className="relative flex items-center justify-center h-full w-full z-10 rounded-full py-1 px-4 ring-1 ring-white/10 text-base sm:text-lg md:text-xl">
              <span>Details</span>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] animate-pulse bg-gradient-to-r from-emerald-400/0 to-emerald-400/0 transition-opacity duration-500 group-hover/buttonComponent:opacity-40"></span>
          </button>
        </div>

    </div>
  );
};

OfferCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.element).isRequired,
  buy: PropTypes.func.isRequired,
  details: PropTypes.func.isRequired,
};

export default OfferCard;
