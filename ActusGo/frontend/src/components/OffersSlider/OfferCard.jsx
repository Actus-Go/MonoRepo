export default function OfferCard({ title, content, buy, details }) {
    return (
        <div>
            <h2>{title}</h2>

            <div>
                {
                    content.map((element) => (
                        <div>
                            {element}
                        </div>
                    ))
                }
            </div>

            <div>
                <button onClick={buy}>Buy</button>
                <button onClick={details}>Details</button>
            </div>
        </div>
    )
}
