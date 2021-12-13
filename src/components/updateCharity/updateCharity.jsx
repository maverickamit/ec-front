import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NotificationModal from "../modal/notification";
import "./updateCharity.css";
import styles from "./updateCharity.module.css";

const UpdateCharityPage = ({ userStore }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const updateCharityWidth = isTabletOrMobile ? "col-md-9" : "col-md-10";

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className={"col-xs-12 col-sm-12 " + ` ${updateCharityWidth} `}>
      {" "}
      <NotificationModal userStore={userStore} />
      <div
        className={
          isMobile ? styles.updateCharityCardMobile : styles.updateCharityCard
        }
      >
        <div className="card-body">
          <h3 className="card-title text-center">Update Charity</h3>
          <div className="card-text" />
          <form
            className={styles.inputForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <label htmlFor="charityList">
                Select charity from the dropdown menu
              </label>
              <select
                className="form-control"
                id="currentCharity"
                name="currentCharity"
                type="text"
              >
                <option selected>Open this select menu</option>
                <option value="1">Wounded Warriors Project</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onMouseDown={(e) => e.preventDefault()}
            >
              Update
            </button>
          </form>
          <br></br>
          <div>
            <span className="currentCharity">Current charity: </span>
            {`Wounded Warriors Project`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UpdateCharityPage);
