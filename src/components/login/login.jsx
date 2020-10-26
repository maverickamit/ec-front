import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { prodUrl } from "../urls";
import "./login.css";

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = ({ userStore }) => {
  const [alert, setAlert] = useState("");

  const firstRun = true;
  if (firstRun) {
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      userStore.setIsLoading(true);
      fetch(prodUrl + "/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          userStore.setIsLoading(false);
          if (response.status == 200) {
            resetForm(initialValues);
            return response.json();
          } else {
            return "unable to login";
          }
        })
        .then((data) => {
          if (data === "unable to login") {
            setAlert(
              "Unable to Login. Username and/or password are incorrect."
            );
          } else {
            setAlert("");
            userStore.setUser(data.user);
            userStore.setToken(data.token);
            userStore.setLoggedIn(true);
          }
        });
    },
  });
  const resetErrors = (setErrors) => {
    setTimeout(() => setErrors({}), 3000);
  };
  // const { redirect } = this.state;

  if (userStore.loggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Log in to EverChange</h3>
          <div className="card-text" />
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.email}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.password}
              </div>
            ) : null}
            <br />
            {userStore.isLoading ? (
              <button
                type="submit"
                className="btn btn-primary"
                onMouseDown={(e) => e.preventDefault()}
              >
                Loading..
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button
                type="submit"
                id='loginbtn'
                className="btn btn-primary"
                onMouseDown={(e) => e.preventDefault()}
              >
                Login
              </button>
            )}
            <button
            id="forgotPasswordbtn"
                className="btn btn-primary"
              >
                <Link to="/forgot-password">Forgot Password?</Link>
              </button>
            <br />
            <br />
            {alert !== "" ? (
              <div className="alert alert-danger" role="alert">
                {alert}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(UserLogin);
