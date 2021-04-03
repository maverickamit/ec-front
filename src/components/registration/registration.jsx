import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import "./registration.css";
import styles from "./registration.module.css";

const UserRegistration = ({ userStore }) => {
  const [alert, setAlert] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };

  function uncheck() {
    if (document.getElementById("agreeToTerms").checked === true) {
      document.getElementById("agreeToTerms").checked = false;
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required")
        .test("alphabets", "Name must only contain alphabets", (value) => {
          return /^[A-Za-z]+$/.test(value);
        }),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required")
        .test("alphabets", "Name must only contain alphabets", (value) => {
          return /^[A-Za-z]+$/.test(value);
        }),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Seems a bit short...")
        .max(15, "Try a shorter password."),
      confirmPassword: Yup.string()
        .label("Confirm password")
        .test("passwords-match", "Passwords don't match", function (value) {
          return this.parent.password === value;
        }),
      agreeToTerms: Yup.boolean()
        .label("Terms")
        .test(
          "is-true",
          "Must agree to terms to continue",
          (value) => value === true
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      userStore.setIsLoading(true);
      fetch(prodUrl + "/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          userStore.setIsLoading(false);

          if (response.status === 201) {
            resetForm(initialValues);
            uncheck();
            return response.json();
          } else {
            return "unable to register";
          }
        })
        .then((data) => {
          if (data === "unable to register") {
            setAlert("Unable to Register. Email already in use.");
          } else {
            setAlert(
              data.user.firstName +
                ", you are successfully registered. You can login now. Please verify your email within 24 hours."
            );
          }
        });
    },
  });

  return (
    <div class="global-container">
      <div className={"card " + styles.signupCard}>
        <div class="card-body">
          <h3 class="card-title text-center">Sign Up with EverChange</h3>
          <div class="card-text" />
          <form className={styles.inputForm} onSubmit={formik.handleSubmit}>
            <div className="form-group ">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.firstName}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control "
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.lastName}
              </div>
            ) : null}
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="alert alert-danger" role="alert">
                {formik.errors.confirmPassword}
              </div>
            ) : null}

            <div>
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.agreeToTerms}
              />{" "}
              I have read and agree to the Terms and Conditions and Privacy
              Policy
            </div>

            {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
              <div className="alert alert-info" role="alert">
                {formik.errors.agreeToTerms}
              </div>
            ) : null}
            <br />
            {userStore.isLoading ? (
              <button
                type="submit"
                className="btn btn-primary"
                disabled
                onMouseDown={(e) => e.preventDefault()}
              >
                Loading..
                <span
                  class="spinner-grow spinner-grow-sm"
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
                Submit
              </button>
            )}
            <br />
            <br />

            {alert === "Unable to Register. Email already in use." ? (
              <div className="alert alert-danger" role="alert">
                {alert}
              </div>
            ) : null}

            {alert !== "Unable to Register. Email already in use." &&
            alert !== "" ? (
              <div className="alert alert-success" role="alert">
                {alert}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(UserRegistration);
