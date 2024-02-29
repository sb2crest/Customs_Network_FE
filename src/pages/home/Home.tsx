import React from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import GppGoodIcon from "@mui/icons-material/GppGood";
import "../../assets/sass/pages/_home.scss";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import map from "../../assets/images/map.jpg";
import Banner from "../../components/Banner";
const Home = () => {
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
                      <img src="" alt="IMAGE" />
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
                    <div className="items">
                      <LocalShippingIcon className="service_icon" />
                      <p className="heading">LAND TRANSPORT</p>
                      <p className="content">1000+ Trucks in 120 Cities</p>
                    </div>
                    <div className="items">
                      <FlightIcon className="service_icon" />
                      <p className="heading">Air Freight</p>
                      <p className="content">120+ Aircrafts in 30 Cities</p>
                    </div>
                    <div className="items">
                      <DirectionsBoatIcon className="service_icon" />
                      <p className="heading">Ocean Freight</p>
                      <p className="content">6000+ Containers in 20 Ports</p>
                    </div>
                    <div className="items">
                      <DirectionsSubwayIcon className="service_icon" />
                      <p className="heading">Smart Warehouses</p>
                      <p className="content">Cover 1,000,000 sqm.</p>
                    </div>
                  </div>
                  <div className="services_container_details_description">
                    <div className="services_container_details_description_container">
                      <div className="left">
                        <p className="heading">Land Transport</p>
                        <p className="content">1000+ Trucks in 120 Cities</p>
                      </div>
                      <div className="right">
                        <p className="first">
                          Logisco Ground’s flexible model, using only quality
                          carriers, means you benefit from improved service
                          levels, greater flexibility and time-definite
                          deliveries. Our expertise in transport management and
                          planning allows us to design.
                        </p>
                        <p className="second">
                          Through our global network of control towers and
                          state-of-the-art technology, we are able to monitor
                          and dynamically react to situations such as adverse
                          weather, additional pick ups or drop offs, or heavy
                          traffic, meaning that your goods are always traveling
                          the most efficient route.Our non-asset based Road
                          network provides you with flexibility, improved
                          service levels.
                        </p>
                        <div className="more_details">
                          <button type="button" className="moreDetails">
                            MORE Details
                          </button>
                          <button type="button" className="downloadPdf">
                            <i className="fa-solid fa-download"></i>DOWNLOAD PDF
                          </button>
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
