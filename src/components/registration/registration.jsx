import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserRegistration = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <div class="alert alert-warning" role="alert">
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
        <div class="alert alert-warning" role="alert">
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
        <div class="alert alert-danger" role="alert">
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
        I have read and agree to the Terms and Conditions and Privacy Policy
      </div>
      {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
        <div class="alert alert-info" role="alert">
          {formik.errors.agreeToTerms}
        </div>
      ) : null}
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRegistration;
