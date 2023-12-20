// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import {useYjs} from "./YjsContext";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const {setUerOnline} = useYjs()

    useEffect(() => {
        const cachedUserId = localStorage.getItem('user');
        if (cachedUserId) {
            setUser(cachedUserId);
            // setUerOnline(cachedUserId)
        }
    }, []);




  const login = (username) => {
    setUser(username);
    setUerOnline(username)
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setUser(null);
    setUerOnline(null)
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
