import React, { createContext, useState } from "react";

export const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
  const [sharedProduct, setSharedProduct] = useState(null);

  return (
    <SharedDataContext.Provider value={{ sharedProduct, setSharedProduct }}>
      {children}
    </SharedDataContext.Provider>
  );
};
