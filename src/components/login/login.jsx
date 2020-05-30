import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
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
            return response.json();
          } else {
            return "unable to login";
          }
        })
        .then((data) => {
          if (data === "unable to login") {
            alert("Unable to Login. Username and/or password are incorrect.");
          } else {
            alert("Welcome back " + data.firstName);
          }
        });
    },
  });

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
        <div class="alert alert-warning" role="alert">
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
        <div class="alert alert-warning" role="alert">
          {formik.errors.password}
        </div>
      ) : null}
      <br></br>
      <button type="submit" class="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default UserLogin;
