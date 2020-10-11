import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { prodUrl } from "../urls";
import "./forgotPassword.css";


const ForgotPassword = ({ userStore }) => {
        
    return (
        <h2>Forgot ForgotPassword</h2>
    )

};

export default observer(ForgotPassword);
