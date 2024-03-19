import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from '../hooks/useAuth';
import {axiosPrivate1} from '../services/apiService';
const LOGIN_URL = '/api/v1/auth/authenticate';
const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();


  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or User Id is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      UserLogin();
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

  const UserLogin = async () => {
    try {
      const response = await axiosPrivate1.post(LOGIN_URL,
        JSON.stringify(values),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const role = response?.data?.role;
      setAuth({ values, role, accessToken,refreshToken });
      navigate(response.data.role === "ADMIN" ? "/admin-page" : "/user-page", {
        state: {
          accessToken: response.data.access_token,
          userId: response.data.user_id,
        },
      });
    } catch (err) {
      console.log("Login failed", err)
    }
  }

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
                    <button type="submit">Login</button>
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
