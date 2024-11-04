// OffersWrapper.js
import OfferCard from './OfferCard';
import PropTypes from 'prop-types';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function OffersWrapper({ offers }) {
  return (
    <div className="bg-black min-h-dvh w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Offers</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={55}
        className="w-full h-full flex justify-start"
      >
        {offers.map((offer, index) => (
          <SwiperSlide className='w-full max-w-[500px]' key={index}>
            <OfferCard {...offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

OffersWrapper.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
