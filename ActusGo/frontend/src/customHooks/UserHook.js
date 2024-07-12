import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <UserDataContext.Provider value={user}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUser = () => useContext(UserDataContext);