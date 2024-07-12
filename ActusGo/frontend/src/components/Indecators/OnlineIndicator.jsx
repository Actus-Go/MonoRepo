import React, { useState, useEffect } from "react";

const OnlineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className='fixed  bottom-2 left-2 h-8 w-20 grid place-content-center rounded-xl bg-gray-800/40'>
      <div className='flex gap-2'>
        {isOnline ? (
          <>
            <div className='h-2 w-2  rounded-full bg-green-500 animate-ping'></div>
            <p style={{ color: "green" }}>Online</p>
          </>
        ) : (
          <>
            <div className='h-2 w-2  rounded-full bg-red-500 animate-ping'></div>
            <p style={{ color: "red" }}>Offline</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OnlineIndicator;
