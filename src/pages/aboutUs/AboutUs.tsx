import { Link } from "react-router-dom";
import { LuAlarmClock } from "react-icons/lu";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdHealthAndSafety } from "react-icons/md";
import aboutUsImg from "../../assets/images/whychooseus-bg.jpg";
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
                  <h3>Fast Service</h3>
                  <p>
                    Experience rapid customs clearance on our site. Get swift
                    service for seamless import/export. Efficient solutions
                    await for hassle-free transactions.
                  </p>
                </div>
              </div>
              <div className="points">
                <div className="icon">
                  <AiFillThunderbolt />
                </div>
                <div className="information">
                  <h3>100% Accuracy</h3>
                  <p>
                    Ensure 100% accuracy with our prompt customs website.
                    Experience fast service for all your clearance needs,
                    guaranteeing efficient import and export processes without
                    compromise.
                  </p>
                </div>
              </div>
              <div className="points">
                <div className="icon">
                  <MdHealthAndSafety />
                </div>
                <div className="information">
                  <h3>Safety & Guarantee</h3>
                  <p>
                    Count on our customs website for safety and guarantee.
                    Experience swift service with 100% accuracy, ensuring secure
                    import/export processes for peace of mind.
                  </p>
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
                for excellence in customs services and ensuring secure
                import/export processes for peace of mind.
              </p>
            </div>
          </div>
          <div className="aboutus_container_section_bottom">
            <div className="left">
              <img src={aboutUsImg} alt="" />
            </div>
            <div className="right">
              <div className="container">
                <div className="heading_buttons">
                  <button className={activeTab === "overview" ?"overview":""} onClick={() => setActiveTab("overview")}>
                    OVERVIEW
                  </button>
                  <button className={activeTab === "security" ?"security":""} onClick={() => setActiveTab("security")}>
                    SECURITY
                  </button>
                  <button className={activeTab === "management" ?"management":""} onClick={() => setActiveTab("management")}>
                    MANAGEMENT
                  </button>
                </div>
                {activeTab === "overview" && (
                  <p className="overview_content">
                    <span>Why choose us</span>
                    Select our service for unmatched efficiency and reliability.
                    With years of industry experience, we specialize in
                    facilitating seamless import/export procedures with top-tier
                    security measures, ensuring the safety and integrity of your
                    transactions at every step. Our user-friendly platform
                    offers more than just convenience and accessibility; it
                    provides a comprehensive suite of tools and resources
                    tailored to meet your specific customs clearance
                    requirements. Whether you're a small business or a large
                    enterprise, our customizable solutions adapt to your needs,
                    streamlining the process and saving you time and resources.
                    Rely on our team of experts who are committed to excellence
                    in every aspect of customs clearance. From documentation and
                    compliance to logistics and regulations, we handle it all
                    with precision and care.
                  </p>
                )}
                {activeTab === "security" && (
                  <p className="security_content">
                    <span>Security</span>
                    Trust in our service for top-notch security measures that go
                    beyond industry standards. We understand the critical
                    importance of safeguarding your data and transactions in
                    today's digital landscape. That's why we employ advanced
                    technologies and stringent protocols to ensure the highest
                    levels of confidentiality and integrity throughout every
                    stage of the customs process. Our commitment to security
                    means your information is shielded against unauthorized
                    access and cyber threats, giving you peace of mind knowing
                    that your sensitive data is in safe hands. From encryption
                    to multi-factor authentication, we implement robust measures
                    to protect your assets and maintain the trust you place in
                    us. With us, you can confidently navigate the complexities
                    of customs transactions, knowing that security is at the
                    forefront of everything we do.
                  </p>
                )}
                {activeTab === "management" && (
                  <p className="management_content">
                    <span>Management</span>
                    Opt for our service and unlock effective management
                    solutions tailored to your customs needs. Our seasoned team
                    boasts extensive experience, guaranteeing smooth
                    coordination and timely processing of customs procedures at
                    every turn. We pride ourselves on streamlined workflows and
                    dedicated support, ensuring that even the most intricate
                    customs challenges are managed with efficiency and
                    precision. From documentation to compliance, we handle
                    complexities seamlessly, optimizing your customs experience
                    from start to finish. Trust in our management expertise to
                    navigate regulations effortlessly, leaving you with peace of
                    mind and reliable results every time. Make the smart choice
                    for efficient customs management and partner with us as your
                    preferred provider.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
