// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useUser } from './customHooks/UserHook';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useUser();
  console.log("user",user);

  useEffect(() => {
    if(!user?.token){
      return;
    }
    const URL = process.env.REACT_APP_MARKET_BACKEND_URL;

    // Initialize socket connection
    const newSocket = io(URL, {
      extraHeaders: {
        auth: `Bearer ${user.token}`,
      },
      query: {
        auth: `Bearer ${user.token}`,
      },
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 20,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log("Socket connected:", newSocket.connected);
    });

    newSocket.on('disconnect', () => {
      console.log("Socket disconnected.");
    });

    // Clean up the socket connection when the app is unmounted
    return () => {
      newSocket.disconnect();
    };
  }, [user,user?.token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
