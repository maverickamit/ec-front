import React, { useState } from "react";
import { observer } from "mobx-react";
import Sidebar from "../sidebar/sidebar";
import UserProfile from "../profile/profile";
import SettingsPage from "../settings/settings";
import fetchUser from "../modules/fetchUser";

import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
const Dashboard = ({ userStore }) => {
  const { url, path } = useRouteMatch();

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }
  if (userStore.loggedIn & (userStore.user.firstName == null)) {
    console.log("fetching data again because of page refresh");
    fetchUser({ userStore });
  }
  if (!userStore.user.firstName) {
    return <p>Loading.... Please wait.</p>;
  }
  return (
    <Router>
      <div className="container-fluid">
        <div className="row ">
          <Sidebar userStore={userStore} />
          <Switch>
            <Route
              path={`/profile/settings`}
              exact
              component={(props) => (
                <SettingsPage {...props} userStore={userStore} />
              )}
            />
            <Route
              path={`/profile`}
              exact
              component={(props) => (
                <UserProfile {...props} userStore={userStore} />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default observer(Dashboard);
