import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminHistoryData, setAdminHistoryData] = useState([]);
  const [adminTrendsData, setAdminTrendsData] = useState([]);

  return (
    <AdminContext.Provider value={{ adminHistoryData, setAdminHistoryData, adminTrendsData, setAdminTrendsData }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
