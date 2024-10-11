import React from 'react';

const ProgressBar = ({ score, maxScore, color, icon,Class}) => {
  var percentage = (score / maxScore)*100;
  return (
    <div className={`flex justify-end bg-[#f0f0f0] rounded-full overflow-hidden italic ${Class}`}>
      <div
        className="relative h-10 rounded-full flex items-center text-black font-bold px-4 justify-between  "
        style={{ backgroundColor: color ,width:`${percentage}%`, flexDirection:"inherit"}}
      >
        <span className="text-sm sm:text-base md:text-lg lg:text-xl min-w-fit">
          {score}/{maxScore}
        </span>
        <div className="bg-black rounded-full w-8 h-8  overflow-hidden mr-2 md:mr-4 ">
          <img src={icon} alt="icon" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
