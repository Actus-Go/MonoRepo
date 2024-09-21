export default function Slider({ slides }) {
    return (
        <div>
            {slides.map((slide) => (
                <div>
                    {slide}
                </div>
            ))}
        </div>
    )
}
