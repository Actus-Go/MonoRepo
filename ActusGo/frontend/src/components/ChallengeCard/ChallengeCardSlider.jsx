import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Style/SwiperStyle.css';
import ChallengeCard from './ChallengeCard';

export default function ChallengeCardSlider({ challenges }) {
    const [favoriteStatus, setFavoriteStatus] = useState(challenges.map(() => false));

    const handleToggleFavorite = (index) => {
        setFavoriteStatus((prevStatus) =>
            prevStatus.map((status, i) => (i === index ? !status : status))
        );
    };

    return (
        <div className="w-full h-[500px]">
            <Swiper slidesPerView="auto" spaceBetween={30} className="mySwiper">
                {challenges.map((challenge, index) => (
                    <SwiperSlide key={index} className="bg-transparent">
                        <ChallengeCard  
                            {...challenge}
                            isFavorite={favoriteStatus[index]}
                            onToggleFavorite={() => handleToggleFavorite(index)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
