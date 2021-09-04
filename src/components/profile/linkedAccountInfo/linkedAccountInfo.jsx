import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Link from "../../link/link";
import { useMediaQuery } from "react-responsive";
import { prodUrl } from "../../urls";

const LinkedAccountInfo = ({ userStore }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1201px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 575px)" });
  const [bankName, setbankName] = useState("");
  const [mask, setMask] = useState("");
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    setLoading(true);
    fetch(prodUrl + "/users/banking/api/accounts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return { bank_name: "Unavailable", mask: "" };
        }
      })
      .then((result) => {
        setbankName(result.bank_name);
        setMask(result.mask);
        setLoading(false);
      });
  }, []);

  return (
    <div className="border border-grey px-3">
      {/* Account Linking Status*/}
      <div className={"row " + (isSmallScreen ? "" : "mt-3")}>
        <div
          className={
            "col-sm-4 col-md-4 " +
            (isSmallScreen
              ? "text-center border-bottom border-grey p-3"
              : "text-left")
          }
        >
          <p>Accounts</p>
          <p>Bank</p>
          <h3>{loading ? "Loading.." : bankName}</h3>
        </div>
        <div className="col-sm-4 col-md-4 text-center  border-bottom border-grey p-3">
          <p>Account Name</p>
          <h3></h3>
          {mask === "" ? "XXXXX-XXXX" : "XXXXX-" + mask}
        </div>
        <div
          className={
            "col-sm-4  col-md-4 " +
            (isSmallScreen ? "text-center  p-3" : "text-right")
          }
        >
          <p>Link a Bank Account</p>
          <p>Status</p>
          <Link userStore={userStore} />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default observer(LinkedAccountInfo);
