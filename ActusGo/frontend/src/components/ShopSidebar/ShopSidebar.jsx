import { useState } from 'react';
import XMarkIcon from '../../svg/XMarkIcon';
import LocationIcon from '../../svg/LocationIcon';
import StarIcon from '../../svg/StarIcon';
import Product from './Product'
export default function Sidebar ({ Shop }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-fit h-fit container flex relative" style={{ fontFamily: "Poppins" }} >
      {isOpen && (
        <div
          className='w-[350px] h-screen bg-[#000000] text-white duration-300 absolute left-0 overflow-y-auto'
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <div className="flex justify-end p-4 relative w-full h-52 bg-cover"
            style={{ backgroundImage: `url(${Shop.ShopImage})` }}>
            <div className='absolute flex w-[30px] h-[30px] bg-[#d9d9d9be] rounded-full  justify-center top-0 mt-5'>
              <button
                onClick={toggleSidebar}
                className="text-xl focus:outline-none text-[#000000]"
              >
                <XMarkIcon />
              </button>
            </div>
          </div>

          <div className="shopDetails p-5 text-white w-[95%] justify-center rounded-xl">
            <p className='text-3xl font-semibold mb-3'>{Shop.ShopName}</p>
            <p className='text-[#D9D9D9] text-sm'>{Shop.ShopDescription}</p>
            <div className='flex flex-row mt-3 text-[#D9D9D9] text-sm justify-between' >
              <p className='flex flex-row'>
                <span className='text-[#6E56FC]'>
                  <LocationIcon />
                </span>
                {Shop.City}
              </p>
              <p className='flex flex-row'>
                <span className='text-[#F29900] text-xs'>
                  <StarIcon />
                </span>
                {Shop.ShopRating} Rating
              </p>

            </div>
          </div>

          <div className='products w-full h-full'>
            {Shop.Products.map((product, index) => (
              <div key={index}>
                <Product product={product}/>
              </div>
            ))}
          </div>



        </div>
      )}
    </div>
  );
};

