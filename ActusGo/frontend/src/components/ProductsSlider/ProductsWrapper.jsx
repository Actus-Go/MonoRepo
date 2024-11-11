import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./Style/SwiperStyle.module.css";

export default function ProductsWrapper({ products }) {
  return (
    <div className="w-full h-96 bg-black min-h-fit">
      <h1 className="text-2xl font-bold text-white mb-6">Recommended for you</h1>

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20} // Adjusted for better responsiveness on smaller screens
        breakpoints={{
          // Adjust slides per view at different screen widths
          320: {
            slidesPerView: 1, // Mobile screens
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2, // Small tablets
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // Tablets
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4, // Laptops
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 5, // Desktops
            spaceBetween: 55,
          },
        }}
        className={styles.someClassName}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
