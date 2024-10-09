import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Style/SwiperStyle.css';
export default function ProductsWrapper({ products }) {
    return (
        <div className="w-full h-96 bg-black min-h-fit">
            <div className="flex justify-start m-5 text-[#f0f0f0] text-2xl font-semibold">
                <h4>Recommended for you</h4>
            </div>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={55}
                className="mySwiper"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard {...product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
