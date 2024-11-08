import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./data";
import Star from "../../icons/Star";
import EmptyStar from "../../icons/EmptyStar";
import Cart from "../../icons/Cart";
import { BsAward } from "react-icons/bs";
import { RiTruckLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(`${product.title} has been added to your cart.`);
  };

  const renderStars = (rating) => {
    const percentage = (rating / 5) * 100;

    return (
      <div className="relative flex items-center w-[90px] h-[18px] mr-2">
        <div className="absolute top-0 left-0 flex gap-0 w-full h-full overflow-hidden">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square h-full">
                <EmptyStar />
              </div>
            ))}
        </div>
        <div
          className="absolute top-0 left-0 flex gap-0 h-full overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={`full-${i}`} className="aspect-square h-full">
                <Star />
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (!product) {
    return (
      <h2 className="text-center text-2xl font-semibold text-red-500">
        Product not found
      </h2>
    );
  }

  const [activeContent, setActiveContent] = useState("description");

  const showDescription = () => setActiveContent("description");
  const showReviews = () => setActiveContent("reviews");

  return (
    <div className="w-full md:w-[calc(100%-86px)] md:ml-auto p-6 md:p-12 pt-24 bg-black">
      <div className="flex pt-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-[40%] h-80 object-cover"
        />
        <div className="p-6 mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">
            {product.title}
          </h1>
          <p className="text-lg flex mb-2 text-white">
            {renderStars(product.rating)}
            {product.rating} Star rating ({product.ratingCount} User Feedback)
          </p>
          <p className="text-2xl font-semibold mb-2 text-white">{`$${product.salary}`}</p>
          <p className=" text-white mb-4">
            Category: <span className="text-lg">{product.category}</span>
          </p>
          <p className=" text-white mb-4">
            Delivery Fee: {`$${product.deliveryFee}`}
          </p>
          <p className="mt-4 text-white">
            {product.description || "No description available."}
          </p>
          <div className="flex gap-3">
            <div className="flex items-center mt-4 bg-[#222222] rounded-xl">
              <button
                onClick={() =>
                  setCart(
                    cart.filter((_, index) => {
                      const itemIndex = cart.findIndex(
                        (i) => i.id === product.id
                      );
                      return index !== itemIndex;
                    })
                  )
                }
                className=" text-white px-4 py-2 rounded-xl hover:bg-[#6550E1]"
              >
                -
              </button>
              <span className="mx-4 text-lg text-white">
                {cart.filter((item) => item.id === product.id).length}
              </span>
              <button
                onClick={() => addToCart(product)}
                className=" text-white px-4 py-2 rounded-xl hover:bg-[#6550E1]"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 border-2 flex bg-[#6550E1] border-[#6E56FC] text-white px-4 py-2 rounded-xl hover:bg-[#6E56FC] duration-300"
            >
              ADD TO CART{" "}
              <span className="fav-icon w-6 aspect-square flex justify-center items-center hover:bg-opacity-70">
                <Cart />
              </span>
            </button>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 border-2 border-[#6E56FC] text-white px-4 py-2 rounded-xl hover:bg-[#6E56FC] duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <hr className="my-10" />

      <div className="text-white w-full flex justify-center gap-10 mb-10">
        <button
          onClick={showDescription}
          className={`py-2 px-6 w-36 ${
            activeContent === "description" ? "bg-[#6E56FC]" : "bg-[#000000]"
          } border-2 border-[#6E56FC] rounded-xl`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={showReviews}
          className={`py-2 px-6 w-36 ${
            activeContent === "reviews" ? "bg-[#6E56FC]" : "bg-[#000000]"
          } border-2 border-[#6E56FC] rounded-xl`}
        >
          REVIEWS
        </button>
      </div>

      {activeContent === "description" && (
        <div className="flex text-white justify-evenly items-start">
          <div className="">
            <h3 className="text-2xl">Product Description</h3>
            <p className="mt-4">
              {product.description || "No description available."}
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl">Product Features</h3>
            <div className="mt-4 ">
              <ul className="flex flex-col gap-6 items-start">
                <li className="flex text-xl"><BsAward className="text-2xl text-[#6E56FC]"/> Free 1 Year Warranty</li>
                <li className="flex text-xl"><RiTruckLine className="text-2xl text-[#6E56FC]"/> Free Shipping & Fasted Delivery</li>
                <li className="flex text-xl"><FaRegHandshake className="text-2xl text-[#6E56FC]"/> 100% Money-back guarantee</li>
                <li className="flex text-xl"><RiCustomerServiceLine className="text-2xl text-[#6E56FC]"/> 24/7 Customer support</li>
                <li className="flex text-xl"><FaRegCreditCard className="text-2xl text-[#6E56FC]"/> Secure payment method</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="text-2xl">Shipping Information</h3>
            <div className="mt-4 ">
              <ul className="flex flex-col gap-6 items-start">
                <li className="flex text-xl">Free 1 Year Warranty</li>
                <li className="flex text-xl">Free Shipping & Fasted Delivery</li>
                <li className="flex text-xl">100% Money-back guarantee</li>
                <li className="flex text-xl">24/7 Customer support</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    {activeContent === "reviews" && (
      <div className="flex flex-col text-white items-center">
        <div className="mb-6 w-full max-w-2xl p-4 border border-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            {renderStars(5)}
            <span className="ml-2 text-lg">5 Stars</span>
          </div>
          <p className="text-lg mb-2">This is a great product! Highly recommend.</p>
          <p className="text-sm text-gray-400">- John Doe</p>
        </div>
        <div className="mb-6 w-full max-w-2xl p-4 border border-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            {renderStars(5)}
            <span className="ml-2 text-lg">5 Stars</span>
          </div>
          <p className="text-lg mb-2">This is a great product! Highly recommend.</p>
          <p className="text-sm text-gray-400">- John Doe</p>
        </div>
        <div className="mb-6 w-full max-w-2xl p-4 border border-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            {renderStars(5)}
            <span className="ml-2 text-lg">5 Stars</span>
          </div>
          <p className="text-lg mb-2">This is a great product! Highly recommend.</p>
          <p className="text-sm text-gray-400">- John Doe</p>
        </div>
        <div className="mb-6 w-full max-w-2xl p-4 border border-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            {renderStars(5)}
            <span className="ml-2 text-lg">5 Stars</span>
          </div>
          <p className="text-lg mb-2">This is a great product! Highly recommend.</p>
          <p className="text-sm text-gray-400">- John Doe</p>
        </div>
      </div>
    )}
    </div>
  );
};

export default ProductDetails;
