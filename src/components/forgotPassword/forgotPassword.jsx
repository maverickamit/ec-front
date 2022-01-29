import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import {
  Avatar,
  Alert,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import KeyIcon from "@mui/icons-material/Key";
import "./forgotPassword.css";
import styles from "./forgotPassword.module.css";

const initialValues = {
  email: "",
};

const ForgotPassword = ({ userStore }) => {
  const [alert, setAlert] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      userStore.setIsLoading(true);
      fetch(prodUrl + "/users/forgotPassword", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
        }),
      })
        .then((response) => {
          userStore.setIsLoading(false);
          if (response.status === 200) {
            resetForm(initialValues);
            return "successful";
          } else {
            return "unable to reset";
          }
        })
        .then((data) => {
          if (data === "unable to reset") {
            setAlert(
              "Something went wrong. Please recheck your email address."
            );
          } else {
            setAlert("Please check your email for the password reset link.");
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
          <KeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            helperText={formik.errors.email}
            error={formik.touched.email && formik.errors.email}
          />

          <LoadingButton
            loading={userStore.isLoading}
            className={styles.forgotPasswordBtn}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link to="/">Log In Here</Link>
            </Grid>
            <Grid item>
              <Link to="/registration">Sign Up Here</Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mt: 3, mb: 2 }}>
              {alert.includes("password reset link") && <Alert>{alert}</Alert>}
              {alert.includes("Something went wrong") && (
                <Alert severity="error">{alert}</Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default observer(ForgotPassword);
