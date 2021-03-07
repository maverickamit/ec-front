import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import "./forgotPassword.css";

const initialValues = {
  email: "",
};

const ForgotPassword = ({ userStore }) => {
  const [alert, setAlert] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      userStore.setIsLoading(true);
      fetch(prodUrl + "/users/forgotPassword", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      })
        .then((response) => {
          userStore.setIsLoading(false);
          if (response.status === 200) {
            resetForm(initialValues);
            return "successful";
          } else {
            return "unable to login";
          }
        })
        .then((data) => {
          if (data === "unable to login") {
            setAlert("Something went wrong. Please recheck your email.");
          } else {
            setAlert("Please check your email for the password reset link.");
          }
        });
    },
  });

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Forgot Password?</h3>
          <div className="card-text" />
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                className="form-control"
                id="email"
                name="email"
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
                className="btn btn-primary"
                onMouseDown={(e) => e.preventDefault()}
              >
                Reset Password
              </button>
            )}
            <br />
            <br />
            {alert ===
            "Please check your email for the password reset link." ? (
              <div className="alert alert-success" role="alert">
                {alert}
              </div>
            ) : null}
            {alert === "Something went wrong. Please recheck your email." ? (
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
export default observer(ForgotPassword);
