import ProductCard from "./ProductCard";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Style/SwiperStyle.css';
export default function ProductsWrapper({ products }) {

    const handleLove = () => {
        console.log("Love can't be handeled")
    };
    const handleBuy = () => {
        
    };
    const handleSee = () => {
    
    };
    return (
        <div className="w-full h-96 bg-black min-h-fit">
            <div className="header m-5 text-[#f0f0f0] text-2xl font-semibold">
                <h4>Recommended for you</h4>
            </div>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={55}
                className="mySwiper"
            >
                {products.map((product) => (
                    <SwiperSlide>
                        <ProductCard {...product} 
                         love={() => handleLove()}
                         buy={() => handleBuy()}
                         see={() => handleSee()}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    )
}
