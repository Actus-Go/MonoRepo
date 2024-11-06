import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';

export default function SliderComponent({ slides }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div>
        <ul className="flex transform bottom-9 left-1/2 -translate-x-1/2 absolute opacity-100">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="transition-all duration-300"></div>
    ),
  };

  return (
    <Slider className="w-full" {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="w-full h-[60vh] flex justify-center overflow-hidden items-center">
          {slide}
        </div>
      ))}
    </Slider>
  );
}

// Adding PropTypes validation
SliderComponent.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
};
