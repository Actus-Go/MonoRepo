import Slider from "../../components/Slider";
import Categories from "../../components/CategorySlider";
import Offers from "../../components/OffersSlider";
import LogoSlider from "../../components/LogoSlider";
import ProductsSlider from "../../components/ProductsSlider";
import slide1 from "../../assets/Market/Slider/slide1.jpg";
import slide2 from "../../assets/Market/Slider/slide2.png";
import slide3 from "../../assets/Market/Slider/slide3.jpg";

export default function index() {
    const sliderProps = {
        slides: [slide1, slide2, slide3].map((src, index) => (
            <div
                key={index}
                className="w-full flex justify-center items-center h-full overflow-hidden"
            >
                <img
                    src={src}
                    className="min-h-full min-w-full object-cover"
                    alt=""
                />
            </div>
        )),
    };

    const offersProps = {
        offers: [
            {
                title: "test",
                contentImages: [
                    "https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg",
                ],
            },
            {
                title: "Best Offers",
                contentImages: ["/images/stok_1.png", "/images/stok_2.png"],
            },
            {
                title: "Best Offers",
                contentImages: [
                    "/images/stok_1.png",
                    "/images/stok_2.png",
                    "https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg",
                ],
            },
            {
                title: "Best Offers",
                contentImages: [
                    "/images/stok_1.png",
                    "/images/stok_2.png",
                    "https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg",
                    "https://iso.500px.com/wp-content/uploads/2015/10/lohi_cover.jpeg",
                ],
            },
        ].map((offer, index) => ({
            ...offer,
            content: offer.contentImages.map((src, imgIndex) => (
                <div
                    key={imgIndex}
                    className="w-full h-full max-h-[296px] group transition-all rounded-xl overflow-hidden"
                >
                    <img
                        src={src}
                        className="h-36 min-h-full min-w-full object-cover group-hover:scale-105 transition-all"
                        alt=""
                    />
                </div>
            )),
            details: () => console.log("details"),
        })),
    };

    return (
        <div className="w-full md:w-[calc(100%-86px)] md:ml-auto gap-6 mt-10 md:gap-24 flex flex-col p-6 md:p-12 pt-16 bg-black">
            <div className="w-full rounded-3xl overflow-hidden">
                <Slider {...sliderProps} />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full box-border">
                {["/images/stok_1.png", "/images/stok_2.png"].map(
                    (src, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-3xl overflow-hidden cursor-pointer group"
                        >
                            <img
                                src={src}
                                className="group-hover:scale-105 w-full transition-all"
                                alt=""
                            />
                        </div>
                    )
                )}
            </div>

            <Categories />
            <Offers {...offersProps} />
            <LogoSlider />
            <ProductsSlider />
        </div>
    );
}
