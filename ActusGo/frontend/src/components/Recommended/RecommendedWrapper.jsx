import React from 'react';
import RecommendedCard from './RecommendedCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const recommendedItems = [
  {
    id: 1,
    image: '/images/stok_1.png',
    title: 'iPhone',
    price: '$70',
    rating: 4.5,
    reviews: 738,
    isHot: true,
  },
  {
    id: 2,
    image: '/images/stok_2.png',
    title: 'Smartwatch',
    price: '$70',
    rating: 4.5,
    reviews: 738,
    isHot: false,
  },
  {
    id: 3,
    image: '/images/stok_1.png',
    title: 'Laptop',
    price: '$70',
    rating: 4.5,
    reviews: 738,
    isHot: false,
  },
  {
    id: 4,
    image: '/images/stok_2.png',
    title: 'Washing Machine',
    price: '$70',
    rating: 4.5,
    reviews: 738,
    isHot: true,
  },
];

const RecommendedWrapper = () => {
  return (
    <div className="">
      <h2 className="text-white text-2xl font-bold mb-4">Recommended for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedItems.map((item) => (
          <RecommendedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedWrapper;
