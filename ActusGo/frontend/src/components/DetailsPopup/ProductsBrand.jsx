import React, { memo, useState } from 'react';
import axios from "axios";
import photo from "./2.jpg";

const ProductsBrand = memo(({ product, onMoreDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openShowDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/api/guide/product/${product.id}`);
      if (data.product) {
        onMoreDetails(data.product);
      } else {
        setError('Product details not found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex items-center gap-4 border-[1px] p-2 mb-[.5rem]'>
        <div className='w-[50%] h-full object-cover'>
          <img src={photo} alt="photoProduct" className='w-full h-full object-cover' />
        </div>
        <div>
          <h1 className='text-[.9rem] text-black mb-[.5rem]'>{product.name}</h1>
          <p className='text-[.9rem] text-black mb-[.5rem]'>{product.description}</p>
          <p className='text-[.9rem] text-black mb-[.5rem]'>Price: {product.price}</p>
          <p className='text-[.9rem] text-black mb-[.5rem]'>Quantity: {product.quantity}</p>
        </div>
        <div onClick={openShowDetails} className='text-[.9rem] font-bold text-[#EFFF55] bg-black p-2 rounded-xl mb-[.5rem] cursor-pointer'>
          {isLoading ? 'Loading...' : 'Details'}
        </div>
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
});

export default ProductsBrand;
