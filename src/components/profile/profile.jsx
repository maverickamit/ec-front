import React, { useState } from "react";
import { observer } from "mobx-react";
import DataTable from "./transactionsTable/table";
import CurrentCharity from "./currentCharity/currentCharity";
import NotificationModal from "../modal/notification";
import WelcomeHeader from "./welcomeHeader/welcomeHeader";
import LinkedAccountInfo from "./linkedAccountInfo/linkedAccountInfo";
import "./profile.css";
const UserProfile = ({ userStore }) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-10">
      <div className="well well-sm">
        <div className="row mt-5">
          <NotificationModal userStore={userStore} />
        </div>
        <WelcomeHeader userStore={userStore} />
        <LinkedAccountInfo userStore={userStore} />
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
