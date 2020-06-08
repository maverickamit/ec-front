import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const user = {
  name: "Roy",
};

return (
  <div>
    <h1>Welcome {user.name}</h1>
  </div>
);

export default UserLogin;
