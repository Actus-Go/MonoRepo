import Star from "../../icons/Star"
import EmptyStar from "../../icons/EmptyStar"
import Cart from "../../icons/Cart"
import Heart from "../../icons/HeartOutline"
import Eye from "../../icons/eye"

const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<EmptyStar key={`empty-${i}`} />);
    }

    return stars;
};
export default function ProductCard({
    title,
    rating,
    ratingCount,
    salary,
    label,
    buy,
    love,
    image,
    see
}) {
    return (
        <div className=" bg-[#232323] w-full h-full rounded-3xl min-h-fit relative cursor-pointer">

            <div className="w-[90%] m-auto h-[60%] relative mt-5">
                <div className="overLay w-full h-full bg-[#0000007e] absolute rounded-3xl flex flex-row justify-center opacity-0 hover:opacity-100 transition-opacity duration-1000">
                <button
                    className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20 bg-white"
                    onClick={love}
                >
                    <span className="w-6 aspect-square inline-block text-black">
                        <Heart/>
                    </span>
                </button>

                <button
                    className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20 bg-white"
                    onClick={buy}
                >
                    <span className="w-6 aspect-square inline-block text-black">
                        <Cart/>
                    </span>
                </button>

                <button
                    className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20 bg-[#6550E1]"
                    onClick={see}
                >
                    <span className="w-6 aspect-square inline-block text-white">
                        <Eye/>
                    </span>
                </button>
                </div>
                <img src={image} alt="ProductImage" className="w-full h-full object-contain" />
            </div>

            <div className="rating flex flex-row w-32 h-5 gap-0 ml-5 my-3">
                <div className="flex flex-row gap-0">
                    {renderStars(rating)}
                </div>
                <span className="text-[13px]">
                    ({ratingCount})
                </span>
            </div>
            <div className="text-[14px] text-left mx-5 h-[20%]">
                <span>
                    {title.length > 40
                        ? title.substring(0, 40) + "..."
                        : title}
                </span>
            </div>
            <div className="text-left text-lg ml-5 py-3 text-[#6550E1] font-semibold">
                <span >{salary}</span>
            </div>
            {
                label &&
                (
                    <div className="label z-1 absolute top-0 m-3 text-[12px] p-1 font-semibold rounded-xl"
                    style={{
                       backgroundColor:  label.bgcolor || "red",
                       color :  label.textcolor || "white"
                   }}>
                      {label.text}
       
                   </div>
                )
            }

        </div>
    )
}
