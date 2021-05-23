import React from "react";
import { observer } from "mobx-react";
import styles from "./currentCharity.module.css";
const CurrentCharity = ({ userStore }) => {
  return (
    <div className={`container border border-grey ` + styles.charity}>
      <h5>Current Charity</h5>
      <h2 className={styles.charityname}>Wounded Warriors Project</h2>
      <div className="text-center">
        <button
          type="button"
          className={`btn btn-success mx-auto ` + styles.donation}
        >
          Make a Direct Donation!
        </button>
        <br></br>
        <a href="#">Update Charity</a>
      </div>
    </div>
  );
};

export default observer(CurrentCharity);
