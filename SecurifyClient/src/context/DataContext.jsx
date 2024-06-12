import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [anonymousData, setAnonymousData] = useState([]);

  return (
    <DataContext.Provider value={{ anonymousData, setAnonymousData }}>
      {children}
    </DataContext.Provider>
  );
};