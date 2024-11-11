import ListOfCards from "./ListOfCards";


const cardsData = [
    {
      image: "https://placehold.co/600x400",
      title: "Modern Picture",
      price: 15.00,
      priceSuffix: "$15.00",
      labels: ["Label", "Label", "Label"],
      numberOverlay: 5
    },
    {
      image: "https://placehold.co/600x400",
      title: "Another Product",
      price: 20.00,
      priceSuffix: "$20.00",
      labels: ["New", "Featured"],
      numberOverlay: 3
    },
    {
      image: "https://placehold.co/600x400",
      title: "Another Product",
      price: 20.00,
      priceSuffix: "$20.00",
      labels: ["New", "Featured"],
      numberOverlay: 3
    },
    // ... more card data objects
  ];
  
// In your JSX:
function ListOfCardsParent() {
    return <ListOfCards cardsData={cardsData} />
}

export default ListOfCardsParent;