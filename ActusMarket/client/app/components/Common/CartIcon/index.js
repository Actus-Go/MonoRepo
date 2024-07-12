import React, { useRef, useState } from 'react';
import Lottie from 'react-lottie';
import BagIcon from '../../../lottie/lottieflow-ecommerce-14-1-ffffff-easey.json';
import Button from '../Button';

const CartIcon = props => {
  const { className, onClick, cartItems } = props;
  const animationRef = useRef(null);
  const [play, setPlay] = useState(false);

  const handleMouseEnter = () => {
    setPlay(true);
  };

  const handleMouseLeave = () => {
    setPlay(false);
  };

  const Icon = (
    <span
      className='cart-icon'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Lottie
        options={{
          animationData: BagIcon
        }}
        isStopped={!play}
        ref={animationRef}
      />
    </span>
  );

  const items = cartItems.length;

  return (
    <Button
      borderless
      variant='empty'
      className={className}
      ariaLabel={
        items > 0 ? `your cart have ${items} items` : 'your cart is empty'
      }
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default CartIcon;
