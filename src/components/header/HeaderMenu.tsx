import React from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/sass/components/_headermenu.scss";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <div className="menu_list">
      <div className="menu_list_container">
        <div className="menu_list_container_section">
          <nav>
            <div className="logo_left">
              <img src={logo} alt="logo" />
            </div>
            <div className="list_right">
              <ul>
                <Link to="/home">
                  <li>Home</li>
                </Link>
                <Link to="/services">
                  <li>Services</li>
                </Link>
                <Link to="/aboutUs">
                  <li>About Us</li>
                </Link>
                <Link to="/contactUs">
                  <li>Contact Us</li>
                </Link>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/signup">
                  <li>Sign Up</li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default HeaderMenu;
