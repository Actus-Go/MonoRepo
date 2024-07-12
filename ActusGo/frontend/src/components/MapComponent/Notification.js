import React, { memo } from 'react'

const Notification = memo(({ message, onAccept, onReject }) => {
  return (
    <div className="absolute top-0 right-0 z-20 bg-[#fff] p-[1rem] duration-300 rounded-2xl ">
        <p className="text-black font-bold mb-[1rem] tracking-[.5px]">{message}</p>
        <div className="flex justify-between items-center">
            <button className="bg-[#000] text-[#ffff55] p-[.5rem] cursor-pointer outline-none rounded-2xl font-bold tracking-[.5px] " onClick={onAccept}>Accept</button>
            <button className="bg-[#000] text-[#ffff55] p-[.5rem] cursor-pointer outline-none rounded-2xl font-bold tracking-[.5px]" onClick={onReject}>Reject</button>
        </div>
    </div>
  )
});

export default Notification
