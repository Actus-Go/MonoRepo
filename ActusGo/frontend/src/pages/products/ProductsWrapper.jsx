import React from 'react';
import { Link } from 'react-router-dom';

const getStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="text-gray-400">&#9733;</span>);
    }
  }
  return stars;
};

const ProductsWrapper = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => (
        <Link to={`/${product.title}`} key={index} className="transform transition-transform hover:scale-105">
          <div className="border rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
            {product.label && (
              <span className="absolute top-2 left-2 px-2 py-1 text-xs rounded bg-indigo-500 text-white">
                {product.label.text}
              </span>
            )}
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                {getStars(product.rating)}
                <span className="text-sm text-gray-400 ml-2">({product.ratingCount})</span>
              </div>
              <p className="text-lg font-semibold text-indigo-400">{`$${product.salary}`}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsWrapper;
