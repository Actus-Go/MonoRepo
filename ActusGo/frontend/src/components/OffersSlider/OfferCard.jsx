// OfferCard.js
import React from 'react';
import Button, { ButtonVariants } from '../Buttons/Button';

const OfferCard = ({ title, content, buy, details }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex flex-col gap-4 max-w-[500px] text-start rounded-md shadow-lg h-full w-full min-w-[300px]">
      <h3 className="text-lg font-semibold w-full">{title}</h3>
      <div className={`space-y-2 w-full`}>
        {content.map((Component, index) => (
          <div
            key={index}
            className="transition-transform transform"
          >
            {Component}
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full">
        <Button label={"Buy Now"} onClick={buy} className="!w-fit" />
        <Button label={"Details"} onClick={details} variant={ButtonVariants.SECONDARY} className="!w-fit" />
      </div>
    </div>
  );
};

export default OfferCard;
