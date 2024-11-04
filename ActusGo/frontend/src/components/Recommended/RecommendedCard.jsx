import React from "react";

const RecommendedCard = ({ item }) => {
  return (
    <div className="bg-[#222222] rounded-2xl p-2 shadow-lg text-white relative">
      {item.isHot && (
        <span className="absolute top-2 left-2 bg-red-500 z-50 text-white text-xs px-2 py-1 rounded">
          HOT
        </span>
      )}
      <div className="h-40  overflow-hidden rounded-2xl mb-4">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 duration-300" />
      </div>
      <div className="p-1">
      <h3 className="text-md font-semibold mb-2">{item.title}</h3>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">
          {item.rating} ({item.reviews})
        </span>
      </div>
      <p className="text-purple-400 font-bold">{item.price}</p>
      </div>
    </div>
  );
};

export default RecommendedCard;
