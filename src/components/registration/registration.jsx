import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import "./registration.css";
import styles from "./registration.module.css";
import {
  Avatar,
  Alert,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  CssBaseline,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LoadingButton } from "@mui/lab";

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container>
            <Grid item xs={6} paddingRight={2}>
              <TextField
                margin="normal"
                required
                id="firstName"
                label="First Name"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                helperText={formik.errors.firstName}
                error={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                name="lastName"
                label="Last Name"
                id="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                helperText={formik.errors.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            helperText={formik.errors.email}
            error={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            helperText={formik.errors.password}
            error={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            helperText={formik.errors.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <FormControlLabel
            sx={{ mt: 3, mb: 2 }}
            control={
              <Checkbox
                margin="normal"
                required
                fullWidth
                name="agreeToTerms"
                label="Confirm Password"
                type="checkbox"
                id="agreeToTerms"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.agreeToTerms}
                helperText={formik.errors.agreeToTerms}
                error={
                  formik.touched.agreeToTerms && formik.errors.agreeToTerms
                }
              />
            }
            label="I have read and agree to the Terms and Conditions and Privacy Policy"
          />

          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <Alert severity="warning">{formik.errors.agreeToTerms}</Alert>
          )}

          <LoadingButton
            className={styles.signUpBtn}
            loading={userStore.isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link to="/">Log In Here</Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mt: 3, mb: 2 }}>
              {alert.includes("Email already in use") && (
                <Alert severity="error">{alert}</Alert>
              )}
              {alert.includes("successfully registered") && (
                <Alert>{alert}</Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default observer(UserRegistration);
