import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../assets/sass/components/_login_signup.scss";
import axios from "axios";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userId: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{10}$/,
        "User ID must be 10 characters with alphabets and numbers only"
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
              <h5>Welcome to Border Compliance</h5>
              <p>
                Ensuring adherence to regulations and procedures when crossing
                borders for the smooth and lawful movement of goods and people
              </p>
            </div>
          </div>
          <div className="signup_container_section_right">
            <div className="form_container">
              <div className="form_container_heading">
                <h3>Sign Up</h3>
                <p>Create an Account</p>
                <div className="form_container_heading_section">
                  <form onSubmit={handleSubmit}>
                    <div className="input_container">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("firstName", true)}
                      />
                      {touched.firstName && errors.firstName && (
                        <div className="error-message">{errors.firstName}</div>
                      )}
                    </div>
                    <div className="input_container">
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        required
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("lastName", true)}
                      />
                      {touched.lastName && errors.lastName && (
                        <div className="error-message">{errors.lastName}</div>
                      )}
                    </div>
                    <div className="input_container">
                      <input
                        id="userId"
                        type="text"
                        placeholder="User Id"
                        required
                        value={values.userId}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("userId", true)}
                      />
                      {touched.userId && errors.userId && (
                        <div className="error-message">{errors.userId}</div>
                      )}
                    </div>
                    <div className="input_container">
                      <input
                        id="email"
                        type="text"
                        placeholder="Email"
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

                    <button type="button" onClick={UserSignup}>
                      Sign Up
                    </button>
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
    </div>
  );
};

export default SignUp;
