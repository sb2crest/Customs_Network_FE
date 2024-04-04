import { Link } from "react-router-dom";
import "../../assets/sass/pages/_aboutUs.scss";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="aboutus_container">
        <div className="aboutus_container_section">
          <div className="aboutus_container_section_banner">
            <h1>About Us</h1>
            <p>Our little Story</p>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className="aboutus_container_section_top">
            <div className="left"></div>
            <div className="right">
              <p className="know_more">KNOW US MORE</p>
              <h3>More About Us</h3>
              <p className="content1">
                We design and implement industry leading solutions for
                multinational companies. Approximately 73,000 employees.
              </p>
              <p className="content2">
                <Link to={"/submit-excel"}>Submit Excel</Link>
              </p>
            </div>
          </div>
          <div className="aboutus_container_section_bottom">
            <div className="left"></div>
            <div className="right">
              <p className="know_more">KNOW US MORE</p>
              <h3>More About Us</h3>
              <p className="content1">
                We design and implement industry leading solutions for
                multinational companies. Approximately 73,000 employees.
              </p>
              <p className="content2">
                <Link to={"/submit-excel"}>Submit Excel</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
