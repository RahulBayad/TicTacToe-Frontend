import { io } from "socket.io-client";

export const initializeSocket =()=> io("http://localhost:3000");