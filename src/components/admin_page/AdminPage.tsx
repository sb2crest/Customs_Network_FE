import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../assets/sass/components/_user_page.scss";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleLeft } from "react-icons/fa6";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TokenExpirationPopup from "../../utilities/TokenExpirationPopup";
import useAuth from "../../hooks/useAuth";
import { useAdminContext } from "../../context/AdminContext";
import { IoBarChartOutline } from "react-icons/io5";

const TOKEN_EXPIRATION_THRESHOLD = 1000000;

const AdminPage = () => {
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [activeLi, setActiveLi] = useState(""); 
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const userIdRef = useRef(location.state?.userId ?? null);
  const [showPopup, setShowPopup] = useState(false);
  const { setAuth } = useAuth();
  const { setAdminHistoryData, setAdminTrendsData } = useAdminContext();
  
  useEffect(() => {
    if (!userIdRef.current) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, TOKEN_EXPIRATION_THRESHOLD);

    return () => clearTimeout(timer);
  }, []);

  const handleContinueSession = () => {
    setShowPopup(false);
    setTimeout(() => {
      setShowPopup(true);
    }, TOKEN_EXPIRATION_THRESHOLD);
  };

  const handleLogout = () => {
    setShowPopup(false);
    setAuth({});
    navigate("/login");
  };

  const handleHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick);
  };

  const handleLiClick = (liName) => {
    setActiveLi(liName);
  };

  const fetchHistoryData = () => {
    const requestBody = {
      fieldName: "status",
      value: "CBP DOWN",
      endDate: new Date().toISOString().split("T")[0],
      page: 1,
      size: 10,
    };
    axiosPrivate
      .post(`/convert/fetchDataByColValue`, requestBody)
      .then((response) => {
        setAdminHistoryData(response.data);
        console.log("user page data", response.data);
        navigate("history");
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const fetchTrendsData = () => {
    axiosPrivate
      .get(`/api/audit/get-all-transaction?period=today`)
      .then((response) => {
        setAdminTrendsData(response.data)
        navigate("trends");
      }) 
      .catch((error) => {
        console.error("Error fetching trends data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  return (
    <div className="userpage">
      <div className={`sidebar ${hamburgerClick ? "active" : "sidebar"}`}>
        <div className="sidebar_container">
          <div className="sidebar_container_section">
            <div className="sidebar_container_section_logo">
              {hamburgerClick ? (
                <FaAngleLeft onClick={handleHamburgerClick} className="x-mark" />
              ) : (
                <GiHamburgerMenu onClick={handleHamburgerClick} />
              )}
              <span>Menu</span>
            </div>
            <div className="sidebar_container_section_list">
              <ul>
              <Link to="trends">
                  <li
                    className={activeLi === "trends" ? "active-li" : ""}
                    onClick={() => {
                      handleLiClick("trends");
                      fetchTrendsData();
                    }}
                  >
                    <IoBarChartOutline className="sidebar_icon" />
                    <span>Trends</span>
                  </li>
                </Link>
                <Link to="history">
                  <li
                    className={activeLi === "history" ? "active-li" : ""}
                    onClick={() => {
                      handleLiClick("history");
                      fetchHistoryData();
                    }}
                  >
                    <FaHistory className="sidebar_icon" />
                    <span>History</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="userpage-content-container">
        <Outlet />
      </div>
      {showPopup && (
        <TokenExpirationPopup
          onContinue={handleContinueSession}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default AdminPage;
