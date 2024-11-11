// BrandSlider.jsx
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  { name: "Netflix", logo: "/images/insta.png" },
  { name: "Panda", logo: "/images/insta.png" },
  { name: "Samsung", logo: "/images/insta.png" },
  { name: "MI", logo: "/images/insta.png" },
  { name: "Levi’s", logo: "/images/insta.png" },
  { name: "Peugeot", logo: "/images/insta.png" },
];

const BrandSlider = () => {
  return (
    <div className="bg-black p-4 w-full">
      <h2 className="text-white mb-4">Brands</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        className="w-full h-full flex justify-start"
      >
        {brands.map((brand, index) => (
          <SwiperSlide className="w-full max-w-[100px]" key={index}>
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-20 h-20 object-contain"
            />
            <p className="text-white mt-2">{brand.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
