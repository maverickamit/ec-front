import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { prodUrl } from "../../urls";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import "./../profile.css";
import styles from "./welcomeHeader.module.css";

const WelcomeHeader = ({ userStore }) => {
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
    window.location.reload();
  });

  const [emailReset, setEmailReset] = useState(false);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let num = 0;
    for (let i = 0; i < userStore.user.amountsCharged.length; i++) {
      num += userStore.user.amountsCharged[i].amount;
    }
    setSum(num / 100);
  });

  const handleResendButton = async () => {
    const response = await fetch(prodUrl + "/users/authenticate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    });
    if (response.status === 200) {
      userStore.setNotification("Verification Email Sent!");
      userStore.setIsNotification(true);
    } else {
      userStore.setNotification("There has been an error.");
      userStore.setIsNotification(true);
    }
  };

  return (
    <div className={`row mt-5 ${styles.header}`}>
      {/* User Avatar */}
      <div className="col-sm-4 col-md-2">
        <div className="d-flex justify-content-center">
          <img
            src={`${prodUrl}/users/${userStore.user._id}/avatar`}
            alt=""
            className={"rounded-circle img-fluid " + styles.avatar}
          />
        </div>
        <br />
        <div
          className={
            " d-flex justify-content-center btn " + styles.updateAvatarBtn
          }
        >
          <DragDrop
            uppy={uppy}
            locale={{
              strings: {
                dropHereOr: " Update Avatar",
                browse: "browse",
              },
            }}
          />
        </div>
      </div>

      {/* Basic Information */}
      <div className="col-sm-4 col-md-8">
        <h2>{`  Welcome back, ${userStore.user.firstName}! `}</h2>
        <p>
          {userStore.user.email}
          <span
            className={`${
              userStore.user.emailVerified ? "text-success" : "text-danger"
            }`}
          >{`${
            userStore.user.emailVerified ? `(verified)` : `(not verified)`
          }`}</span>
        </p>

        {userStore.user.emailVerified === false && emailReset === false && (
          <button
            className="btn btn-primary"
            style={{ marginBottom: "15px" }}
            onClick={handleResendButton}
            onMouseDown={(e) => e.preventDefault()}
          >
            Resend Verification Email
          </button>
        )}
      </div>
      {/* Total contributions */}
      <div className="col-sm-4 col-md-2">
        <div className="text-center">
          <p>Total Contribution</p>
          <h3>${sum}</h3>
        </div>
      </div>
    </div>
  );
};

export default observer(WelcomeHeader);
