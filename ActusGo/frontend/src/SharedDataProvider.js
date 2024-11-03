import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
  const [sharedProduct, setSharedProduct] = useState(null);

  return (
    <SharedDataContext.Provider value={{ sharedProduct, setSharedProduct }}>
      {children}
    </SharedDataContext.Provider>
  );
};

SharedDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};
