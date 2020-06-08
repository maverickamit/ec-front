import React from "react";
import { observer } from "mobx-react";
import "./profile.css";

const UserProfile = ({ userStore }) => {
  var user = { firstName: "Please" };
  var user = userStore.user.user;

  if (!userStore.loggedIn) {
    return (
      <div>
        <h5>Please Login First</h5>
      </div>
    );
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
                    src="http://placehold.it/380x380"
                    alt=""
                    className="rounded-circle img-fluid "
                  />
                </div>
                <br />
                <br />
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-primary">
                    Update Picture
                  </button>
                </div>
              </div>
              <div className="col-sm-6 col-md-8">
                <h4>{`${userStore.user.user.firstName} ${userStore.user.user.lastName}`}</h4>

                <p>{userStore.user.user.email}</p>
                <div>
                  <button type="button" className="btn btn-primary">
                    Link Bank Account
                  </button>
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
