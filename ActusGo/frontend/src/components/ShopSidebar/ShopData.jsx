import ProductImage1 from "./Images/ProductImage1.png";
import ProductImage2 from "./Images/ProductImage2.png";
import ShopImage from "./Images/ShopImage.png";
import ShopSidebar from "./ShopSidebar"; 

// Dummy Data
const Shop = {
    ShopName: "Men's club",
    ShopImage: ShopImage,
    ShopDescription: "Lorem ipsum dolor sit amet consectetur. Nibh eleifend.",
    ShopRating: 4.9,
    City: "Maldives, Africa",
    Products: [
        {
            ProductName: "Nike Shoes", 
            ProductImage: ProductImage1,
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
            Discount: 65
        },
        {
            ProductName: "Hoodie",
            ProductImage: ProductImage2,
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
            Discount: 75
        }
    ]
};

export default function ShopData () {
    return <ShopSidebar Shop={Shop} />;
}

