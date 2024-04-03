import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../assets/sass/components/_user_page.scss";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleLeft } from "react-icons/fa6";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TokenExpirationPopup from "../TokenExpirationPopup";
import useAuth from "../../hooks/useAuth";
import { useUserContext } from "../../context/UserContext";
import { IoBarChartOutline } from "react-icons/io5";

const TOKEN_EXPIRATION_THRESHOLD = 1000000;

const UserPage = () => {
  const [activeLi, setActiveLi] = useState("");
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [showSubmitFile, setShowSubmitFile] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const userIdRef = useRef(location.state?.userId ?? null);
  const [showPopup, setShowPopup] = useState(false);
  const { setAuth } = useAuth();
  const { setHistoryData, setTrendsData } = useUserContext();
  const [activeDropdownItem, setActiveDropdownItem] = useState("");
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

  const handleMouseEnter = () => {
    setShowSubmitFile(true);
  };

  const handleMouseLeave = () => {
    setShowSubmitFile(false);
  };

  const fetchHistoryData = () => {
    const requestBody = {
      fieldName: "user_id",
      value: userIdRef.current,
      endDate: new Date().toISOString().split("T")[0],
      page: 1,
      size: 10,
    };
    axiosPrivate
      .post(`/convert/fetchDataByColValue`, requestBody)
      .then((response) => {
        setHistoryData(response.data);
        console.log("user page data", response.data);
        navigate("history", { state: { userId: userIdRef.current } });
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const fetchTrendsData = () => {
    axiosPrivate
      .get(
        `/api/audit/user-transaction?userId=${userIdRef.current}&period=today`
      )
      .then((response) => {
        setTrendsData(response.data);
        navigate("trends", { state: { userId: userIdRef.current } });
      })
      .catch((error) => {
        console.error("Error fetching trends data:", error);
        navigate("/login", { state: { from: location }, replace: true });
      });
  };

  const handleLiClick = (liName:string) => {
    const isDropdownItem = ["submit-json-file", "paste-json"].includes(liName);
    if (isDropdownItem) {
      setActiveDropdownItem(liName);
      setActiveLi("submit-json");
    } else if (liName === "submit-json" && !showSubmitFile) {
      setShowSubmitFile(true);
      setActiveLi(liName);
    } else if (liName !== "submit-json") {
      setActiveDropdownItem("");
      setActiveLi(liName);
    }
  };

  return (
    <div className="userpage">
      <div className={`sidebar ${hamburgerClick ? "active" : ""}`}>
        <div className="sidebar_container">
          <div className="sidebar_container_section">
            <div className="sidebar_container_section_logo">
              {hamburgerClick ? (
                <FaAngleLeft
                  onClick={handleHamburgerClick}
                  className="x-mark"
                />
              ) : (
                <GiHamburgerMenu onClick={handleHamburgerClick} />
              )}
              <span>Menu</span>
            </div>
            <div className="sidebar_container_section_list">
              <ul>
                <Link to="submit-excel">
                  <li
                    className={activeLi === "submit-excel" ? "active-li" : ""}
                    onClick={() => handleLiClick("submit-excel")}
                  >
                    <PiMicrosoftExcelLogo className="sidebar_icon" />
                    <span>Submit Excel</span>
                  </li>
                </Link>
                <li
                  className={`${
                    activeLi === "submit-json" ||
                    activeDropdownItem === "submit-json-file"
                      ? "active-li"
                      : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleLiClick("submit-json")}
                >
                  <LuFileJson className="sidebar_icon" />
                  <span>Submit Json</span>
                  {showSubmitFile && (
                    <ul className="dropdown">
                      <Link to="submit-json">
                        <li
                          className={
                            activeDropdownItem === "submit-json-file"
                              ? "active-li"
                              : ""
                          }
                          onClick={() => handleLiClick("submit-json-file")}
                        >
                          Submit Json File
                        </li>
                      </Link>
                      <Link to="paste-json">
                        <li
                          className={
                            activeDropdownItem === "paste-json"
                              ? "active-li"
                              : ""
                          }
                          onClick={() => handleLiClick("paste-json")}
                        >
                          Paste Json
                        </li>
                      </Link>
                    </ul>
                  )}
                </li>
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

export default UserPage;
