import React from 'react';
import ProgressBar from "./ProgressBar"
import coinImage from './images/coin.png';
import trophyImage from './images/trophy.png';
import leafImage from './images/leaf.png';


const ProgressBars = () => {
  const coinData = [
    { score: 5000, maxScore: 6000, color: '#FFD700', icon: coinImage, Class: 'w-52 sm:w-72 absolute sm:right-0 ' },
    { score: 1500, maxScore: 2000, color: '#FFA500', icon: trophyImage, Class: 'w-48 sm:w-64 absolute sm:right-0 sm:top-12 left-0 sm:flex-row flex-row-reverse' },
    { score: 250, maxScore: 300, color: '#32CD32', icon: leafImage, Class: 'w-48 sm:w-60 absolute sm:right-0 sm:top-24 left-0 top-5 sm:flex-row flex-row-reverse' },
  ];

  return (
    <div className="relative flex min-w-fit flex-col space-y-2 sm:space-y-4  ">
      <div className='flex sm:flex-col items-end flex-row'>
        <ProgressBar key={0} {...coinData[0]} />
        <ProgressBar key={1} {...coinData[1]} />
      </div>
      <div className='flex flex-row-reverse justify-end'>
        <ProgressBar key={2} {...coinData[2]} />
      </div>

    </div>
  );
};

export default ProgressBars;
