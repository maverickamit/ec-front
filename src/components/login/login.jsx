import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const UserLogin = ({ userStore }) => {
  const [alert, setAlert] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch("https://everchange-backend.herokuapp.com/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
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
            userStore.setUser(data);
            userStore.setLoggedIn(true);

            // alert(userStore.user.user.firstName);
          }
        });
    },
  });
  // const { redirect } = this.state;

  if (userStore.loggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
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
      <br></br>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <br></br>
      <br></br>
      <div class="alert-danger" role="alert">
        <p>{alert}</p>
      </div>
    </form>
  );
};

export default observer(UserLogin);
