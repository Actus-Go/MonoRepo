
import React, { memo } from 'react';
import photo from "./2.jpg";
import ProductsBrand from './ProductsBrand';

const DetailsPopup = memo(({ brand, product, onMoreDetails }) =>{
  if (!brand ) return null;

  return (
    <div className='absolute top-0 left-0 z-10 w-[300px] h-[100%] bg-white overflow-y-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100 scrollbar-thin  duration-300'>
      {/* Popup content here */}
      <div className='w-full h-[100px] mb-[.5rem]'>
        <img src={photo} alt="photoDetails" className='w-full h-full object-cover' />
      </div>
      <div className='px-[1rem]'>
        <h1 className='text-2xl text-black mb-[.5rem] font-bold'>{brand.name} <span className='text-sm'>({brand.isActive ? "Open" : "Closed"})</span></h1>
        <div className='flex items-center gap-2'>
          <p className='text-[.9rem] text-black mb-[.5rem]'>{brand.description}</p>
          <p className='text-[.9rem] text-black mb-[.5rem] bg-[#EFFF55] w-[70px] font-bold p-2 text-center rounded-xl'>{brand.brandCategory}</p>
        </div>
        <p className='text-[.9rem] mb-[.5rem]'>123 Rainbow Street Jabal Amman Amman 11183 JORDAN</p>
      </div>

      <ProductsBrand product={product} onMoreDetails={onMoreDetails} />
      <ProductsBrand product={product} onMoreDetails={onMoreDetails} />
      <ProductsBrand product={product} onMoreDetails={onMoreDetails} />
      <ProductsBrand product={product} onMoreDetails={onMoreDetails} />
    </div>
  );
});

export default DetailsPopup;
