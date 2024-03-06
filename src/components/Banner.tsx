import "../assets/sass/components/_banner.scss";
const Banner = () => {
  return (
    <div className="banner">
      <div className="banner_container">
        <div className="banner_container_section">
          <div className="banner_container_section_left">
            <p className="heading">
              We Provide One Stop Logistic & Warehousing Services .
            </p>
            <p className="content">Guaranteed by more than a hundred awards</p>
            <button>LEARN MORE</button>
          </div>
          <div className="banner_container_section_right">
            <div className="form-box">
              <div className="header-text">
                Enquire Now
                <p className="header-content">We will get back to you within 24 hours.</p>
              </div>
              <input placeholder="Full Name" type="text" />
              <input placeholder="Email" type="text" />
              <input placeholder="Phone Number" type="text" />
                <textarea name="message" placeholder="Message"></textarea>            
              <button>Submit Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
