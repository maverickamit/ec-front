import React from "react";
import { observer } from "mobx-react";
import "./profile.css";
import { Redirect } from "react-router-dom";
import { prodUrl } from "../urls";
import Link from "../link/link";

const UserProfile = ({ userStore }) => {
  const handleResendButton = () => {
    fetch(prodUrl + "/users/authenticate", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    });
  };

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }
  if (userStore.loggedIn & (userStore.user.firstName == null)) {
    console.log("fetching data again because of page refresh");

    fetch(prodUrl + "/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return "unable to login";
        }
      })
      .then((data) => {
        if (data === "unable to login") {
          console.log("running");
          userStore.setLoggedIn(false);
          alert("Session Expired.Login again.");
        } else {
          userStore.setUser(data);
          console.log(userStore.user.firstName);
        }
      });
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
                    src={`http://localhost:3000/users/${userStore.user._id}/avatar`}
                    alt=""
                    className="rounded-circle img-fluid "
                  />
                </div>
                <br />
                <br />
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {" "}
                    Update Picture
                  </button>
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

                {userStore.user.emailVerified == false && (
                  <button
                    className="btn btn-primary"
                    style={{ marginBottom: "15px" }}
                    onClick={handleResendButton}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    Resend Verification Email
                  </button>
                )}

                <div>
                  <Link />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UserProfile);
