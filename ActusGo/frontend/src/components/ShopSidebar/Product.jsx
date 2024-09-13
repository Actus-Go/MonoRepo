import React, { useState } from 'react';
import XMarkIcon from '../../svg/XMarkIcon';

export default  function Product  ({ product })  {
    const [modalState, setIsModalOpen] = useState(false);
    const [showBuyNow, setShowBuyNow] = useState(false);
    const [count, setCount] = useState(1);

    const handleModel = () => {
        setIsModalOpen(!modalState);
    };
    const handleDetailsClick = () => {
        setShowBuyNow(!showBuyNow);
    };
    const increaseCount = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    };

    return (
        <>
            <div className='w-[90%] m-auto bg-[#232323] h-auto rounded-3xl mb-5 mt-5 p-3'>
                <div
                    className='h-36 bg-cover rounded-3xl cursor-pointer'
                    style={{ backgroundImage: `url(${product.ProductImage})` }}
                    onClick={handleModel}
                ></div>

                <div className='flex flex-row justify-between m-3 font-semibold text-lg'>
                    <p>{product.ProductName}</p>
                    <p className='text-[#FA686B]'>{product.Discount}% off</p>
                </div>
                <div className='m-3'>
                    <p className='text-[#D9D9D9] text-sm'>{product.Description}</p>
                </div>

                <div
                    className={`flex justify-center m-auto w-[95%] border-[1px] rounded-full h-10 mt-10 cursor-pointer duration-300 ${showBuyNow ? 'bg-[#6E56FC] text-white border-none hover:bg-[#6f56fc79]' : 'hover:bg-[#dfd9d9af]'
                        }`}
                    onClick={handleDetailsClick}
                >
                    <button>{showBuyNow ? 'Buy now' : 'Details'}</button>
                </div>
                {modalState && (
                    <div
                        className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50'
                        onClick={handleModel}
                    >
                        <div
                            className='relative'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={product.ProductImage} alt={product.ProductName} className='max-w-full max-h-full rounded-xl' />
                            <button
                                className='absolute top-2 right-7 text-white text-2xl rounded-full p-1 cursor-pointer'
                                onClick={handleModel}
                            ><XMarkIcon /></button>
                        </div>
                    </div>
                )}
            </div>

            {showBuyNow && (
                <div className='w-[90%] m-auto bg-[#232323] h-auto rounded-3xl mb-5 mt-5 p-3'>
                    <p className='text-xs text-[#6E56FC] p-1'>Game mode</p>
                    <p className='text-2xl'>Share <span className='text-[#6E56FC]'>&</span> Split</p>
                    <div className='flex flex-row justify-between text-sm mt-5'>
                        <p className='flex-grow'>Number of friends you want to share or split with.</p>
                        <div className='flex text-lg text-white'>
                            <button
                                className='bg-transparent border-2 border-[#003E5C] rounded-full w-7 h-7 flex items-center justify-center'
                                onClick={decreaseCount}
                            >
                                -
                            </button>
                            <span className='text-[#D9D9D9] w-5'>{count.toString().padStart(2, '0')}</span>
                            <button
                                className='bg-transparent border-2 border-[#003E5C] rounded-full w-7 h-7 flex items-center justify-center'
                                onClick={increaseCount}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between my-5 '>
                    <button className='bg-[#6E56FC] text-white py-2 px-10 rounded-full hover:bg-[#6f56fc79] duration-300'>
                       Split
                    </button>
                    <button className='bg-[#6E56FC] text-white py-2 px-10 rounded-full hover:bg-[#6f56fc79] duration-300'>
                        Share
                    </button>
                    </div>
                </div>
            )}
        </>
    );
};


