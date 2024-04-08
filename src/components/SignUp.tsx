import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../assets/sass/components/_login_signup.scss";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');
  const handleFocus = () => {
    setIsActive(true);
  };
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userId: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{10}$/,
        "UserID must be 10 characters alphanumeric."
      )
      .required("User ID is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userId: "",
      email: "",
      password: "",
      checkbox: false,
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

  const UserSignup = () => {
    axios
      .post("http://localhost:8081/api/v1/auth/register", values)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          formik.resetForm();
          setOpenPopup(true);
          setSignUpMessage("Registration successful");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data) {
          setOpenPopup(true);
          setSignUpMessage(err.response.data);
        } else {
          console.error("Unknown error occurred");
        }
      });
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
    setSignUpMessage('');
  };
  return (
    <div className="signup">
      <div className="signup_container">
        <div className="signup_container_section">
          <div className="signup_container_section_right">
          <img src={logo} alt="logo" width={220} height={50}/>
            <div className="form_container">
              <div className="form_container_heading">
                <h3>Sign <span style={{color:"#e53d34"}}>Up</span></h3>
                <div className="form_container_heading_section">
                  <form onSubmit={handleSubmit}>
                    <div className="input_container" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                       <TextField
                        id="firstName"
                        type="text"
                        name="firstName"
                        className="custom-placeholder"
                        placeholder="First Name"
                        required
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={() => setFieldTouched("firstName", true)}
                        error={formik.touched.firstName && !!formik.errors.firstName}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: { fontWeight: '600' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon />
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
                       <TextField
                        id="lastName"
                        type="text"
                        name="lastName"
                        className="custom-placeholder"
                        placeholder="Last Name"
                        required
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={() => setFieldTouched("lastName", true)}
                        error={formik.touched.lastName && !!formik.errors.lastName}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: { fontWeight: '600' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonIcon />
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
                        id="userId"
                        type="text"
                        name="userId"
                        className="custom-placeholder"
                        placeholder="User Id"
                        required
                        value={formik.values.userId}
                        onChange={formik.handleChange}
                        onBlur={() => setFieldTouched("userId", true)}
                        error={formik.touched.userId && !!formik.errors.userId}
                        helperText={formik.touched.userId && formik.errors.userId}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: { fontWeight: '600' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <VerifiedUserIcon />
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
                        id="email"
                        type="text"
                        name="email"
                        className="custom-placeholder"
                        placeholder="Email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={() => setFieldTouched("email", true)}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: { fontWeight: '600' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon />
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
                          style: { fontWeight: '600' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <VisibilityIcon />
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

                    <div className="checkbox_container ">
                      <input
                        id="checkbox"
                        type="checkbox"
                        required
                        checked={values.checkbox}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("checkbox", true)}
                      />
                      <label>I agree to the terms of service</label>
                    </div>
                    <div className="submit">
                      <button type="button" onClick={UserSignup}>
                        Sign Up
                      </button>
                    </div>

                    <p className="toggle_sentence">
                      Already a member? <Link to="/login">Login here</Link>{" "}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog onClose={handleClosePopup} open={openPopup}>
        <List sx={{ p: 2 }}>
          <ListItem disableGutters>
            <ListItemText primary={signUpMessage} />
          </ListItem>
        </List>
        <Button autoFocus onClick={handleClosePopup}>
          Close
        </Button>
      </Dialog>
    </div>
  );
};

export default SignUp;
