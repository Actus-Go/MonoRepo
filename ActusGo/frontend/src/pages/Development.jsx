import Slider from "../components/Slider";

export default function Development() {
    const sliderProps = {
        slides: [
            <img src="https://fresh-cart-swart.vercel.app/assets/grocery-banner-2-BWrZqEBM.jpeg" className="min-w-full object-cover min-h-full" alt="Offer 1" />,
            <img src="https://www.furniture-work.co.uk/media/wysiwyg/content-imagery/price/price_header.jpeg" className="min-w-full object-cover min-h-full" alt="Offer 1" />,
            <img src="https://www.freebie-depot.com/wp-content/uploads/2020/11/Amazon-Deals-2.jpg" className="min-w-full object-cover min-h-full" alt="Offer 1" />
        ]
    };

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <div className="w-full">
                <Slider {...sliderProps} />
            </div>
        </div>
    )
}
