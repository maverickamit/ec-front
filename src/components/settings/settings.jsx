import React, { useState } from "react";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import fetchUser from "../modules/fetchUser";
import { useFormik } from "formik";
import { DragDrop } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import { Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Switch,
  Stack,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import NotificationModal from "../modal/notification";
import "./settings.css";
import styles from "./settings.module.css";

const SettingsPage = ({ userStore }) => {
  const history = useHistory();

  const uppy = new Uppy({
    autoProceed: true,
  });

  uppy.use(XHRUpload, {
    endpoint: prodUrl + "/users/me/avatar",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
    fieldName: "avatar",
    formData: true,
  });

  uppy.on("upload-error", (file, error, response) => {
    userStore.setNotification("Please choose an image file of size below 1 MB");
    userStore.setIsNotification(true);
  });

  uppy.on("upload-success", (file, response) => {
    history.push("/profile/settings");
  });

  const initialValues = {
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
    email: userStore.user.email,
    currentPassword: "",
    newPassword: "",
  };

  const handleLogoutAllDevices = () => {
    fetch(prodUrl + "/users/logoutAll", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    }).then((res) => {
      if (res.status === 200) {
        userStore.setNotification(
          "You have successfully logged out from all sessions."
        );
      } else {
        userStore.setNotification("There has been an error.");
      }
      userStore.setIsNotification(true);
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(prodUrl + "/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.token,
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.newPassword,
          oldPassword: values.currentPassword,
        }),
      }).then((response) => {
        if (response.status === 200) {
          userStore.setNotification("Successfully updated details.");
          fetchUser({ userStore });
        } else {
          userStore.setNotification(
            "Unsuccessful update. Please use correct password."
          );
        }
      });
      userStore.setIsNotification(true);
    },
  });

  const [checked, setChecked] = useState(userStore.user.bankLinked);

  const handleAccountLinkButton = async () => {
    const resp = await fetch(prodUrl + "/users/banking/plaiddelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    });
    if (resp.status === 400) {
      userStore.setNotification("Please verify bank account first.");
    } else if (resp.status === 500) {
      userStore.setNotification("Error. Please try again after some time.");
    } else {
      setChecked(!checked);
      userStore.setNotification("Bank account linking status updated!");
    }
    fetchUser({ userStore });
    userStore.setIsNotification(true);
  };

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <NotificationModal userStore={userStore} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={3}
          marginBottom={3}
        >
          <Grid item xs={6}>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={`${prodUrl}/users/${
                userStore.user._id
              }/avatar?${global.Date.now()}`}
              s
            />
          </Grid>
          <Grid item xs={6}>
            <DragDrop
              uppy={uppy}
              locale={{
                strings: {
                  dropHereOr: " Update Avatar",
                  browse: "browse",
                },
              }}
            />
          </Grid>
        </Grid>

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
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
            helperText={formik.errors.currentPassword}
            error={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            helperText={formik.errors.newPassword}
            error={formik.touched.newPassword && formik.errors.newPassword}
          />
          <LoadingButton
            className={styles.updateBtn}
            loading={userStore.isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </LoadingButton>
        </Box>
      </Box>
      <LoadingButton
        className={styles.logoutAllbtn}
        onClick={handleLogoutAllDevices}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log out from all sessions
      </LoadingButton>
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
        <Typography> Bank Account Unlinked</Typography>
        <Switch
          checked={checked}
          onChange={handleAccountLinkButton}
          color="success"
        />
        <Typography> Bank Account Linked</Typography>
      </Stack>
    </Container>
  );
};

export default observer(SettingsPage);
