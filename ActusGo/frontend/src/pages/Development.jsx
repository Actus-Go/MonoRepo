import { AxeIcon } from "lucide-react";
import CategorySlider from "../components/CategorySlider";

export default function Development() {
    const categorySliderProps = {
        categories: [
            { name: 'Category 1', URL: '/category1', image: <AxeIcon /> },
            { name: 'Category 2', URL: '/category2', image: <AxeIcon /> },
        ]
    };

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <div className="w-fit">
                <CategorySlider {...categorySliderProps} />
            </div>
        </div>
    )
}
