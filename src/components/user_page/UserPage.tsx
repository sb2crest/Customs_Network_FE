import { Link, Outlet } from "react-router-dom";
import "../../assets/sass/components/_user_page.scss";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { FaHistory } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";


const UserPage = () => {
  const [hamburgerClick , setHamburgerClick] = useState(false);

  const handleHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick );
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
                  <li className={hamburgerClick  ? "active-li" : ""}>
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
