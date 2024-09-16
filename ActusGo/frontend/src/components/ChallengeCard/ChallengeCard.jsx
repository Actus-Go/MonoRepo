import coinIcon from './Images/CoinIcon.png';
import { Heart, HeartOutline } from '../../icons';

export default function ChallengeCard({
    textColor,
    cardColor,
    title,
    stopsCount,
    level,
    coinsCount,
    isFavorite,
    price,
    onToggleFavorite,
    imageSrc,
    isItalic,
}) {
    const chipStyle = {
        padding: '1px',
        borderRadius: '50px',
        backgroundColor: textColor,
        color: cardColor,
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '18px',
    };

    return (
        <div
            className={`relative w-full p-4 rounded-2xl h-full flex flex-col justify-between text-start ${isItalic ? 'italic font-normal' : 'font-bold'}`}
            style={{
                backgroundColor: cardColor,
                color: textColor,
            }}
        >
            {/* Header Section */}
            <div className="w-full flex justify-between items-start z-10">
                <span className="max-w-32 text-2xl">{title}</span>
                <button
                    className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20"
                    style={{
                        color: isFavorite ? 'red' : textColor,
                        backgroundColor: isFavorite ? textColor : 'transparent',
                    }}
                    onClick={onToggleFavorite}
                    aria-label="Toggle Favorite"
                >
                    <span className="w-6 aspect-square inline-block">
                        {isFavorite ? <Heart /> : <HeartOutline />}
                    </span>
                </button>
            </div>

            {/* Price Section */}
            <div className="text-5xl w-full text-start font-semibold italic z-10">{price}$</div>

            {/* Card Info Section */}
            <div className="w-full flex gap-2 text-[15px] z-10" style={{ color: cardColor }}>
                <div className="flex justify-center items-center" style={chipStyle}>
                    <img src={coinIcon} className="w-5 aspect-square" alt="coin icon" />
                    {coinsCount}
                </div>
                <div style={chipStyle}>{stopsCount} Stops</div>
                <div style={chipStyle}>{level}</div>
            </div>

            {/* Image Section */}
            <div className="flex justify-end items-end w-[80%] h-full absolute right-0 bottom-0 z-0">
                <img src={imageSrc} alt="Challenge" className="object-contain max-w-full max-h-full" />
            </div>
        </div>
    );
}
