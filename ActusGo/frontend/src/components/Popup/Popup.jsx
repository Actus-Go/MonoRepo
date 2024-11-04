import { useEffect, useState } from "react";

export default function Popup({ onClose, content }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 100);
    };

    return (
        <div className={`fixed inset-0 min-w-screen min-h-dvh bg-black/60 transition-opacity flex justify-center items-center ${isVisible ? "opacity-100" : "opacity-30"}`}>
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-10 right-10 w-10 aspect-square bg-white/15 hover:bg-white/90 rounded-full transition-all hover:rotate-360 flex items-center justify-center group"
            >
                <span className="absolute w-4/5 h-1 bg-white group-hover:bg-black rounded-full transition-all group-hover:rotate-45" />
                <span className="absolute w-4/5 h-1 bg-white group-hover:bg-black rounded-full transition-all group-hover:-rotate-45" />
            </button>

            {/* Content Display */}
            <div className={`w-4/5 h-4/5 max-w-screen-xl overflow-auto transition-transform flex justify-center items-center ${isVisible ? "scale-100" : "scale-50"}`}>
                {content}
            </div>
        </div>
    );
}