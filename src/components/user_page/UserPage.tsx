import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../assets/sass/components/_user_page.scss";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
// import { useLocation } from 'react-router-dom';
import axios from "axios";


const UserPage = () => {
  const [hamburgerClick , setHamburgerClick] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  // const location = useLocation();
  // const userId = location.state?.userId;

  const handleHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick );
  };

  const fetchHistoryData = () => {
    axios.get(`http://localhost:8080/convert/get-all?userId=abc1230010`)
      .then((response) => {
        setHistoryData(response.data);
        navigate('history', { state: { historyData: response.data } });
      })
      .catch((error) => {
        console.error('Error fetching history data:', error);
      });
  };


  return (
    <div className="userpage">
      <div className={`sidebar ${hamburgerClick  ? "active" : "sidebar"}`}>
        <div className="sidebar_container">
          <div className="sidebar_container_section">
            <div className="sidebar_container_section_logo">
            {hamburgerClick ? (
                <FaXmark onClick={handleHamburgerClick} className="x-mark"/>
              ) : (
                <GiHamburgerMenu onClick={handleHamburgerClick} />
              )}
              <span>Menu</span>
            </div>
            <div className="sidebar_container_section_list">
              <ul>
                <Link to="submit-excel">
                  <li className={hamburgerClick  ? "active-li" : ""}>
                    <PiMicrosoftExcelLogo className="sidebar_icon" />
                    Submit Excel
                  </li>
                </Link>
                <Link to="submit-json">
                  <li className={hamburgerClick  ? "active-li" : ""}>
                    <LuFileJson className="sidebar_icon" />
                    Submit Json
                  </li>
                </Link>
                <Link to="history">
                  <li className={hamburgerClick  ? "active-li" : ""} onClick={fetchHistoryData}>
                    <FaHistory className="sidebar_icon" />
                    History
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
    </div>
  );
};

export default UserPage;
