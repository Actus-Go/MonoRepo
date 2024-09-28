import React from "react";
import OffersWrapper from "./OffersWrapper";

const handleBuy1 = () => alert("Buy Offer 1");
const handleDetails1 = () => alert("Details of Offer 1");

const handleBuy2 = () => alert("Buy Offer 2");
const handleDetails2 = () => alert("Details of Offer 2");

const offersData = [
  {
    title: "Weekend Package",
    content: [
      <img
        className="w-11/12 h-32 mx-auto md:h-40 object-fill rounded-md"
        src="./assets/oofer1.jpg"
        alt="Hamburger Offer"
      />,
      <img
        className="w-11/12 mx-auto h-32 md:h-40 object-fill rounded-md"
        src="./assets/offer2.jpg"
        alt="Electronics Offer"
      />,
    ],
    buy: handleBuy1,
    details: handleDetails1,
  },
  {
    title: "Mega Challenge",
    content: [
      <div className="grid grid-cols-2 ">
        <img
          className="w-11/12 mx-auto h-32 md:h-40 object-fill rounded-md"
          src="./assets/offer3.jpg"
          alt="Soccer Offer"
        />
        <img
          className="w-11/12 mx-auto h-32 md:h-40 object-fill rounded-md"
          src="./assets/offer4.jpg"
          alt="Recharge Offer"
        />
      </div>,
      <div className="grid grid-cols-2">
        <img
          className="w-11/12 mx-auto h-32 md:h-40 object-fill rounded-md"
          src="./assets/offer3.jpg"
          alt="Soccer Offer"
        />
        <img
          className="w-11/12 mx-auto h-32 md:h-40 object-fill rounded-md"
          src="./assets/offer4.jpg"
          alt="Recharge Offer"
        />
      </div>,
    ],
    buy: handleBuy2,
    details: handleDetails2,
  },
];

const OffersSliderCommponent = () => {
  return (
    <div className="p-8 bg-black min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">Offers</h2>
      <OffersWrapper offers={offersData} />
    </div>
  );
};

export default Projects;
