// UserWrapper.js
import React from 'react';
import { AdminProvider } from '../context/AdminContext';
import AdminPage from '../components/admin_page/AdminPage';

const UserWrapper = () => {
  return (
    <AdminProvider>
      <AdminPage />
    </AdminProvider>
  );
};

export default UserWrapper;
