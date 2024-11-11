import React from 'react';
import { Link } from 'react-router-dom';
import Star from "../../icons/Star";
import EmptyStar from "../../icons/EmptyStar";
import Cart from "../../icons/Cart";
import Heart from "../../icons/HeartOutline";
import Eye from "../../icons/eye";

const renderStars = (rating) => {
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative flex items-center w-[90px] h-[18px] mr-2">
      <div className="absolute top-0 left-0 flex gap-0 w-full h-full overflow-hidden">
        {Array(5).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square h-full">
            <EmptyStar />
          </div>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 flex gap-0 h-full overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        {Array(5).fill(0).map((_, i) => (
          <div key={`full-${i}`} className="aspect-square h-full">
            <Star />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsWrapper = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => (
        <Link to={`/products/${product.id}`} key={index} className="transform transition-transform hover:scale-105">
          <div className="bg-[#232323] w-full rounded-3xl overflow-hidden relative shadow-lg">
            {product.label && (
              <span
                className="absolute top-3 left-3 px-2 h-5 text-[10px] font-semibold rounded-md"
                style={{
                  backgroundColor: product.label.bgcolor || "red",
                  color: product.label.textcolor || "white",
                }}
              >
                {product.label.text}
              </span>
            )}
            <div className="relative h-48 w-full">
              <div className="absolute top-0 left-0 w-full h-full bg-[#0000007e] text-black flex flex-row justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <button className="fav-icon w-11 aspect-square p-2 bg-white rounded-full flex justify-center items-center hover:bg-opacity-70">
                  <Heart />
                </button>
                <button className="fav-icon w-11 aspect-square p-2 bg-white rounded-full flex justify-center items-center hover:bg-opacity-70">
                  <Cart />
                </button>
                <button className="fav-icon w-11 aspect-square p-2 bg-[#6550E1] text-white rounded-full flex justify-center items-center hover:bg-opacity-70">
                  <Eye />
                </button>
              </div>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-400 ml-2">({product.ratingCount})</span>
              </div>
              <p className="text-lg font-semibold text-[#6550E1]">{`$${product.salary}`}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsWrapper;
