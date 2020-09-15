import React from "react";
import { observer } from "mobx-react";
import "./settings.css";
import { prodUrl } from "../urls";
import { useState } from "react";
import fetchUser from "../modules/fetchUser";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  billingAddress: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};
const SettingsPage = ({ userStore }) => {
  const [alert, setAlert] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string(),
    }),
  });

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Update Details</h3>
          <div className="card-text" />
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.name}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="billingAddress">Billing Address</label>
              <textarea
                className="form-control"
                id="billingAddress"
                name="billingAddress"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.billingAddress}
              />
            </div>
            {formik.touched.billingAddress && formik.errors.billingAddress ? (
              <div className="alert alert-warning" role="alert">
                {formik.errors.billingAddress}
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
