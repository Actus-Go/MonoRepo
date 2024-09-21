import { CoinsIcon } from "lucide-react";
import ProductsSlider from "../components/ProductsSlider";

export default function Development() {
    const productsSliderProps = {
        products: [
            {
                rating: 8,
                ratingCount: 572,
                title: "Product 1",
                salary: "$150",
                label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
                buy: () => { console.log('buy 1') },
                love: () => { console.log('love 1') },
                see: () => { console.log('see 1') },
                image: (<CoinsIcon />)
            },
            {
                rating: 5,
                ratingCount: 138,
                title: "Product 2",
                salary: "$99",
                label: { text: "Limited Offer" },
                buy: () => { console.log('buy 2') },
                love: () => { console.log('love 2') },
                see: () => { console.log('see 2') },
                image: (<CoinsIcon />)
            }
        ]
    }

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <ProductsSlider {...productsSliderProps} />
        </div>
    )
}
