import logo from "../../assets/images/logo.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_container_section">
          <div className="footer_section1">
            <div className="image_section">
              <img src={logo} alt="" />
            </div>
            <div className="content_section">
              <p>
                Logistco is one of the world’s leading logistics companies. Its
                strong market position lies in the seafreight, airfreight,
                contract logistics and overland businesses.
              </p>
            </div>
            <div className="social_section">
              <i className="fa-brands fa-facebook fa-lg"></i>
              <i className="fa-brands fa-linkedin fa-lg"></i>
              <i className="fa-brands fa-x-twitter fa-lg"></i>
              <i className="fa-brands fa-instagram fa-lg"></i>
            </div>
          </div>
          <div className="footer_section2">
            <p className="heading">Contact Info</p>
            <p className="content">
              Box 3233 <br /> 1810 Kings Way King Street,<br /> 5th Avenue, New York
            </p>
            <p className="phoneNumber">+1-2355-3345-5</p>
            <p className="email">contact@logiscocorp.com</p>
          </div>
          <div className="footer_section3">
            <p className="heading">Useful Links</p>
            <div className="links">
              <ul>
                <li>Our Services</li>
                <li>Industry Solutions</li>
                <li>Investor Relation</li>
                <li>Get A Quote</li>
                <li>Contact</li>
              </ul>
              <ul>
                <li>Case Study</li>
                <li>Seeking For Career</li>
                <li>Our Clients</li>
                <li>FAQ</li>
                <li>Media Relation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
