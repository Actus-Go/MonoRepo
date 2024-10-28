import { BiSolidCoupon } from "react-icons/bi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "../Buttons";
import { useState } from "react";

export default function CouponView({ name, description, productCoupon }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity < 99) setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const zeroLeading = (number) => {
    if (number < 10) return "0" + number;
    return number; 
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-gradient-to-tr from-blue-500 to-yellow-500 relative h-80 flex justify-center items-center">
        <span className="inline-block">
          <BiSolidCoupon size={164} color="white" />
        </span>
        <div className="bg-gradient-to-t from-black to-transparent h-1/2 w-full absolute bottom-0 left-0" />
      </div>

      <div className="w-full px-8 gap-8 flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-4xl text-white font-bold">{name}</h1>
          <span className="text-red-400 text-2xl font-semibold">
            {productCoupon.discount}% Off
          </span>
        </div>

        <p className="text-slate-200">{description}</p>

        <Button
          className={"font-semibold py-2 h-auto !rounded-full !text-2xl"}
          label={"Buy"}
        />

        <div className="bg-gray-800 w-full rounded-3xl p-4 gap-4 flex flex-col justify-start items-start">
          <span className="text-blue-700 text-xs">Game mode</span>
          <h1 className="text-4xl text-white font-bold">
            Share <span className="text-blue-700"> & </span> Split
          </h1>

          <div className="w-full flex justify-between">
            <p className="text-slate-200 w-3/4">
              Number of friends to share or split with.
            </p>

            <div className="flex w-1/2 justify-end text-white">
              <button onClick={handleAdd}>
                <GoPlusCircle size={24} />
              </button>
              <span className="font-semibold text-2xl">{zeroLeading(quantity)}</span>
              <button onClick={handleMinus}>
                <AiOutlineMinusCircle size={24} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              className={"font-semibold py-2 h-auto !rounded-full !text-2xl"}
              label={"Split"}
            />
            <Button
              className={"font-semibold py-2 h-auto !rounded-full !text-2xl"}
              label={"Share"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
