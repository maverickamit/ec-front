import React from "react";
import { observer } from "mobx-react";

const UserProfile = ({ userStore }) => {
  var user = { firstName: "Please" };
  var user = userStore.user.user;

  if (!userStore.loggedIn) {
    return (
      <div>
        <h1>Please Login First</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
    </div>
  );
};

export default observer(UserProfile);
