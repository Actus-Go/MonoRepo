import Slider from "../components/Slider";

export default function Development() {
    const sliderProps = {
        slides: [<div />, <div />, <div />]
    };

    return (
        <div className="w-full h-full min-h-screen text-xl font-bold flex justify-center items-center text-center">
            <div>
                <Slider {...sliderProps} />
            </div>
        </div>
    )
}
