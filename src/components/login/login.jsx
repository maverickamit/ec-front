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
import NotificationModal from "../modal/notification";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./login.css";
import styles from "./login.module.css";

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
      userStore.setIsLoading(true);
      fetch(prodUrl + "/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((response) => {
          userStore.setIsLoading(false);
          if (response.status === 200) {
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
            resetErrors();
          } else {
            setAlert("");
            userStore.setUser(data.user);
            userStore.setToken(data.token);
            userStore.setLoggedIn(true);
          }
        });
    },
  });

  const resetErrors = () => {
    setTimeout(() => setAlert(""), 3000);
  };

  if (userStore.loggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <NotificationModal userStore={userStore} />

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
          <LoadingButton
            loading={userStore.isLoading}
            className={styles.loginbtn}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link to="/registration">Sign Up Here</Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mt: 3, mb: 2 }}>
              {alert && <Alert severity="error">{alert}</Alert>}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default observer(UserLogin);
