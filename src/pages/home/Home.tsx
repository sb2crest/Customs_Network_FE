import React, { useState } from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import GppGoodIcon from "@mui/icons-material/GppGood";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import map from "../../assets/images/map.jpg";
import Banner from "../../components/Banner";
import { BsFilePerson } from "react-icons/bs";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaUserShield, FaGasPump } from "react-icons/fa";
import { FaUsers, FaWarehouse } from "react-icons/fa6";
import { RiBuilding2Line } from "react-icons/ri";
import { CiPercent } from "react-icons/ci";
import { BiSolidPlane } from "react-icons/bi";
import { GiAutoRepair, GiSodaCan } from "react-icons/gi";
import { IoDiamondSharp } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<string>("land");
  const [selectedReason, setSelectedReason] = useState<string>("passionate");

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Banner />
      <div className="home">
        <div className="home_container">
          <div className="home_container_section">
            <div className="card">
              <div className="left_image">
                <img src={map} alt="IMAGE" />
              </div>
              <div className="right_content">
                <p className="heading">We Provide Service Across The Globe</p>
                <p className="content">
                  We offer a Global Logistics Network with our worldwide offices
                  and also high quality distribution facilities which are
                  staffed by dedicated teams of the top of experts. We have more
                  than 30 years of experiences in this field.
                </p>
              </div>
            </div>
            <div className="services">
              <div className="services_container">
                <div className="services_container_section">
                  <div className="items">
                    <AccessAlarmsIcon className="services_icon" />
                    <p className="heading">Fast Service</p>
                    <p className="content">
                      A wonderful serenity has taken possession of my entire
                      soul, like these sweet mornings of spring which I enjoy
                      with my whole heart.
                    </p>
                    <p className="learn_more">
                      LEARN MORE
                      <i className="fa-solid fa-right-long arrow_right"></i>{" "}
                    </p>
                  </div>
                  <div className="items">
                    <GppGoodIcon className="services_icon" />
                    <p className="heading">Safe Delivery</p>
                    <p className="content">
                      A wonderful serenity has taken possession of my entire
                      soul, like these sweet mornings of spring which I enjoy
                      with my whole heart.
                    </p>
                    <p className="learn_more">
                      LEARN MORE
                      <i className="fa-solid fa-right-long arrow_right"></i>{" "}
                    </p>
                  </div>
                  <div className="items">
                    <i className="fa-solid fa-headset services_icon"></i>{" "}
                    <p className="heading">24/7 Support</p>
                    <p className="content">
                      A wonderful serenity has taken possession of my entire
                      soul, like these sweet mornings of spring which I enjoy
                      with my whole heart.
                    </p>
                    <p className="learn_more">
                      LEARN MORE
                      <i className="fa-solid fa-right-long arrow_right"></i>{" "}
                    </p>
                  </div>
                </div>
                <div className="services_container_details">
                  <div className="services_container_details_section">
                    <div className="services_container_details_section_left">
                      <div className="left"></div>
                    </div>
                    <div className="services_container_details_section_right">
                      <p className="heading">Quick Tracking Service</p>
                      <p className="content">
                        This is just an example of the custom HTML form. You may
                        need to link it to your third party app or use third
                        party html snippet . This theme doesn’t offer the
                        tracking system.
                      </p>
                      <p className="content2">
                        *Please enter (House) Air Waybill No., B/L No., or
                        Container No. For OPTIONAL SEARCH using your Customer
                        Account No.
                      </p>
                      <div className="form">
                        <input type="text" placeholder="enter the details" />
                        <button className="tracknow">TRACK NOW</button>
                      </div>
                    </div>
                  </div>
                  <div className="services_container_details_items">
                    <div
                      className={`items ${
                        selectedItem === "land" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("land")}
                    >
                      <div className="items_background_land"></div>
                      <div className="items_background_land_active"></div>
                      <div className="background_overlay"></div>
                      <div className="background_overlay_active"></div>
                      <LocalShippingIcon className="service_icon" />
                      <p className="heading">LAND TRANSPORT</p>
                      <p className="content">1000+ Trucks in 120 Cities</p>
                    </div>
                    <div
                      className={`items ${
                        selectedItem === "air" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("air")}
                    >
                      <div className="items_background_air"></div>
                      <div className="items_background_air_active"></div>
                      <div className="background_overlay"></div>
                      <div className="background_overlay_active"></div>
                      <FlightIcon className="service_icon" />
                      <p className="heading">Air Freight</p>
                      <p className="content">120+ Aircrafts in 30 Cities</p>
                    </div>
                    <div
                      className={`items ${
                        selectedItem === "water" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("water")}
                    >
                      <div className="items_background_water"></div>
                      <div className="items_background_water_active"></div>
                      <div className="background_overlay"></div>
                      <div className="background_overlay_active"></div>
                      <DirectionsBoatIcon className="service_icon" />
                      <p className="heading">Ocean Freight</p>
                      <p className="content">6000+ Containers in 20 Ports</p>
                    </div>
                    <div
                      className={`items ${
                        selectedItem === "warehouse" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("warehouse")}
                    >
                      <div className="items_background"></div>
                      <div className="items_background_active"></div>
                      <div className="background_overlay"></div>
                      <div className="background_overlay_active"></div>
                      <DirectionsSubwayIcon className="service_icon" />
                      <p className="heading">Smart Warehouses</p>
                      <p className="content">Cover 1,000,000 sqm.</p>
                    </div>
                  </div>
                  <div className="services_container_details_description">
                    <div className="services_container_details_description_container">
                      {selectedItem && (
                        <div className="left">
                          {selectedItem === "land" && (
                            <React.Fragment>
                              <p className="heading">Land Transport</p>
                              <p className="content">
                                1000+ Trucks in 120 Cities
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "air" && (
                            <React.Fragment>
                              <p className="heading">Air Freight</p>
                              <p className="content">
                                120+ Aircrafts in 30 Cities
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "water" && (
                            <React.Fragment>
                              <p className="heading">Ocean Freight</p>
                              <p className="content">
                                6000+ Containers in 20 Ports
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "warehouse" && (
                            <React.Fragment>
                              <p className="heading">Smart Warehouses</p>
                              <p className="content">Cover 1,000,000 sqm.</p>
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {selectedItem && (
                        <div className="right">
                          {selectedItem === "land" && (
                            <React.Fragment>
                              <p className="first">
                                Logisco Ground’s flexible model, using only
                                quality carriers, means you benefit from
                                improved service levels, greater flexibility and
                                time-definite deliveries. Our expertise in
                                transport management and planning allows us to
                                design(land).
                              </p>
                              <p className="second">
                                Through our global network of control towers and
                                state-of-the-art technology, we are able to
                                monitor and dynamically react to situations such
                                as adverse weather, additional pick ups or drop
                                offs, or heavy traffic, meaning that your goods
                                are always traveling the most efficient
                                route.Our non-asset based Road network provides
                                you with flexibility, improved service levels.
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "air" && (
                            <React.Fragment>
                              <p className="first">
                                Logisco Ground’s flexible model, using only
                                quality carriers, means you benefit from
                                improved service levels, greater flexibility and
                                time-definite deliveries. Our expertise in
                                transport management and planning allows us to
                                design(air).
                              </p>
                              <p className="second">
                                Through our global network of control towers and
                                state-of-the-art technology, we are able to
                                monitor and dynamically react to situations such
                                as adverse weather, additional pick ups or drop
                                offs, or heavy traffic, meaning that your goods
                                are always traveling the most efficient
                                route.Our non-asset based Road network provides
                                you with flexibility, improved service levels.
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "water" && (
                            <React.Fragment>
                              <p className="first">
                                Logisco Ground’s flexible model, using only
                                quality carriers, means you benefit from
                                improved service levels, greater flexibility and
                                time-definite deliveries. Our expertise in
                                transport management and planning allows us to
                                design(water).
                              </p>
                              <p className="second">
                                Through our global network of control towers and
                                state-of-the-art technology, we are able to
                                monitor and dynamically react to situations such
                                as adverse weather, additional pick ups or drop
                                offs, or heavy traffic, meaning that your goods
                                are always traveling the most efficient
                                route.Our non-asset based Road network provides
                                you with flexibility, improved service levels.
                              </p>
                            </React.Fragment>
                          )}
                          {selectedItem === "warehouse" && (
                            <React.Fragment>
                              <p className="first">
                                Logisco Ground’s flexible model, using only
                                quality carriers, means you benefit from
                                improved service levels, greater flexibility and
                                time-definite deliveries. Our expertise in
                                transport management and planning allows us to
                                design.
                              </p>
                              <p className="second">
                                Through our global network of control towers and
                                state-of-the-art technology, we are able to
                                monitor and dynamically react to situations such
                                as adverse weather, additional pick ups or drop
                                offs, or heavy traffic, meaning that your goods
                                are always traveling the most efficient
                                route.Our non-asset based Road network provides
                                you with flexibility, improved service levels.
                              </p>
                            </React.Fragment>
                          )}
                          <div className="more_details">
                            <button type="button" className="moreDetails">
                              MORE Details
                            </button>
                            <button type="button" className="downloadPdf">
                              <i className="fa-solid fa-download"></i>DOWNLOAD
                              PDF
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="why_choose_us">
              <div className="why_choose_us_container">
                <div className="why_choose_us_container_section">
                  <div className="left_container">
                    <p>WHY CHOOSE US</p>
                    <h3>What Makes Us Different</h3>
                    <div className="line"></div>
                    <ul>
                      <li
                        onClick={() => handleReasonClick("passionate")}
                        className={
                          selectedReason === "passionate" ? "active" : ""
                        }
                      >
                        <i className="fa-solid fa-chevron-right fa-sm"></i>We
                        are passionate about customers
                      </li>
                      <li
                        onClick={() => handleReasonClick("energetic")}
                        className={
                          selectedReason === "energetic" ? "active" : ""
                        }
                      >
                        <i className="fa-solid fa-chevron-right fa-sm"></i>We
                        are energetic and eager
                      </li>
                      <li
                        onClick={() => handleReasonClick("performance-driven")}
                        className={
                          selectedReason === "performance-driven"
                            ? "active"
                            : ""
                        }
                      >
                        <i className="fa-solid fa-chevron-right fa-sm"></i>We
                        are performance-driven
                      </li>
                      <li
                        onClick={() => handleReasonClick("successful")}
                        className={
                          selectedReason === "successful" ? "active" : ""
                        }
                      >
                        <i className="fa-solid fa-chevron-right fa-sm"></i>We
                        are successful
                      </li>
                    </ul>
                  </div>
                  <div className="right_container">
                    <div className="icon">
                      {selectedReason === "passionate" && <BsFilePerson />}
                      {selectedReason === "energetic" && <TfiAlarmClock />}
                      {selectedReason === "performance-driven" && (
                        <FaUserShield />
                      )}
                      {selectedReason === "successful" && <FaUsers />}
                    </div>
                    <div className="right_container_content">
                      <p className="heading">WHY CUSTOMERS LOVE US</p>
                      {selectedReason === "passionate" && (
                        <React.Fragment>
                          <p className="right_container_content_heading">
                            We are passionate about customers
                          </p>
                          <p className="right_container_content_content1">
                            Logistics, a leading global asset-light supply chain
                            management company, designs and implements industry
                            leading solutions for large and medium-size national
                            and multinational companies. Approximately 73,000
                            employees in more than 120 countries are dedicated
                            to delivering effective and robust supply-chain
                            solutions across a variety of sectors where we apply
                            our operational expertise to provide best-in-class
                            services.
                          </p>
                          <p className="right_container_content_content2">
                            Airfreight is fast-moving, challenging and
                            constantly changing – it’s the nature of the
                            business. Around the globe capacity and demand can
                            change in the blink of an eye so it’s essential to
                            have a partner who provides stability.
                          </p>
                        </React.Fragment>
                      )}
                      {selectedReason === "energetic" && (
                        <React.Fragment>
                          <p className="right_container_content_heading">
                            We are passionate about customers
                          </p>
                          <p className="right_container_content_content1">
                            Logistics, a leading global asset-light supply chain
                            management company, designs and implements industry
                            leading solutions for large and medium-size national
                            and multinational companies. Approximately 73,000
                            employees in more than 120 countries are dedicated
                            to delivering effective and robust supply-chain
                            solutions across a variety of sectors where we apply
                            our operational expertise to provide best-in-class
                            services.
                          </p>
                          <p className="right_container_content_content2">
                            Airfreight is fast-moving, challenging and
                            constantly changing – it’s the nature of the
                            business. Around the globe capacity and demand can
                            change in the blink of an eye so it’s essential to
                            have a partner who provides stability.
                          </p>
                        </React.Fragment>
                      )}
                      {selectedReason === "performance-driven" && (
                        <React.Fragment>
                          <p className="right_container_content_heading">
                            We are passionate about customers
                          </p>
                          <p className="right_container_content_content1">
                            Logistics, a leading global asset-light supply chain
                            management company, designs and implements industry
                            leading solutions for large and medium-size national
                            and multinational companies. Approximately 73,000
                            employees in more than 120 countries are dedicated
                            to delivering effective and robust supply-chain
                            solutions across a variety of sectors where we apply
                            our operational expertise to provide best-in-class
                            services.
                          </p>
                          <p className="right_container_content_content2">
                            Airfreight is fast-moving, challenging and
                            constantly changing – it’s the nature of the
                            business. Around the globe capacity and demand can
                            change in the blink of an eye so it’s essential to
                            have a partner who provides stability.
                          </p>
                        </React.Fragment>
                      )}
                      {selectedReason === "successful" && (
                        <React.Fragment>
                          <p className="right_container_content_heading">
                            We are passionate about customers
                          </p>
                          <p className="right_container_content_content1">
                            Logistics, a leading global asset-light supply chain
                            management company, designs and implements industry
                            leading solutions for large and medium-size national
                            and multinational companies. Approximately 73,000
                            employees in more than 120 countries are dedicated
                            to delivering effective and robust supply-chain
                            solutions across a variety of sectors where we apply
                            our operational expertise to provide best-in-class
                            services.
                          </p>
                          <p className="right_container_content_content2">
                            Airfreight is fast-moving, challenging and
                            constantly changing – it’s the nature of the
                            business. Around the globe capacity and demand can
                            change in the blink of an eye so it’s essential to
                            have a partner who provides stability.
                          </p>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home_aboutus">
              <div className="home_aboutus_container">
                <div className="home_aboutus_container_section">
                  <div className="home_aboutus_container_section_top">
                    <div className="left"></div>
                    <div className="right">
                      <p className="know_more">KNOW US MORE</p>
                      <h3>More About Us</h3>
                      <p className="content1">
                        We design and implement industry leading solutions for
                        multinational companies. Approximately 73,000 employees.
                      </p>
                      <p className="content2">
                        At Logisco, we know experience matters. That’s why
                        customers trust us — we have more than 80 years of
                        experience in the logistics and transportation industry.
                        For your air charter services, this translates to
                        competence around the globe.
                      </p>
                      <button type="button">More Details</button>
                    </div>
                  </div>
                  <div className="home_aboutus_container_section_bottom">
                    <div className="left">
                      <div className="container">
                        <p className="heading">WE ARE AN ADVANCED COMPANY</p>
                        <h3>Using High Technology</h3>
                        <div className="aboutus_items">
                          <div className="icon">
                            <RiBuilding2Line />
                          </div>
                          <div className="content">
                            <h5>We Use AI In The Line</h5>
                            <p>
                              That’s why customers trust us — we have more than
                              80 years of experience in the logistics and
                              transportation.
                            </p>
                          </div>
                        </div>
                        <div className="aboutus_items">
                          <div className="icon">
                            <FaWarehouse />
                          </div>
                          <div className="content">
                            <h5>Smart Warehouse</h5>
                            <p>
                              That’s why customers trust us — we have more than
                              80 years of experience in the logistics and
                              transportation.
                            </p>
                          </div>
                        </div>
                        <div className="aboutus_items">
                          <div className="icon">
                            <CiPercent />
                          </div>
                          <div className="content">
                            <h5>100% Accuracy</h5>
                            <p>
                              That’s why customers trust us — we have more than
                              80 years of experience in the logistics and
                              transportation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="industry_solutions">
              <div className="industry_solutions_container">
                <div className="industry_solutions_container_section">
                  <div className="industry_heading">
                    <p className="header">WE ARE EXPERT IN MANY INDUSTRIES</p>
                    <h3>Industry Solutions</h3>
                    <p className="paragraph">
                      As one of the leading providers of logistics solutions
                      across the globe, Logisco has an immense portfolio of
                      transport and contract logistics solutions that spans
                      multiple industries.
                    </p>
                  </div>
                  <div className="card_container">
                    <div className="card_elements">
                      <div className="card_elements_section">
                        <div className="cards">
                          <div className="icon">
                            <BiSolidPlane />
                          </div>
                          <h5>Aerospace & Defense</h5>
                          <p>
                            The Aerospace & Defense industry requires innovative
                            supply chain solutions for their unique demands.
                          </p>
                        </div>
                        <div className="cards">
                          <div className="icon">
                            <GiAutoRepair />
                          </div>
                          <h5>Automative</h5>
                          <p>
                            Our worldwide network for procurement, distribution
                            and aftermarket logistics ensures your components
                            and vehicles.
                          </p>
                        </div>
                        <div className="cards">
                          <div className="icon">
                            <FaGasPump />
                          </div>
                          <h5>Oil & Gas</h5>
                          <p>
                            When it comes to managing the logistics of oil and
                            gas, safety and efficiency are the greatest
                            concerns.
                          </p>
                        </div>
                        <div className="cards">
                          <div className="icon">
                            <IoDiamondSharp />
                          </div>
                          <h5>Retail & Fashion</h5>
                          <p>
                            Speed, flexibility, and efficiency are the key in
                            the retail industry. That’s why numerous retailers
                            across the globe.
                          </p>
                        </div>
                        <div className="cards">
                          <div className="icon">
                            <MdOutlineHealthAndSafety />
                          </div>
                          <h5>Healthcare</h5>
                          <p>
                            The reliable delivery of healthcare products can be
                            lifesaving. Which is why we develop supply chain
                            solutions.
                          </p>
                        </div>
                        <div className="cards">
                          <div className="icon">
                            <GiSodaCan />
                          </div>
                          <h5>Consumer</h5>
                          <p>
                            Logisco has an in-depth understanding of the
                            consumer industry and offers innovative.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
