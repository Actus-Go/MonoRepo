import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CategoriesSlider({ categories }) {
  return (
    <div className="p-8 bg-black text-start w-full">
      <h2 className="text-2xl font-semibold text-white mb-6">Categories</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={35}
        className="w-full h-full flex justify-start"
      >
        {categories.map(({ url, name, image }, index) => (
          <SwiperSlide className='w-[100px]' key={index}>
            <Link
              to={url}
              className="flex flex-col justify-center items-center text-white transition-transform transform hover:scale-105"
              aria-label={`Go to ${name} category`}
            >
              <div className="flex flex-col border border-slate-600 items-center justify-center p-2 rounded-full overflow-hidden aspect-square transition">
                {image}
              </div>

              <h6 className="text-center">{name}</h6>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

CategoriesSlider.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.node.isRequired
    })
  ).isRequired
};