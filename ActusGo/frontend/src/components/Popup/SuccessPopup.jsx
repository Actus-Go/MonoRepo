import { useEffect, useState } from "react";
import successImage from "../Images/SuccessCompo.png";

export default function SuccessPopup({ onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const hideTimeout = setTimeout(() => {
            setIsVisible(false);

            const closeTimeout = setTimeout(() => {
                onClose();
            }, 100);

            return () => clearTimeout(closeTimeout);
        }, 3000);

        return () => clearTimeout(hideTimeout);
    }, [onClose]);

    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[316px] h-[300px] bg-[#6E56FC] text-[#FFFFFF] rounded-3xl shadow-lg m-5 transition-transform flex flex-col gap-2 overflow-hidden ${isVisible ? "opacity-100 scale-100" : "opacity-30 scale-50"}`}>
            <img
                src={successImage}
                alt="Success"
                className="w-full"
            />
            <span className="text-[#FFFFFF] inline-block text-center w-full font-semibold">
                Your Post was Successful
            </span>
        </div>
    );
}
