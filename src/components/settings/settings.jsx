import React from "react";
import { observer } from "mobx-react";
import "./settings.css";
import { prodUrl } from "../urls";
import { useState } from "react";
import fetchUser from "../modules/fetchUser";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};
const SettingsPage = ({ userStore }) => {
  // const [alert, setAlert] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(prodUrl + "/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.token,
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.newPassword,
          oldPassword: values.currentPassword,
        }),
      }).then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("successful update");
        } else {
          alert("unsuccessful update");
        }
      });
    },
  });

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Update Details</h3>
          <div className="card-text" />
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">First Name</label>
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
              <label htmlFor="name">Last Name</label>
              <input
                className="form-control"
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
                type="text"
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
              <label htmlFor="currentPassword">Current Password</label>
              <input
                className="form-control"
                id="currentPassword"
                name="currentPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
              />
            </div>
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.currentPassword}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="form-control"
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.newPassword}
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
                Update
              </button>
            )}
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

export default observer(SettingsPage);
