import React from "react";
import "./Sparkels.css";

const Sparkels = () => {
  let color = "#efff55";
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100px"
      height="100px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        className="star"
        fill={color}
        d="M147,147c-25.5,0-25.787,26.359-25.787,26.359C121.213,150.438,96,147,96,147 c25.787,0,25.213-26.359,25.213-26.359C121.213,147,147,147,147,147z"
      />
      <path
        className="star1"
        fill={color}
        d="M229,112c-12.5,0-12.641,12.921-12.641,12.921C216.359,113.685,204,112,204,112 c12.641,0,12.359-12.921,12.359-12.921C216.359,112,229,112,229,112z"
      />
      <path
        className="star2"
        fill={color}
        d="M189.413,84c-36.913,0-37.328,38.157-37.328,38.157c0-33.181-36.498-38.157-36.498-38.157 c37.328,0,36.498-38.157,36.498-38.157C152.085,84,189.413,84,189.413,84z"
      />
    </svg>
  );
};

export default Sparkels;
