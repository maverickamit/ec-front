import { observer } from "mobx-react";
import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { prodUrl } from "../urls";
import fetchUser from "../modules/fetchUser";

const Link = ({ userStore }) => {
  async function createlinkInitializeToken() {
    if (userStore.linkInitializeToken === "") {
      let response = await fetch(prodUrl + "/users/banking/create_link_token", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.token,
        },
      });
      const link_token = await response.text();
      userStore.setLinkInitializeToken(link_token);
    }
  }

  useEffect(() => {
    createlinkInitializeToken();
  }, []);

  const onSuccess = useCallback((token, metadata) => {
    // send token to server
    if (!userStore.user.linkUpdateToken || !userStore.user.bankLinked) {
      fetch(prodUrl + "/users/banking/plaidverify", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.token,
        },
        body: JSON.stringify({
          PUBLIC_TOKEN: token,
          ACCOUNT_ID: metadata.account_id,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            fetchUser({ userStore });
            userStore.setNotification("Account is successfully linked");
            userStore.setIsNotification(true);
          } else {
            userStore.setNotification(
              "There has been an error in linking account"
            );
            userStore.setIsNotification(true);
          }
        })
        .catch((err) => {
          userStore.setNotification(
            "There has been an error in linking account"
          );
          userStore.setIsNotification(true);
          console.log(err);
        });
    } else {
      fetch(prodUrl + "/users/banking/plaidupdate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userStore.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            fetchUser({ userStore });
            userStore.setNotification("Account is successfully updated");
            userStore.setIsNotification(true);
          } else {
            userStore.setNotification(
              "There has been an error in updating account"
            );
            userStore.setIsNotification(true);
          }
        })
        .catch((err) => {
          userStore.setNotification(
            "There has been an error in updating account"
          );
          userStore.setIsNotification(true);
          console.log(err);
        });
    }
  }, []);

  const onExit = useCallback((err, metadata) => {
    if (!userStore.user.linkUpdateToken || !userStore.user.bankLinked) {
      if (err != null && err.error_code === "INVALID_LINK_TOKEN") {
        userStore.setLinkInitializeToken("");
        createlinkInitializeToken();
      }
    } else {
      if (err != null && err.error_code === "INVALID_LINK_TOKEN") {
        fetch(prodUrl + "/users/banking/create_link_token", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userStore.token,
          },
          body: JSON.stringify({
            mode: "update",
          }),
        }).then(() => {
          fetchUser({ userStore });
        });
      }
    }
  });

  if (!userStore.user.linkUpdateToken || !userStore.user.bankLinked) {
    var config = {
      token: userStore.linkInitializeToken,
      onSuccess,
      onExit,
    };
  } else {
    var config = {
      token: userStore.user.linkUpdateToken,
      onSuccess,
      onExit,
    };
  }

  const { open, ready, error } = usePlaidLink(config);
  if (userStore.linkInitializeToken === "") {
    return (
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (userStore.user.emailVerified === false) {
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          userStore.setNotification(
            "Please verify email account before proceeding"
          );
          userStore.setIsNotification(true);
        }}
      >
        Connect a bank account
      </button>
    );
  }
  if (!userStore.user.bankLinked) {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => open()}
        disabled={!ready}
      >
        Connect bank account!
      </button>
    );
  }
  if (userStore.user.linkUpdateToken !== "") {
    return (
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => open()}
        disabled={!ready}
      >
        Reverify bank account!
      </button>
    );
  }
  return (
    <button type="button" className="btn btn-success">
      Bank Account Connected
    </button>
  );
};

export default observer(Link);
