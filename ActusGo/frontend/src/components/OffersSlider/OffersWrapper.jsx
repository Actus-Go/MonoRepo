// OffersWrapper.js
import React from 'react';
import OfferCard from './OfferCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OffersWrapper = ({ offers }) => {
  const settings = {
    speed: 500,
    slidesToShow: 2, // Default number of slides to show for larger screens
    slidesToScroll: 1,
    Infinity:true,
    dots: false,
    arrows:false,

    infinite: false, // Disable infinite loop
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller screens
        settings: {
          slidesToShow: 2, // 2 items for medium screens
          slidesToScroll: 1,

        },
      },
      {
        breakpoint: 768, // Mobile screens
        settings: {
          arrows:true,
          
          slidesToShow: 1, // 1 item for small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="offers-wrapper">
      <Slider {...settings}>
        {offers.map((offer, index) => (
          <div key={index} className="grid grid-cols-2 px-2"> 
            <OfferCard 
              title={offer.title}
              content={offer.content}
              buy={offer.buy}
              details={offer.details}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OffersWrapper;
