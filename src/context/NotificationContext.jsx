import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {

  const showNotification = (message) => {
    toast.success(message);
  };



  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
