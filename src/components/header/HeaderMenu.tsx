import { NavLink } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <div className="menu_list">
      <div className="menu_list_container">
        <div className="menu_list_container_section">
          <nav>
            <div className="logo_left">
              <p>LOGO</p>
            </div>
            <div className="list_right">
              <ul>
                <li>
                  <NavLink 
                    to="/home" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/services" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/aboutUs" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/contactUs" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => isActive ? "active" : ""}
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
