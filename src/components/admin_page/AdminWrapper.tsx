// UserWrapper.js
import React from 'react';
import { AdminProvider } from '../../context/AdminContext';
import AdminPage from './AdminPage';

const UserWrapper = () => {
  return (
    <AdminProvider>
      <AdminPage />
    </AdminProvider>
  );
};

export default UserWrapper;
