import React, { useState, useEffect, useContext, memo } from 'react';
import photo from "./2.jpg";
import axios from "axios";

import {socket} from '../../socket';
import { SharedDataContext } from "../../SharedDataProvider";

const MoreDetailsProduct = memo (({ data, closePopup }) => {
  const [count, setCount] = useState(1);
  const [splitNum, setSplitNum] = useState(1);
  const { setSharedProduct } = useContext(SharedDataContext);

const shareData = (sharedData) => {
    if (sharedData && sharedData.message) {
        console.log('sharedData:', sharedData);
        setSharedProduct(sharedData);
      } else {
        console.error('Shared data does not contain message:', sharedData);
      }
};

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("share", shareData);
    return () => {
      socket.off('share');
    };
  }, []);

//   console.log('User', user?.token);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementSplit = () => {
    setSplitNum(splitNum + 1);
  };

  const decrementSplit = () => {
    if (splitNum > 1) {
        setSplitNum(splitNum - 1);
    }
  };

  const closeTab = () => {
    closePopup();
  };

  const body = {
    id: data._id,
    quantity: count
  };

  const pay = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/payment/pay-for-product", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.log('URL not found in the response');
      }
    } catch (err) {
      console.log('error Pay', err);
    }
  };

  const shareProduct = () => {
    if (socket) {
      socket.emit("share", {
        id: `${data._id}`,
      });
      
    //   console.log('Product ID shared:', data._id);
    } else {
      console.error('Socket is not initialized');
    }
  };
  const splitProduct = () => {
    if (socket) {
      socket.emit("split", {
        id: `${data._id}`,
        numOfSplit: splitNum, 
      });
      
    //   console.log('Product ID shared:', data._id);
    } else {
      console.error('Socket is not initialized');
    }
  };

  return (
    <div className='p-6 bg-black absolute top-0 left-0 bottom-0 w-[300px] z-20 h-[100%] overflow-y-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100 scrollbar-thin'>
      <div className='h-[200px] w-full mb-[1rem]'>
        <img src={photo} alt='imageDetailsProduct' className='w-full h-full object-cover rounded-2xl'/>
      </div>
      <div>
        <div className='flex justify-between items-center sticky top-0'>
          <button onClick={shareProduct} className='w-[150px] bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px] text-center hover:border-[2px] hover:border-[#EFFF55] hover:bg-black hover:text-[#EFFF55] duration-500 mb-[1rem] tracking-[1px]'>
            Share
          </button>
          <button onClick={pay} className='w-[150px] bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px] text-center hover:border-[2px] hover:border-[#EFFF55] hover:bg-black hover:text-[#EFFF55] duration-500 mb-[1rem] tracking-[1px]'>
            Buy
          </button>
        </div>
        <div className='flex justify-between items-center sticky top-0'>
          <button onClick={splitProduct} className='w-[150px] bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px] text-center hover:border-[2px] hover:border-[#EFFF55] hover:bg-black hover:text-[#EFFF55] duration-500 mb-[1rem] tracking-[1px]'>
            Split
          </button>
        </div>
        <div>
            <h2 className='text-white text-xl font-bold mb-[.5rem]'>Number of Split</h2>
            <div className='flex items-center gap-2'>
            <button onClick={decrementSplit} className='bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px]'>-</button>
            <p className='text-white text-lg'>{splitNum}</p>
            <button onClick={incrementSplit} className='bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px]'>+</button>
          </div>
        </div>
        <h2 className='text-white text-lg font-bold mb-[.5rem]'>{data.name}</h2>
        <h2 className='text-[#EFFF55] text-xl font-bold mb-[.5rem]'>{data.productCoupon.couponCategory}</h2>
        <h2 className='text-white text-xl font-bold mb-[.5rem]'>discount : {data.productCoupon.discount}%</h2>
        <h2 className='text-white text-sm font-bold mb-[.5rem]'>{data.created}</h2>
        <h2 className='text-white text-sm mb-[.5rem]'>Code : {data.productCoupon.code}</h2>
        <h2 className='text-white mb-[.5rem]'>Start Time : {data.productCoupon.startTime}</h2>
        <h2 className='text-white mb-[.5rem]'>End Time : {data.productCoupon.endTime}</h2>
        <p className='mb-[1rem] text-white text-lg'>{data.brand.description}</p>
        <h2 className='text-white text-xl font-bold mb-[.5rem]'>Quantity</h2>
        <div className='flex items-center gap-2'>
          <button onClick={decrement} className='bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px]'>-</button>
          <p className='text-white text-lg'>{count}</p>
          <button onClick={increment} className='bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px]'>+</button>
        </div>
        <button onClick={closeTab} className='bg-[#EFFF55] text-black p-2 rounded-2xl font-bold text-[14px] mt-4'>Close</button>
      </div>
    </div>
  );
});

export default MoreDetailsProduct;
