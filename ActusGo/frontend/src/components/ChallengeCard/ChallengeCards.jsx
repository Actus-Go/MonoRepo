import React, { useState } from 'react';
import { Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Style/SwiperStyle.css';
import ChallengeCard from './ChallengeCard';

const ChallengeCards = ({ Data }) => {
    const [favoriteStatus, setFavoriteStatus] = useState(Data.map(() => false));

    const toggleFavorite = (index) => {
        setFavoriteStatus((prevState) =>
            prevState.map((isFav, i) => (i === index ? !isFav : isFav))
        );
    };
    return (
        <div className="w-[100%] h-[500px] mb-5">
            <Swiper slidesPerView={'auto'} spaceBetween={30} className="mySwiper">
                {Data.map((card, index) => (

                    <SwiperSlide
                        key={index}
                        className='rounded-2xl relative italic'
                        style={{
                            backgroundColor: card.CardColor,
                            color: card.textColor
                        }}
                    >
                        <ChallengeCard
                            card={card}
                            index={index}
                            favoriteStatus={favoriteStatus}
                            toggleFavorite={toggleFavorite}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ChallengeCards;
