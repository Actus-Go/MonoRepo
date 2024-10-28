import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUser } from "./customHooks/UserHook";

const useInitializeSocket = () => {
  const user = useUser();
if (!user) {
    console.error('User token is required for socket connection');
    return;
  }

  const socket = io('http://localhost:3000', {
    auth: {
      token: `Bearer ${user.token}`,
    },
  }); 

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  return socket;
};

export default useInitializeSocket;

