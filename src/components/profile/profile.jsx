import React from "react";
import { observer } from "mobx-react";
import "./profile.css";
import { Redirect } from "react-router-dom";
import { prodUrl } from "../urls";
import Link from "../link/link";
import DataTable from "./table";
import { useState } from "react";
import fetchUser from "../modules/fetchUser";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { DragDrop } from "@uppy/react";

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

  uppy.on("upload-success", (file, response) => {
    console.log("uploaded");
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

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }
  if (userStore.loggedIn & (userStore.user.firstName == null)) {
    console.log("fetching data again because of page refresh");
    fetchUser({ userStore });
  }
  if (!userStore.user.firstName) {
    return <p>Please wait</p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="well well-sm">
            <div className="row">
              <div className="col-sm-6 col-md-4 ">
                <div className="d-flex justify-content-center">
                  <img
                    src={`${prodUrl}/users/${userStore.user._id}/avatar`}
                    alt=""
                    className="rounded-circle img-fluid "
                  />
                </div>
                <br />
                <div className="d-flex justify-content-center btn">
                  <DragDrop
                    uppy={uppy}
                    locale={{
                      strings: {
                        dropHereOr: "Update Avatar",
                        browse: "browse",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-8">
                <h4>{`${userStore.user.firstName} ${userStore.user.lastName}`}</h4>

                <p>
                  {userStore.user.email}
                  <span
                    className={`${
                      userStore.user.emailVerified
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >{`${
                    userStore.user.emailVerified
                      ? `(verified)`
                      : `(not verified)`
                  }`}</span>
                </p>

                {userStore.user.emailVerified == false && emailReset == false && (
                  <button
                    className="btn btn-primary"
                    style={{ marginBottom: "15px" }}
                    onClick={handleResendButton}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    Resend Verification Email
                  </button>
                )}
                {userStore.user.emailVerified == false && emailReset == true && (
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

                <div>
                  <Link userStore={userStore} />
                  <br />
                  <br />
                  <DataTable userStore={userStore} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default observer(UserProfile);
