import Star from "../../icons/Star"
import EmptyStar from "../../icons/EmptyStar"
import Cart from "../../icons/Cart"
import Heart from "../../icons/HeartOutline"
import Eye from "../../icons/eye"

const renderStars = (rating) => {
    const percentage = (rating / 10) * 100; // Convert rating to percentage

    return (
        <div className="relative flex items-center w-[90px] h-[18px] mr-2">
            {/* Empty stars */}
            <div className="absolute top-0 left-0 flex justify-start items-start gap-0 w-full h-full overflow-hidden">
                {Array(5).fill(0).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square h-full">
                        <EmptyStar />
                    </div>
                ))}
            </div>

            {/* Full stars based on rating percentage */}
            <div
                className="absolute top-0 left-0 flex justify-start items-start gap-0 h-full overflow-hidden"
                style={{ width: `${percentage}%` }}
            >
                {Array(5).fill(0).map((_, i) => (
                    <div key={`full-${i}`} className="aspect-square h-full">
                        <Star />
                    </div>
                ))}
            </div>
        </div>
    );
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
        <div className=" bg-[#232323] w-full h-full rounded-3xl min-h-fit relative">
            <div className="w-[90%] m-auto h-[60%] relative mt-5">
                <div className="w-full h-full bg-[#0000007e] text-black absolute rounded-3xl flex flex-row justify-center opacity-0 hover:opacity-100 transition-opacity duration-1000">
                    <button
                        id="love"
                        className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center bg-white hover:bg-opacity-70 hover:backdrop-blur-sm"
                        onClick={()=> {love()}}
                    >
                        <span className="w-6 aspect-square inline-block">
                            <Heart />
                        </span>
                    </button>

                    <button
                        className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20 bg-white hover:bg-opacity-70 hover:backdrop-blur-sm"
                        onClick={buy}
                    >
                        <span className="w-6 aspect-square inline-block">
                            <Cart />
                        </span>
                    </button>

                    <button
                        className="fav-icon font-semibold rounded-full w-11 transition-all aspect-square flex justify-center items-center z-20 bg-[#6550E1] hover:bg-opacity-70 hover:backdrop-blur-sm text-white"
                        onClick={see}
                    >
                        <span className="w-6 aspect-square inline-block">
                            <Eye />
                        </span>
                    </button>
                </div>

                <div className="w-full h-full overflow-hidden rounded-3xl">
                    {image}
                </div>  
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
                    <div className="z-1 absolute flex justify-center items-center top-3 left-3 text-[10px] px-2 h-5 font-semibold rounded-md"
                        style={{
                            backgroundColor: label.bgcolor || "red",
                            color: label.textcolor || "white"
                        }}>
                            <span>
                                {label.text}
                            </span>
                    </div>
                )
            }
        </div>
    )
}