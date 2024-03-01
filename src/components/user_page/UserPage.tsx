import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../assets/sass/components/_user_page.scss";

const UserPage = () => {
  return (
    <div className="userpage">
      <div className="sidebar">
        <div className="sidebar_container">
          <div className="sidebar_container_section">
            <div className="sidebar_container_section_logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="sidebar_container_section_list">
              <ul>
                <Link to="submit-excel">
                  {" "}
                  <li>
                    Submit Excel
                    <i className="fa-solid fa-chevron-right fa-sm"></i>
                  </li>
                </Link>
                <Link to="submit-json">
                  <li>
                    Submit Json
                    <i className="fa-solid fa-chevron-right fa-sm"></i>
                  </li>
                </Link>
                <Link to="history">
                  <li>
                    History
                    <i className="fa-solid fa-chevron-right fa-sm"></i>
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
