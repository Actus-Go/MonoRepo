import OfferCard from './OfferCard';

export default function OffersWrapper({ offers }) {
    return (
        <div>
            {offers.map((offer) => (
                <OfferCard {...offer} />
            ))}
        </div>
    )
}
