import Login from "./components/Login";
import SignUp from "./components/SignUp";
import InputFileUpload from "./components/UploadFile";
import Footer from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload-file" element={<InputFileUpload />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
