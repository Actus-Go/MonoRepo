/* eslint-disable react/prop-types */
import Card from "./Cards";


const ListOfCards = ({ cardsData }) => (
    <div className=" container mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
            <Card key={index} {...card} />
        ))}
    </div>
);

export default ListOfCards;