import  { useState } from "react";
export const TopBar = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  return (
    <div className="topbar">
      <div className="topbar_container">
        <div className="topbar_container_section">
          <div className="topbar_container_section_left">
            <p className="language_selector" onClick={toggleLanguageDropdown}>
              language <i className="fa-solid fa-sort-down fa-sm"></i>
              {showLanguageDropdown && (
                <ol className="language_selector_dropdown">
                  <li>English</li>
                  <li>Español</li>
                  <li>中文 (简体)</li>
                  <li>한국어</li>
                  <li>Français</li>
                  <li>Português</li>
                  <li>日本語</li>
                  <li>Tiếng Việt</li>
                  <li>हिंदी</li>
                  <li>Deutsch</li>
                </ol>
              )}
            </p>
            <p className="email">
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto: info@seabed2crest.com">info@seabed2crest.com</a>
            </p>
            <p>
              <i className="fa-solid fa-phone fa-sm"></i>+91 7349368311
            </p>
          </div>
          <div className="topbar_container_section_right">
            <div className="social_media">
              <a
                href="https://www.facebook.com/profile.php?id=61553225352683"
                target="_blank"
              >
                <i className="fa-brands fa-facebook fa-md"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/nandu-bus-2755622aa/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin fa-md"></i>
              </a>
              <a href="https://twitter.com/NanduBus" target="_blank">
                <i className="fa-brands fa-x-twitter fa-md"></i>
              </a>
              <a href="https://www.instagram.com/nandu_bus/" target="_blank">
                <i className="fa-brands fa-instagram fa-md"></i>
              </a>
            </div>
            <div className="Book_Demo">
              <button type="button">Book a Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
