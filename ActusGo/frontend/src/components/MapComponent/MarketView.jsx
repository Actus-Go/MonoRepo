import { AiOutlineShop } from "react-icons/ai";
import { Button } from "../Buttons";
// import { GoLocation, GoStarFill } from "react-icons/go";
import { BiSolidCoupon } from "react-icons/bi";

export default function MarketView({ name, description, products }) {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full bg-gradient-to-tr from-green-500 to-yellow-500 relative h-80 flex justify-center items-center">
        <span className="inline-block">
          <AiOutlineShop size={164} color="white" />
        </span>
        <div className="bg-gradient-to-t from-black to-transparent h-1/2 w-full absolute bottom-0 left-0" />
      </div>

      <div className="flex flex-col gap-8 px-8 text-start justify-start items-start text-slate-200">
        <h1 className="text-4xl text-white font-bold">{name}</h1>
        <p className="text-sm">{description}</p>
        {/* <div className="flex w-full font-semibold justify-between text-sm">
          <div className="flex items-center gap-1">
            <GoLocation size={20} />
            <span>Location</span>
          </div>
          <div className="flex items-center gap-1">
            <GoStarFill color="yellow" size={20} />
            <span>4.1 / 5</span>
          </div>
        </div> */}
      </div>

      {/* Products Section */}
      <div className="flex flex-col gap-6 px-8 py-4">
        {products &&
          products.map(
            (
              { name, description, productCoupon, handleSelectProduct },
              index
            ) => (
              <div
                key={index}
                className="bg-gray-800 w-full rounded-3xl p-4 gap-4 flex flex-col justify-start items-start"
              >
                <div className="w-full bg-gradient-to-tr from-blue-500 to-yellow-500 relative h-40 rounded-2xl flex justify-center items-center">
                  <span className="inline-block">
                    <BiSolidCoupon size={124} color="white" />
                  </span>
                </div>

                <div className="flex w-full justify-between items-center">
                  <h1 className="text-2xl text-white font-bold">{name}</h1>
                  <span className="text-red-400 text-lg font-semibold">
                    {productCoupon.discount}% Off
                  </span>
                </div>

                <p className="text-slate-200">{description}</p>

                <Button
                  onClick={handleSelectProduct}
                  variant="secondary" // Assuming "secondary" is a valid variant in the Button component
                  className="font-semibold py-2 h-auto !rounded-full !text-2xl hover:!bg-blue-600 hover:!border-blue-600"
                  label="Details"
                />
              </div>
            )
          )}
      </div>
    </div>
  );
}
