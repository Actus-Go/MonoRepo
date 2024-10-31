// socket.js
import { io } from 'socket.io-client';
import { useUser } from "./customHooks/UserHook";

export default function useSocket() {
  const user = useUser();
  const token = user?.token;
  const URL = process.env.REACT_APP_MARKET_BACKEND_URL;

  const socket = io(URL, {
    auth: token,
    transports: ['websocket'],
    autoConnect: false, // Disable auto connection
  });

  return socket;
}