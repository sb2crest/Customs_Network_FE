import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { axiosPrivate1 } from "../services/apiService";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { isValidEmail } from "../utilities/global";
import { IoIosWarning } from "react-icons/io";

const LOGIN_URL = "/api/v1/auth/authenticate";
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFocus = () => {
    setIsActive(true);
  };
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
      const userInput = values.email.replace(/\s/g, "");
      const isEmail = isValidEmail(userInput);
      const data = isEmail
        ? { email: userInput, password: values.password }
        : { userId: userInput, password: values.password };
      const response = await axiosPrivate1.post(
        LOGIN_URL,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const role = response?.data?.role;
      setAuth({ values, role, accessToken, refreshToken });
      navigate(response.data.role === "ADMIN" ? "/admin-page" : "/user-page", {
        state: {
          accessToken: response.data.access_token,
          userId: response.data.user_id,
          isPortDetails: response.data.isPortDetails,
        },
      });
    } catch (err) {
      console.log("Login failed", err);
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup_container">
        <div className="signup_container_section">
          <div className="signup_container_section_right">
            <img src={logo} alt="logo" width={220} height={50} />
            <div className="form_container">
              <div className="form_container_heading">
                <h3 style={{color:"#01a7c2"}}>
                  Log<span style={{ color: "#A3BAC3" }}>in</span>
                </h3>
                <div className="form_container_heading_section">
                  <div className="popup">
                    {errorMessage && (
                      <p style={{ textAlign: "center", color: "red" }}>
                        <IoIosWarning style={{ marginRight: "10px",fontSize:"22px" }} />
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="input_container">
                      <TextField
                        id="email"
                        name="email"
                        className="custom-placeholder"
                        placeholder="Email or User Id"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={() => setFieldTouched("email", true)}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="standard"
                        fullWidth
                        required
                        InputProps={{
                          style: { fontWeight: "500",fontSize:"14px" },
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon sx={{color:"#007090"}}/>
                            </InputAdornment>
                          ),
                        }}
                        onFocus={handleFocus}
                        sx={{
                          "& .MuiInput-underline:after": {
                            borderBottomColor: isActive ? "#757575" : "",
                          },
                        }}
                      />
                    </div>
                    <div className="input_container">
                      <TextField
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formik.values.password}
                        required
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("password", true)}
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: { fontWeight: "500",fontSize:"14px" },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff sx={{color:"#007090"}}/>
                                ) : (
                                  <VisibilityIcon sx={{color:"#007090"}}/>
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        onFocus={handleFocus}
                        sx={{
                          "& .MuiInput-underline:after": {
                            borderBottomColor: isActive ? "#757575" : "",
                          },
                        }}
                      />
                    </div>
                    <p className="forgot_password">Forgot Password?</p>
                    <div className="submit">
                      <button type="submit">Login</button>
                    </div>
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
