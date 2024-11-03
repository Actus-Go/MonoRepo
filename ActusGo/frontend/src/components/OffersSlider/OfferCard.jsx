// OfferCard.js
import React from 'react';
import PropTypes from 'prop-types';
import Button, { ButtonVariants } from '../Buttons/Button';

const OfferCard = ({ title, content, buy, details }) => {
  const layoutClass = 
    content.length === 1 ? 'grid-cols-1' :
    content.length === 2 ? 'grid-rows-2' :
    content.length === 3 ? 'grid-rows-[auto,auto] grid-cols-2' :
    'grid-cols-2 grid-rows-2';

  return (
    <div className="bg-gray-800 text-white p-4 flex flex-col gap-4 max-w-[500px] text-start rounded-md shadow-lg h-full w-full min-w-[300px]">
      <h3 className="text-lg font-semibold w-full">{title}</h3>
      <div 
        className={`grid ${layoutClass} gap-2 w-full h-full`}
      >
        {content.map((Component, index) => (
          <div
            key={index}
            className={`transition-transform transform rounded-lg overflow-hidden ${
              content.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'
            }`}
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

OfferCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.element).isRequired,
  buy: PropTypes.func.isRequired,
  details: PropTypes.func.isRequired,
};

export default OfferCard;
