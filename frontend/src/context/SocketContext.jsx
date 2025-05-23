import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../config';
import { useAuthContext } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

/**
 * The SocketProvider component is a context provider that wraps the
 * application. It is responsible for connecting to the server, and
 * providing the socket, socket ID, and functions to register a user
 * and send a message to another user to all components in the
 * application.
 *
 * The SocketProvider accepts a single prop, 'children', which should be
 * the JSX elements that make up the application.
 *
 * The SocketProvider uses the useState hook to initialize the socket ID
 * state to null. When the component mounts, it connects to the server
 * using the socket.io-client library, and sets the socket ID state to
 * the socket ID returned by the server. The SocketProvider also defines
 * three functions: registerUser, sendMessageSocket, and
 * getRecieverSocketId. The registerUser function registers the user with
 * the server by emitting a 'register' event with the user ID as an
 * argument. The sendMessageSocket function sends a message to another
 * user by emitting a 'send_message' event with the receiver ID and
 * message as arguments. The getRecieverSocketId function returns the
 * socket ID of the receiver user. The SocketProvider wraps the
 * application in a Context.Provider component, which makes the socket,
 * socket ID, registerUser, sendMessageSocket, and getRecieverSocketId
 * functions available to all components in the application.
 *
 * @param {Object} props The props object should contain a single property
 * called 'children', which should be the JSX elements that make up the
 * application.
 * @returns {Object} The SocketProvider returns a Context.Provider
 * component that wraps the application.
 */
export const SocketProvider = ({ children }) => {
  const {Authuser}=useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      withCredentials: true,
      query: { Authuser: Authuser?._id || null },
    });

    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');  
    });
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      // Handle the received message, e.g., update state
    });

    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
    };
  }, [Authuser]);

  const registerUser = (userId) => {
    socket.emit('register', userId);
    console.log(`Registered user with ID: ${userId}`);
  };

  const sendMessageSocket = (receiverId, message) => {
    socket.emit('send_message', { receiverId, message });
    console.log(`Message sent to ${receiverId}: ${message} from socketContext.jsx`);
  };

  const value = {
    socket,
    registerUser,
    sendMessageSocket, 
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
