import Categories from "../components/labels/Categories";
import { Coins } from "lucide-react";

export default function Development() {
    const categories = [
        {
            name: "ALL",
            bg: "bg-purple-300",
            hoverBg: "hover:bg-purple-400",
            text: "text-purple-400",
            hoverText: "hover:text-purple-800",
            icon: (<Coins size={20} />)
        },
        {
            name: "Top Offers",
            bg: "bg-green-200",
            hoverBg: "hover:bg-green-400",
            text: "text-green-600",
            hoverText: "hover:text-green-800",
            icon: (<Coins size={20} />)
        },
        {
            name: "Food & Beverage",
            bg: "bg-red-200",
            hoverBg: "hover:bg-red-400",
            text: "text-red-400",
            hoverText: "hover:text-red-800",
            icon: (<Coins size={20} />)
        },
        {
            name: "Fun & Activities",
            bg: "bg-purple-100",
            hoverBg: "hover:bg-purple-400",
            text: "text-purple-400",
            hoverText: "hover:text-purple-800",
            icon: (<Coins size={20} />)
        },
        {
            name: "Clothing & Accessories",
            bg: "bg-green-200",
            hoverBg: "hover:bg-green-400",
            text: "text-green-600",
            hoverText: "hover:text-green-800",
            icon: (<Coins size={20} />)
        },
        {
            name: "Health & Beauty",
            bg: "bg-purple-100",
            hoverBg: "hover:bg-purple-200",
            text: "text-purple-700",
            hoverText: "hover:text-purple-800",
            icon: (<Coins size={20} />)
        },
    ];

    const onFilterChange = (filter) => {
        console.log(filter);
    };

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <div className="w-fit">
                <Categories categories={categories} onFilterChange={(filter) => onFilterChange(filter)} />
            </div>
        </div>
    )
}
