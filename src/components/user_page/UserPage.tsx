import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../assets/sass/components/_user_page.scss";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const UserPage = () => {
  const { logout } = useAuth();
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [showSubmitFile, setShowSubmitFile] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const userIdRef = useRef(location.state?.userId?? null);

  useEffect(() => {
    if (!userIdRef.current) {
      // Redirect to login if no user ID
      navigate('/login');
    }
  }, []);

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
    axios
      .get(`http://localhost:8080/convert/get-all?userId=${userIdRef.current}`)
      .then((response) => {
        setHistoryData(response.data);
        navigate("history", {
          state: { userId: userIdRef.current, historyData: response.data },
        });
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
      });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="userpage">
      <div className={`sidebar ${hamburgerClick ? "active" : "sidebar"}`}>
        <div className="sidebar_container">
          <div className="sidebar_container_section">
            <div className="sidebar_container_section_logo">
              {hamburgerClick ? (
                <FaXmark onClick={handleHamburgerClick} className="x-mark" />
              ) : (
                <GiHamburgerMenu onClick={handleHamburgerClick} />
              )}
              <span>Menu</span>
            </div>
            <div className="sidebar_container_section_list">
              <ul>
                <Link to="submit-excel">
                  <li className={hamburgerClick ? "active-li" : ""}>
                    <PiMicrosoftExcelLogo className="sidebar_icon" />
                    Submit Excel
                  </li>
                </Link>
                <li
                  className={hamburgerClick ? "active-li" : ""}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <LuFileJson className="sidebar_icon" />
                  Submit Json
                  {showSubmitFile && (
                    <ul className="dropdown">
                      <Link to="submit-json">
                        <li className={hamburgerClick ? "active-li" : ""}>
                          Submit Json File
                        </li>
                      </Link>
                      <Link to="paste-json">
                        <li className={hamburgerClick ? "active-li" : ""}>
                          Paste Json
                        </li>
                      </Link>
                    </ul>
                  )}
                </li>
                <Link to="history">
                  <li
                    className={hamburgerClick ? "active-li" : ""}
                    onClick={fetchHistoryData}
                  >
                    <FaHistory className="sidebar_icon" />
                    History
                  </li>
                </Link>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="userpage-content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
