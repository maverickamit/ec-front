import React from "react";
import { observer } from "mobx-react";
import "./settings.css";
import { prodUrl } from "../urls";
import { useState } from "react";
import fetchUser from "../modules/fetchUser";
import { useFormik } from "formik";
import * as Yup from "yup";

const settingsPage = ({ userStore }) => {
  return <h1>Settings Page</h1>;
};

export default observer(settingsPage);
