import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [historyData, setHistoryData] = useState([]);
  const [trendsData, setTrendsData] = useState([]);

  return (
    <UserContext.Provider value={{ historyData, setHistoryData, trendsData, setTrendsData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
