import React, { memo } from "react";
import { FiZoomIn } from "react-icons/fi";
import { ImZoomOut } from "react-icons/im";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { TbRouteAltLeft } from "react-icons/tb";
import { GrClear } from "react-icons/gr";
import "./zoombuttons.css";

const  ZoomButtons = memo(({ handleZoom, route, clear }) =>{
  return (
    <div className="zoomButtons absolute   sm:left-[20%] md:left-[35%] bottom-0 z-[8] p-2 rounded-2xl flex items-center gap-[1rem]">
      <button
        className="text-[--blue-color] text-2xl px-2 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center duration-300 hover:bg-[--blue-color] hover:text-black"
        onClick={() => handleZoom(15)}
      >
        <FiZoomIn />
      </button>
      <button
        className="text-[--blue-color] text-2xl px-2 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center duration-300 hover:bg-[--blue-color] hover:text-black"
        onClick={() => handleZoom(14)}
      >
        <ImZoomOut />
      </button>
      <button
        className="text-[--blue-color] text-2xl px-2 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center duration-300 hover:bg-[--blue-color] hover:text-black"
        onClick={() => handleZoom(13)}
      >
        <MdOutlineZoomOutMap />
      </button>
      <button
        className="text-[--blue-color] text-2xl px-2 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center duration-300 hover:bg-[--blue-color] hover:text-black"
        onClick={route}
      >
        <TbRouteAltLeft />
      </button>
      <button
        className="text-[--blue-color] text-2xl px-2 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center duration-300 hover:bg-[--blue-color] hover:text-black"
        onClick={clear}
      >
        <GrClear />
      </button>
    </div>
  );
});

export default ZoomButtons;
