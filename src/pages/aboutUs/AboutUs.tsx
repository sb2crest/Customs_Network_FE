import React from 'react';
import '../../assets/sass/pages/_aboutus.scss';
import worldmap from "../../assets/images/worldmap.jpg";
import { PiBoatThin } from "react-icons/pi";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import chooseus from "../../assets/images/choose-us.jpg"


const MissionStatement: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="mission-statement">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

const AboutUs: React.FC = () => {
  return (
    <div className='about-us'>
      <div className="about-us-container">
        <div className='heading'>
          About Us
        </div>
      </div>

      <div className="about-us-content">
        <div className="who-we-are-section">
          <div className="image-container">
            <div className="icon-container">
              <PiBoatThin className="icon" />
            </div>
            <img src={worldmap} alt="IMAGE" />
          </div>
          <div className='who-we-are-content'>
            <h3>Who Is Customs Network?</h3>
            <p>At Customs Network, we are a leading logistics and supply chain solutions provider,
              dedicated to revolutionizing the way goods move around the globe. With over a decade of experience,
              we specialize in custom clearance, freight forwarding, and supply chain management,
              offering tailored solutions that meet the unique needs of our clients.
              Our team of experts leverages the latest technology and industry insights to ensure your goods are delivered efficiently,
              safely, and on time.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statements section */}
      <div className='mission-content'>
        <div className='our-mission-section'>
          <h3>Our Mission</h3>
        </div>
        <div className='mission-container'>
        <div className="mission-statements">
          <div className='fast-service'>
            <AccessAlarmsIcon className='icons' />
            <MissionStatement
              title="Fast Service"
              description="A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy."
            />
          </div>
          <div className='fast-service'>
            <GppGoodIcon className='icons' />
            <MissionStatement
              title="100% Accuracy"
              description="A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy."
            />
          </div>
          <div className='fast-service'>
            <HeadsetMicOutlinedIcon className='icons' />
            <MissionStatement
              title="Safety & Guarantee"
              description="A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy."
            />
          </div>
        </div>
        <div className='mission-content-additional'>
          <p>
            We are deeply committed to enhancing community well-being, participating in and initiating projects that support local development,
            disaster relief efforts, and educational programs. 
          </p>
          <p>
            Our journey so far has been marked by a relentless pursuit of excellence and innovation. 
            We continually invest in the latest logistics technologies and training for our team, 
            ensuring that we are always at the forefront of the industry. 

          </p>
          <p> 
            We invite our clients, partners, and communities to join us as we navigate the challenges and opportunities ahead, working together to create a more connected and sustainable world.
          </p>
        </div>
      </div>
      </div>
      <div className='choose-us'>
        <div className='why-choose-us'>

          <div className='why-choose-us-content'>
            <h6 className='sub-heading'>WE ARE PASSIONATED ABOUT CUSTOMERS</h6>
            <h3>Why People Choose Us</h3>
            <div className='clipboard-img'>
            </div>
            <p> Our exceptional customer service sets us apart, ensuring that every interaction is smooth and satisfying.
              Our reliability and trustworthiness instill confidence in our clients, as we consistently deliver high-quality service and dependable solutions.
              Our meticulous attention to detail guarantees accuracy and customization to meet individual needs.
            </p>
            <p> Our ethical and sustainable practices demonstrate a responsibility not just to our clients but to the wider community and planet,
              aligning with the values of those we serve. By focusing on building a community rather than just a client base, we foster stronger,
              more meaningful relationships.
            </p>
          </div>
          <div className='why-choose-us-image-container'>
            <div className='why-choose-us-image'>
              <img src={chooseus} alt="Your Image Alt Text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;