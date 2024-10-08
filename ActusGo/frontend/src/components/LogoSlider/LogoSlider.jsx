import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LogoSlider = ({ logos }) => {
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef(null);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500, // Duration between slides
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Small screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Extra small screens
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      paused ? sliderRef.current.slickPause() : sliderRef.current.slickPlay();
    }
  }, [paused]);

  return (
    <div
      className="w-full overflow-hidden py-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Slider ref={sliderRef} {...settings}>
        {logos.map((logo, index) => (
          <div className="flex justify-center" key={index}>
            {logo}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoSlider;
