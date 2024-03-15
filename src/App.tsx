import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPage from "./components/user_page/UserPage";
import SubmitExcel from "./components/user_page/SubmitExcel";
import SubmitJson from "./components/user_page/SubmitJson";
import History from "./components/user_page/History";
import PasteJson from "./components/user_page/PasteJson";
import { Header } from "./components/header/Header";
import AdminPage from "./components/admin_page/AdminPage";

function App() {
  const { isAuthenticated, role } = useAuth();

  const userPageElement = isAuthenticated && role === "USER"  ? <UserPage /> : <Navigate to="/login" />;
  const adminPageElement = isAuthenticated && role === "ADMIN" ? <AdminPage /> : <Navigate to="/login" />;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/user-page" element={userPageElement}>
          <Route index element={<SubmitExcel />} />
          <Route path="submit-excel" element={<SubmitExcel />} />
          <Route path="submit-json" element={<SubmitJson />} />
          <Route path="paste-json" element={<PasteJson />} />
          <Route path="history" element={<History />} />
        </Route>
        
        <Route path="/admin-page" element={adminPageElement} />
        {/* <Route path="/admin-page" element={<AdminPage/> } /> */}
        
        {/* Add a catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
