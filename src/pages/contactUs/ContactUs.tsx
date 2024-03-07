import { Link } from "react-router-dom";
import "../../assets/sass/pages/_contactUs.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });
  return (
    <div className="contactus">
      <div className="contactus_container">
        <div className="contactus_container_section">
          <div className="contactus_container_section_banner">
            <h1>Contact Us</h1>
            <p>Get In Touch</p>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="contactus_container_section_content">
            <div className="contactus_container_section_content_container">
              <h1>Contact Details</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="card ">
                    <div className="card-body  ">
                      <i
                        className="fas fa-envelope fa-2xl"
                        style={{ marginTop: "1px" }}
                      ></i>
                      <h5 className="card-title">Email</h5>
                      <a
                        href="mailto: info@seabed2crest.com"
                        className="card-text"
                      >
                        info@seabed2crest.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <i
                        className="fas fa-phone fa-2xl "
                        style={{ marginBottom: "1px" }}
                      ></i>
                      <h5 className="card-title">Phone</h5>
                      <p className="card-text">
                        <a href="tel:+91 7349368311">+91 7349368311</a>
                      </p>
                      <p className="card-text">
                        <a href="tel:+91 7979699428">+91 7204641716</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <i
                        className="fas fa-map-marker-alt fa-2xl "
                        style={{ marginBottom: "1px" }}
                      ></i>
                      <h5 className="card-title">Address</h5>
                      <p>
                        <a
                          href="https://maps.app.goo.gl/QUzokAf5EQ1aUYip8"
                          target="_blank"
                        >
                          ⇢ #584 (Seabed2Crest Pvt Ltd) near Suryodaya School,
                          Hesaraghatta hobli, Rajanukunte, Yelahanka Taluk
                          Bengaluru North, Karnataka - 560064
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contactus_container_section_content_form">
              <form onSubmit={formik.handleSubmit}>
                <h1>Leave us your info</h1>
                <p>and we will get back to you</p>
                <div className="form-group">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="error">{formik.errors.fullName}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                  />
                  {formik.touched.subject && formik.errors.subject ? (
                    <div className="error">{formik.errors.subject}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="error">{formik.errors.message}</div>
                  ) : null}
                </div>
                <button type="submit">Submit Now</button>
              </form>
            </div>
            <div className="contactus_container_section_content_map">
              <iframe
                width="100%"
                height="350"
                title="Google Map"
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248706.23293304237!2d77.4354634775776!3d13.096975400000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19d7fe915333%3A0xcdb2c8559a5ac17!2sSeabed2Crest%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1693902576904!5m2!1sen!2sin"
              ></iframe>
            </div>
            <div className="contactus_container_section_content_social">
              <div className="social_media">
                <a
                  href="https://www.facebook.com/profile.php?id=61553225352683"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/nandu-bus-2755622aa/"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin fa-xl"></i>
                </a>
                <a href="https://twitter.com/NanduBus" target="_blank">
                  <i className="fa-brands fa-x-twitter fa-xl"></i>
                </a>
                <a href="https://www.instagram.com/nandu_bus/" target="_blank">
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
