import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import NotificationModal from "../modal/notification";
import Select from "react-select";

import fetchUser from "../modules/fetchUser";
import { prodUrl } from "../urls";
import "./updateCharity.css";
import styles from "./updateCharity.module.css";

const UpdateCharityPage = ({ userStore }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const updateCharityWidth = isTabletOrMobile ? "col-md-9" : "col-md-10";

  const [options, setOptions] = useState([]);
  const [currentCharity, setCurrentCharity] = useState("");

  //this fetches list of charities to display on dropdown menu

  useEffect(() => {
    const getValues = async () => {
      try {
        const response = await axios.get(prodUrl + "/users/charities");
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getValues();
  }, []);

  //this fetches and displays the current charity selected by the user

  useEffect(() => {
    const getCurrentCharity = async () => {
      try {
        const response = await axios.get(prodUrl + "/users/charities");
        const result = response.data.filter(
          (item) => item.value === userStore.user.currentCharity.id
        );
        setCurrentCharity(result[0].label);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentCharity();
  }, [userStore.user.currentCharity.id]);

  if (!userStore.loggedIn) {
    return <Redirect to="/" />;
  }

  const SelectField = ({ field, form, options }) => (
    <Select
      options={options}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ""
      }
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
    />
  );

  return (
    <div className={`col-xs-12 col-sm-12 ${updateCharityWidth} `}>
      <NotificationModal userStore={userStore} />
      <div
        className={
          isMobile ? styles.updateCharityCardMobile : styles.updateCharityCard
        }
      >
        <div className="card-body">
          <h3 className="card-title text-center">Update Charity</h3>
          <div className="card-text" />
          <Formik
            initialValues={{
              charityId: userStore.user.currentCharity.id,
            }}
            onSubmit={(values, actions) => {
              axios
                .patch(
                  prodUrl + "/users/me/charity",
                  { charityId: values.charityId },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + userStore.token,
                    },
                  }
                )
                .then(() => {
                  userStore.setNotification("Current charity updated!");
                  userStore.setIsNotification(true);
                });
            }}
          >
            {(props) => (
              <Form className={styles.inputForm}>
                <div className="form-group">
                  <label htmlFor="charityList">
                    Select charity from the dropdown menu
                  </label>
                  <Field
                    name={"charityId"}
                    component={SelectField}
                    options={options}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <br></br>
          <div>
            <span className="currentCharity">Current charity: </span>
            {currentCharity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UpdateCharityPage);
