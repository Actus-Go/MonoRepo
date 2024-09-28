import React from 'react';
import MainSlider from './MainSlider';

export default function SliderComponent() {
  const slides = [
    { id: 1, image: <img src="https://fresh-cart-swart.vercel.app/assets/grocery-banner-2-BWrZqEBM.jpeg" className="w-full rounded-2xl h-60 md:h-72" alt="Offer 1" /> },
    { id: 2, image: <img src="https://www.furniture-work.co.uk/media/wysiwyg/content-imagery/price/price_header.jpeg" className="w-full  rounded-2xl h-60 md:h-72" alt="Offer 1" /> },
    { id: 3, image: <img src="https://www.freebie-depot.com/wp-content/uploads/2020/11/Amazon-Deals-2.jpg" className="w-full rounded-2xl h-60 md:h-72" alt="Offer 1" /> },
  ];

  return (
    <div>
      <MainSlider SliderData={slides} />
    </div>
  );
}
