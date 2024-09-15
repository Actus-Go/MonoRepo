import React from 'react';
import image3 from './Images/CoinIcon.png';
import { Heart, HeartOutline } from '../../icons';


const ChallengeCard = ({ card, index, favoriteStatus, toggleFavorite }) => {
    const baseStyle = {
        padding: '5px 10px',
        borderRadius: '50px',
        backgroundColor: card.textColor,
    };
    return (
        <>
            <div className='w-full flex flex-row justify-between p-4 absolute top-0'>
                <div className='w-[120px] header text-2xl'>
                    <p>{card.text}</p>
                </div>
                <div
                    className='fav-icon mr-2 mt-2 font-semibold rounded-full w-fit h-fit p-[5px]'
                    style={{
                        color: favoriteStatus[index] ? 'red' : card.textColor,
                        backgroundColor: favoriteStatus[index] ? card.textColor : 'transparent',
                    }}
                    onClick={() => toggleFavorite(index)}
                >
                    <span className='w-6 aspect-square inline-block'>
                        {favoriteStatus[index] ? (<Heart />) : (<HeartOutline />)}
                    </span>
                </div>
            </div>

            <div className='text-5xl relative mr-11'>
                <p className='absolute'>{card.price}$</p>
            </div>

            <div className='w-full flex flex-row justify-between absolute bottom-0 p-10 pb-5 text-[15px]'
                style={{
                    color: card.CardColor
                }}
            >
                <p className='flex flex-row' style={baseStyle}>
                    <img src={image3} style={{ width: "20px", height: "20px", margin: "1px" }} alt="coin icon" />
                    {card.coins}
                </p>
                <p style={baseStyle}>{card.stops} Stops</p>
                <p style={baseStyle}>{card.level}</p>
            </div>

            <div className='flex justify-end items-end w-[80%] h-full'>
                <img
                    src={card.image}
                    alt="img"
                    className="object-contain max-w-[90%] max-h-[90%]"
                />
            </div>
        </>
    );
};

export default ChallengeCard;
