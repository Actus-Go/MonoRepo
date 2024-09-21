export default function LogoSlider({ logos }) {
    return (
        <div>
            {logos.map((logo) => (
                <div>
                    {logo}
                </div>
            ))}
        </div>
    )
}
