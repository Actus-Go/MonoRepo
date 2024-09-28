import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainSlider.css'
export default function MainSlider({ SliderData }) {
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
      <div >
        <ul className="flex transform bottom-9 left-1/2 -translate-x-1/2 absolute opacity-100">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="transition-all duration-300">
        
      </div>
    ),
  };

  return (
    <div className="relative my-3">
      <Slider {...settings}>
        {SliderData.map((slide) => (
          <div key={slide.id} className="w-full ">
            {slide.image}
          </div>
        ))}
      </Slider>
    </div>
  );
}
