import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider({ categories }) {
  const settings = {
    speed: 500,
    slidesToShow: 8, // Default number of slides to show for larger screens
    dots: false,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller screens
        settings: {
          slidesToShow: 6, // 4 items for medium screens
        },
      },
      {
        breakpoint: 768, // Mobile screens
        settings: {
          slidesToShow: 4, // 2 items for small screens
        },
      },
    ],
  };

  return (
    <div className="categories-slider-container">
      <Slider {...settings}>
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex justify-center items-center p-4 text-white transition-transform transform hover:scale-105"
            aria-label={`Go to ${category.name} category`}
          >
            <div className="flex flex-col items-center p-2 rounded-full transition">

            <a href={category.URL} >
              {category.image}
              </a>

              <h6 className="mt-2 text-center">{category.name}</h6>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
