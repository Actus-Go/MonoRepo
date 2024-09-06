/* eslint-disable react/prop-types */
import { ShoppingCart } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const Card = ({ image, title, price, priceSuffix, labels }) => (
    <div className=" bg-black/90 text-yellow-500 rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div className="flex justify-between items-center">
                <div className='flex justify-between items-start'>
                    <span className="text-2xl font-bold">${price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500  ml-4">{priceSuffix}</span>
                </div>
                <button className="bg-yellow-300 text-white p-2 rounded-full">
                    <ShoppingCart color='black' size={20} />
                </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {labels.map((label, index) => (
                    <span key={index} className="px-2 py-1 bg-yellow-900 text-white rounded-full text-sm">
                        {label}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default Card;