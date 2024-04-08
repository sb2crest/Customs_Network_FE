import { Link } from "react-router-dom";
import "../../assets/sass/pages/_aboutUs.scss";
import { LuAlarmClock } from "react-icons/lu";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdHealthAndSafety } from "react-icons/md";
import aboutUsImg from "../../assets/images/aboutus1.jpg";
import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
            <div className="left">
              <h1 className="our_mission">Our Mission</h1>
              <div className="points">
                <div className="icon">
                  <LuAlarmClock />
                </div>
                <div className="information">
                  Experience rapid customs clearance on our site. Get swift
                  service for seamless import/export. Efficient solutions await
                  for hassle-free transactions.
                </div>
              </div>
              <div className="points">
                <div className="icon">
                  <AiFillThunderbolt />
                </div>
                <div className="information">
                  Ensure 100% accuracy with our prompt customs website.
                  Experience fast service for all your clearance needs,
                  guaranteeing efficient import and export processes without
                  compromise.
                </div>
              </div>
              <div className="points">
                <div className="icon">
                  <MdHealthAndSafety />
                </div>
                <div className="information">
                  Count on our customs website for safety and guarantee.
                  Experience swift service with 100% accuracy, ensuring secure
                  import/export processes for peace of mind
                </div>
              </div>
            </div>
            <div className="right">
              <h1 className="who_are_we">Who are we?</h1>
              <p className="content1">
                Our customs website prioritizes efficiency, ensuring swift
                processing and 100% accuracy. Experience seamless import/export
                procedures, facilitated with state-of-the-art technology for
                optimal safety and guarantee.
              </p>
              <p className="content2">
                With a user-friendly interface, clients navigate effortlessly,
                accessing a range of services designed to streamline clearance
                processes.
              </p>
              <p className="content3">
                Trust our platform for reliable solutions, providing peace of
                mind and confidence in every transaction, setting the standard
                for excellence in customs services.
              </p>
            </div>
          </div>
          <div className="aboutus_container_section_bottom">
            <div className="left">
              <img src={aboutUsImg} alt="" width={400} height={400} />
            </div>
            <div className="right">
              <div className="heading_buttons">
                <button onClick={() => setActiveTab("overview")}>
                  OVERVIEW
                </button>
                <button onClick={() => setActiveTab("security")}>
                  SECURITY
                </button>
                <button onClick={() => setActiveTab("management")}>
                  MANAGEMENT
                </button>
              </div>
              {activeTab === "overview" && (
                <p className="overview_content">
                  Select our service for unmatched efficiency and reliability.
                  We guarantee seamless import/export procedures with top-tier
                  security measures, ensuring the safety of your transactions.
                  Our user-friendly platform offers convenience and
                  accessibility, providing tailored solutions to meet your
                  customs clearance requirements. Rely on our expertise and
                  commitment to excellence for hassle-free processing, making us
                  the preferred choice for all your customs needs.
                </p>
              )}
              {activeTab === "security" && (
                <p className="security_content">
                  Trust in our service for top-notch security measures. We
                  employ advanced technologies and stringent protocols to
                  safeguard your data and transactions, ensuring confidentiality
                  and integrity throughout the process. Rest assured that your
                  information is protected against unauthorized access and cyber
                  threats, providing peace of mind and confidence in the safety
                  of your customs transactions. Choose security with us for a
                  worry-free experience.
                </p>
              )}
              {activeTab === "management" && (
                <p className="management_content">
                  Opt for our service for effective management solutions. Our
                  experienced team ensures smooth coordination and timely
                  processing of customs procedures. With streamlined workflows
                  and dedicated support, we handle complexities efficiently,
                  optimizing your customs experience. Trust our management
                  expertise to navigate regulations seamlessly and deliver
                  reliable results, making us the preferred choice for efficient
                  customs management.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
