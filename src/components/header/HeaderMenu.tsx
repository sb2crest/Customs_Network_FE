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
                  <NavLink to="/home" activeClassName="active">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/services" activeClassName="active">Services</NavLink>
                </li>
                <li>
                  <NavLink to="/aboutUs" activeClassName="active">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/contactUs" activeClassName="active">Contact Us</NavLink>
                </li>
                <li>
                  <NavLink to="/login" activeClassName="active">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
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
