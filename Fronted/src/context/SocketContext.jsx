import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()

const socket = io(`${import.meta.env.VITE_BASE_URL}`) ; 


const SocketProvider = ({ children }) => {

  useEffect(() => {
    // connection
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  // const sendMessage = (eventName, message) => {
  //   socket.emit(eventName, message)
  // }

  // const receiveMessage = (eventName, callback) => {
  //   socket.on(eventName, callback)
  // }

  return (
    <SocketContext.Provider value={{socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;


// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext(null);

// const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// const SocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL, {
//       transports: ["websocket"],
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       setIsConnected(true);
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//       setIsConnected(false);
//     };
//   }, []);

//   const sendMessage = (eventName, payload) => {
//     if (!socketRef.current || !eventName) {
//       return;
//     }

//     socketRef.current.emit(eventName, payload);
//   };

//   const receiveMessage = (eventName, callback) => {
//     if (!socketRef.current || !eventName || typeof callback !== "function") {
//       return () => {};
//     }

//     socketRef.current.on(eventName, callback);

//     return () => {
//       socketRef.current?.off(eventName, callback);
//     };
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         socket: socketRef.current,
//         isConnected,
//         sendMessage,
//         receiveMessage,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);

// export default SocketProvider;

//