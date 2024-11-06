import { BiSolidCoupon } from "react-icons/bi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "../Buttons";
import { useUser } from "../../customHooks/UserHook";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import useSocket from '../../socket';
import PropTypes from 'prop-types';

// Fetch brands from the API and redirect to Stripe payment link if available
const buyProduct = async (productId, token) => {
  try {
    console.log(productId);

    const response = await axios.post(
      `${process.env.REACT_APP_MARKET_BACKEND_URL}/api/payment/pay-for-product`,
      {
        id: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { url } = response.data; // assuming the payment link is returned as `paymentUrl`

    if (url) {
      window.location.href = url; // Redirect to Stripe payment link
    } else {
      console.error("No payment link found in the response.");
    }

    return response.data.brands;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

export default function CouponView({ _id, name, description, productCoupon ,setOpenClosePopup}) {
  const [quantity, setQuantity] = useState(1);
  const user = useUser();
  const socket = useSocket();

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };
  const handleSplit = ()=>{
    console.log('spliting',socket.connected);
    socket.emit('split',{id: _id, numOfSplit:quantity});
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleShare = useCallback(() => {
    setOpenClosePopup(true);
    if (socket) {
      socket.emit('share', { productId: _id });
      socket.on('share', (data) => {
        console.log("share", data);
      });
    } else {
      console.error('Socket is not initialized');
    }
  }, [socket, _id]);

  useEffect(() => {
    if (socket) {
      if (!socket.connected) {
        socket.connect(); // Manually connect the socket
      }

      socket.on('share', (data) => {
        console.log('Share event received:', data);
        // Handle the share event data as needed
      });

      // Cleanup on unmount
      return () => {
        socket.off('share');
      };
    }
    return () => {
      setOpenClosePopup(false);
    }
  }, [socket]);

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
          className={"font-semibold w-full py-2 h-auto !rounded-full !text-2xl"}
          label={"Buy"}
          onClick={async () => {
            if (user && user.token) {
              await buyProduct(_id, user.token);
            } else {
              console.error("User is not authenticated");
            }
          }}
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
              <span className="font-semibold text-2xl">
                {zeroLeading(quantity)}
              </span>
              <button onClick={handleSubtract}>
                <AiOutlineMinusCircle size={24} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              className={"font-semibold w-full py-2 h-auto !rounded-full !text-2xl"}
              label={"Split"}
              onClick={handleSplit}
            />
            <Button
              className={"font-semibold w-full py-2 h-auto !rounded-full !text-2xl"}
              label={"Share"}
              onClick={handleShare}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

CouponView.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired,
  productCoupon: PropTypes.shape({
    discount: PropTypes.number.isRequired
  }).isRequired
};
