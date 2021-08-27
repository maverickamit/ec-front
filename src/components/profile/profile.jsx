import React, { useState } from "react";
import { observer } from "mobx-react";
import DataTable from "./transactionsTable/table";
import CurrentCharity from "./currentCharity/currentCharity";
import NotificationModal from "../modal/notification";
import WelcomeHeader from "./welcomeHeader/welcomeHeader";
import LinkedAccountInfo from "./linkedAccountInfo/linkedAccountInfo";
import { useMediaQuery } from "react-responsive";
import "./profile.css";
import styles from "./profile.module.css";

const UserProfile = ({ userStore }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const profileWidth = isTabletOrMobile ? "col-md-9" : "col-md-10";
  const datatableWidth = isTabletOrMobile ? "col-md-12" : "col-md-6";
  const currentcharityWidth = isTabletOrMobile ? "col-md-12" : "col-md-6 ";

  return (
    <div
      className={"col-xs-12 col-sm-12 " + ` ${profileWidth} ${styles.profile}`}
    >
      <div className="well well-sm">
        <NotificationModal userStore={userStore} />
        <WelcomeHeader userStore={userStore} />
        <LinkedAccountInfo userStore={userStore} />
        <div className="row mt-5">
          {/* Recent Transactions*/}
          <div className={" mb-3 " + datatableWidth}>
            <DataTable userStore={userStore} />
          </div>
          {/* Current Charity*/}
          <div className={"mb-3 " + currentcharityWidth}>
            <CurrentCharity userStore={userStore} />
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
};

export default observer(UserProfile);
