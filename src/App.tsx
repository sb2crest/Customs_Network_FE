import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import UserPage from "./components/user_page/UserPage";
import SubmitExcel from "./components/user_page/SubmitExcel";
import SubmitJson from "./components/user_page/SubmitJson";
import History from "./components/user_page/History";
import PasteJson from "./components/user_page/PasteJson";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-page" element={<UserPage />}>
          <Route index path="submit-excel" element={<SubmitExcel />} />
          <Route path="submit-json" element={<SubmitJson />} />
          <Route path="paste-json" element={<PasteJson />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
