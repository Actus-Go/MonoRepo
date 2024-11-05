import CouponView from "./CouponView";
import MarketView from "./MarketView";
import { AiOutlineClose } from "react-icons/ai";

export default function BrandSideBar({ brand, product, handleExit ,setOpenClosePopup}) {
  return (
    <div
      className={`flex flex-col justify-start items-center z-[999999999999] h-screen bg-black max-w-[450px] w-full fixed top-0 right-0 overflow-hidden overflow-y-auto transition-all ${
        product || brand ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={handleExit}
        className="rounded-full bg-white bg-opacity-50 hover:bg-opacity-25 z-10 active:scale-95 scale-100 transition-all p-2 top-2 left-2 fixed backdrop-blur-sm"
      >
        <AiOutlineClose size={20} color="black" />
      </button>

      {product ? <CouponView {...product} setOpenClosePopup={setOpenClosePopup} /> : <MarketView {...brand} />}
    </div>
  );
}
