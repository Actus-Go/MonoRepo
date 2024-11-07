/* eslint-disable react/prop-types */
import { ShoppingCart } from "lucide-react";

// eslint-disable-next-line react/prop-types
export default function Card({
  image,
  title,
  price,
  priceSuffix,
  labels,
  onBuy,
}) {
  return (
    <div className=" bg-[#222] text-white rounded-3xl max-w-96 overflow-hidden shadow-lg">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="min-w-full hover:scale-110 transition-all hover:rotate-1 cursor-pointer min-h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-start items-start p-8 pt-10 w-full">
        <div className="flex justify-between w-full items-end">
          <h2 className="text-xl font-bold">{title}</h2>

          <button onClick={onBuy} className="text-white">
            <ShoppingCart color="white" size={36} />
          </button>
        </div>

        <div className="relative mb-2 w-fit -mt-1 font-normal">
          <span className="text-3xl">${price.toFixed(2)}</span>
          <span className="text-base text-white/90 translate-x-full absolute -top-1 -right-6">
            {priceSuffix}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          {labels.map((label, index) => (
            <span
              key={index}
              className="px-2 py-1 hover:scale-[1.01] transition-all hover:bg-amber-50 cursor-pointer font-medium bg-amber-100 text-amber-800 border border-amber-800 rounded-full text-lg"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
