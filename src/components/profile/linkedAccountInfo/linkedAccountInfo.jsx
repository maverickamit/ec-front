import React, { useState } from "react";
import { observer } from "mobx-react";
import Link from "../../link/link";

const LinkedAccountInfo = ({ userStore }) => {
  return (
    <div className="border border-grey px-3">
      {/* Account Linking Status*/}
      <div className="row mt-5 ">
        <div className="col-sm-6 col-md-4  ">
          <p>Accounts</p>
          <p>Bank</p>
          <h3>Bank of America</h3>
        </div>
        <div className="col-sm-6 col-md-4 text-center">
          <p>Account Name</p>
          <h3>XXXXX-1234</h3>
        </div>
        <div className="col-sm-6 col-md-4 text-right">
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
