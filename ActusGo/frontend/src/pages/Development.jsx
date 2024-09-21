import { PersonStanding } from "lucide-react";
import LogoSlider from "../components/LogoSlider";

export default function Development() {
    const logoSliderProps = {
        logos: [
            <PersonStanding />,
            <PersonStanding />,
            <PersonStanding />,
            <PersonStanding />,
            <PersonStanding />,
        ]
    };

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <LogoSlider {...logoSliderProps} />
        </div>
    )
}
