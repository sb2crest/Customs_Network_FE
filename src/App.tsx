import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SubmitExcel from "./components/user_page/SubmitExcel";
import SubmitJson from "./components/user_page/SubmitJson";
import History from "./components/user_page/History";
import PasteJson from "./components/user_page/PasteJson";
import Unauthorized from "./utilities/UnAuthorized";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Trends from "./components/user_page/Trends";
import UserWrapper from "./utilities/UserWrapper";
import AdminWrapper from "./utilities/AdminWrapper";
import AdminTrends from "./components/admin_page/AdminTrends";
import AdminHistory from "./components/admin_page/AdminHistory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={"USER"} />}>
            <Route path="/user-page" element={<UserWrapper />}>
              <Route index element={<SubmitExcel />} />
              <Route path="submit-excel" element={<SubmitExcel />} />
              <Route path="submit-json" element={<SubmitJson />} />
              <Route path="paste-json" element={<PasteJson />} />
              <Route path="history" element={<History />} />
              <Route path="trends" element={<Trends />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={"ADMIN"} />}>
            <Route path="/admin-page" element={<AdminWrapper />}>
              <Route index element={<AdminTrends />} />
              <Route path="trends" element={<AdminTrends />} />
              <Route path="history" element={<AdminHistory />} />
            </Route>
          </Route>

          {/* route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
