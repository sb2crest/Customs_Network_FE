import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../assets/sass/components/_login_signup.scss";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or User Id is required"),
    password: Yup.string().required("password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldTouched,
  } = formik;

  const UserLogin = () => {
    axios
      .post("http://localhost:8081/api/v1/auth/authenticate", values)
      .then((res) => {
        console.log(res.data);
        if (res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          navigate("/user-page", {
            state: {
              accessToken: res.data.access_token,
              userId: res.data.user_id,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="signup">
      <div className="signup_container">
        <div className="signup_container_section">
          <div className="signup_container_section_left">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="content">
              <h5>Welcome to Border Comply</h5>
              <p>
                Ensuring adherence to regulations and procedures when crossing
                borders for the smooth and lawful movement of goods and people
              </p>
            </div>
          </div>
          <div className="signup_container_section_right">
            <div className="form_container">
              <div className="form_container_heading">
                <h3>Login</h3>
                <p>Sign into your Account</p>
                <div className="form_container_heading_section">
                  <form onSubmit={handleSubmit}>
                    <div className="input_container">
                      <input
                        id="email"
                        type="text"
                        placeholder="Email or User Id"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("email", true)}
                      />
                      {touched.email && errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </div>
                    <div className="input_container">
                      {" "}
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("password", true)}
                      />
                      {touched.password && errors.password && (
                        <div className="error-message">{errors.password}</div>
                      )}
                    </div>
                    <p className="forgot_password">Forgot Password?</p>
                    <button type="button" onClick={UserLogin}>
                      Login
                    </button>
                    <p className="toggle_sentence">
                      Don't have an account?{" "}
                      <Link to="/signup">Register here</Link>{" "}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
