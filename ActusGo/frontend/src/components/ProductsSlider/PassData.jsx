import React from 'react';
import ProductsWrapper from "./ProductsWrapper";
import Image1 from './Images/p1.png';
import Image2 from './Images/p2.png';
  
const products = [
  {
    rating: 5,
    ratingCount: 500,
    title: "Product1 agmal product momken tshroh 7aga keda to7faa",
    salary: "$150",
    label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
    image: Image1,
  },
  {
    rating: 6,
    ratingCount: 200,
    title: "Product 2",
    salary: "$99",
    label: { text: "Limited Offer" },
    image: Image2,
  },
  {
    rating: 8,
    ratingCount: 500,
    title: "Product 1",
    salary: "$150",
    label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
    image: Image1,
  },
  {
    rating: 6,
    ratingCount: 200,
    title: "Product 2",
    salary: "$99",
    label: { text: "Limited Offer" },
    image: Image2,
  },
  {
    rating: 8,
    ratingCount: 500,
    title: "Product 1",
    salary: "$150",
    image: Image1,
  },
  {
    rating: 6,
    ratingCount: 200,
    title: "Product 2",
    salary: "$99",
    label: { text: "Limited Offer" },
    image: Image2,
  },
  {
    rating: 8,
    ratingCount: 500,
    title: "Product 1",
    salary: "$150",
    label: { text: "Best Seller", bgcolor: "#ffd700", textcolor: "#000" },
    image: Image1,
  },
  {
    rating: 6,
    ratingCount: 200,
    title: "Product 2",
    salary: "$99",
    label: { text: "Limited Offer" },
    image: Image2,
  },
  
];

const PassData = () => {
  return <ProductsWrapper products={products} />;
};

export default PassData;
