import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from './data';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.title === productId);

  if (!product) {
    return <h2 className="text-center text-2xl font-semibold text-red-500">Product not found</h2>;
  }

  return (
    <div className="container mx-auto p-4 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg mb-2">Rating: {product.rating} ({product.ratingCount})</p>
          <p className="text-2xl font-semibold mb-2">{`$${product.salary}`}</p>
          <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-sm text-gray-600 mb-4">Delivery Fee: {`$${product.deliveryFee}`}</p>
          <p className="mt-4 text-gray-700">{product.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
