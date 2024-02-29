import "../../assets/sass/components/_topbar.scss";

export const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar_container">
        <div className="topbar_container_section">
          <div className="topbar_container_section_left">
            <p>
              language{" "}
              <i
                className="fa-solid fa-sort-down fa-sm"
                style={{ marginLeft: "5px", marginTop: "-3px" }}
              ></i>
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>
              info@seabed2crest.com
            </p>
            <p>
              <i className="fa-solid fa-phone fa-sm"></i>+91 7349368311
            </p>
          </div>
          <div className="topbar_container_section_right">
            <div className="social_media">
              <i className="fa-brands fa-facebook fa-sm"></i>
              <i className="fa-brands fa-linkedin fa-sm"></i>
              <i className="fa-brands fa-x-twitter fa-sm"></i>
              <i className="fa-brands fa-instagram fa-sm"></i>
            </div>
            <div className="Book_Demo">
              <button type="button">Book a Demo</button>
            </div>
          </div>
        </div>
      </div>
      <img src="" alt="" />
      <img src="" alt="" />
      <img src="" alt="" />
    </div>
  );
};
