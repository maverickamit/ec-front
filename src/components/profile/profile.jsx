import React, { useState } from "react";
import { observer } from "mobx-react";
import { prodUrl } from "../urls";
import Link from "../link/link";
import DataTable from "./transactionsTable/table";
import CurrentCharity from "./currentCharity/currentCharity";
import fetchUser from "../modules/fetchUser";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";
import NotificationModal from "../modal/notification";
import "./profile.css";
import styles from "./profile.module.css";
const UserProfile = ({ userStore }) => {
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

  const handleResendButton = () => {
    fetch(prodUrl + "/users/authenticate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    }).then((response) => {
      if (response.status === 200) {
        setEmailReset(true);
      } else {
        console.log("not successful");
      }
    });
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-10">
      <div className="well well-sm">
        <div className="row mt-5">
          <div>
            <NotificationModal userStore={userStore} />
          </div>

          {/* User Avatar */}
          <div className="col-sm-6 col-md-2">
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
          <div className="col-sm-6 col-md-8">
            <h4>{`${userStore.user.firstName} ${userStore.user.lastName}`}</h4>
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
            {userStore.user.emailVerified === false && emailReset === true && (
              <button
                className="btn btn-success"
                style={{ marginBottom: "15px" }}
                onClick={setTimeout(() => {
                  setEmailReset(false);
                }, 3000)}
                onMouseDown={(e) => e.preventDefault()}
              >
                Verification Email Sent!
              </button>
            )}
          </div>
        </div>

        {/* Account Linking Status*/}
        <div className="row mt-5">
          <div>
            <Link userStore={userStore} />
            <br />
            <br />
          </div>
        </div>
        <div className="row mt-5">
          {/* Recent Transactions*/}
          <div className="col-sm-6 col-md-6">
            <DataTable userStore={userStore} />
          </div>

          {/* Current Charity*/}
          <div className="col-sm-6 col-md-6">
            <CurrentCharity userStore={userStore} />
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default observer(UserProfile);
