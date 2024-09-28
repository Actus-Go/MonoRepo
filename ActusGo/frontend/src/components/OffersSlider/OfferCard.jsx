// OfferCard.js
import React from 'react';

const OfferCard = ({ title, content, buy, details }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-lg min-w-sm h-full w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className={` space-y-2`}>
        {content.map((Component, index) => (
          <div
            key={index}
            className="transition-transform transform hover:scale-105"
          >
            {Component}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={buy}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md"
        >
          Buy Now
        </button>
        <button
          onClick={details}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
