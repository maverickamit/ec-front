import React, { useState } from "react";
import { observer } from "mobx-react";
import Link from "../../link/link";
import "./../profile.css";
import styles from "./../profile.module.css";
const LinkedAccountInfo = ({ userStore }) => {
  return (
    <div>
      {/* Account Linking Status*/}
      <div className="row mt-5">
        <div>
          <Link userStore={userStore} />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default observer(LinkedAccountInfo);
