export default function ProductCard({
    title,
    rating,
    ratingCount,
    salary,
    label,
    buy,
    love,
    image,
    see
}) {
    return (
        <div>
            <span>{title}</span>
            <span>{image}</span>
            <div>
                <button className="" onClick={buy}>Buy</button>
                <button className="" onClick={love}>Love</button>
                <button className="" onClick={see}>See</button>
            </div>
            <div>
                {label.text}
                {label.bgcolor}
                {label.textcolor}
            </div>
            <span>{rating}</span>
            <span>{ratingCount}</span>
            <span>{salary}</span>
        </div>
    )
}
