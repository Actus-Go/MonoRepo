// OffersWrapper.js
import OfferCard from './OfferCard';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function OffersWrapper({ offers }) {
  return (
    <div className="p-8 bg-black min-h-screen w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Offers</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={55}
        className="w-full h-full flex justify-start"
      >
        {offers.map((offer, index) => (
          <SwiperSlide className='w-full max-w-[500px]' key={index}>
            <OfferCard key={index} {...offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

