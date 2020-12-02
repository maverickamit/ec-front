import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { usePlaidLink } from "react-plaid-link";
import { prodUrl } from "../urls";
import fetchUser from "../modules/fetchUser";

const Link = ({ userStore }) => {
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
    if (config.token == null) {
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
            alert("Account successfully linked");
          } else {
            alert("Error in linking account");
          }
        })
        .catch((err) => {
          alert("Error in linking account");
          console.log(err);
        });

      console.log("Public Token: " + token);
      console.log("Customer-selected account ID: " + metadata.account_id);
    } else {
      console.log("Public Token: " + token);
      console.log("metadata: " + metadata);
      console.log("successful update");
    }
  }, []);

  if (userStore.user.linkUpdateToken == "") {
    var config = {
      clientName: "Your Link name",
      env: "sandbox",
      product: ["auth"],
      publicKey: "c920232687f1eaf83b9790d1f0fdc5",
      onSuccess,
      // ...
    };
  } else {
    var config = {
      token: userStore.user.linkUpdateToken,
      onSuccess,
    };
  }
  const { open, ready, error } = usePlaidLink(config);

  if (userStore.user.bankLinked) {
    if (userStore.user.linkUpdateToken != "") {
      return (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Reverify bank account
        </button>
      );
    }
    return (
      <button type="button" className="btn btn-success">
        Bank Account Connected
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => open()}
        disabled={!ready}
      >
        Connect a bank account
      </button>
    );
  }
};
export default observer(Link);
