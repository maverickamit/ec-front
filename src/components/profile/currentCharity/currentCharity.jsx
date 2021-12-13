import React from "react";
import { observer } from "mobx-react";
import styles from "./currentCharity.module.css";
import { Link } from "react-router-dom";

const CurrentCharity = ({ userStore }) => {
  return (
    <div className={`container border border-grey ` + styles.charity}>
      <h6>Current Charity</h6>
      <h2 className={styles.charityname}>Wounded Warriors Project</h2>
      <div className="text-center">
        <button
          type="button"
          className={`btn btn-success mx-auto ` + styles.donation}
        >
          Make a Direct Donation!
        </button>
        <br></br>
        <Link className="nav-link" to="/profile/charity">
          Update Charity
        </Link>
      </div>
    </div>
  );
};

export default observer(CurrentCharity);
