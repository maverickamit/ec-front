import Table from "rc-table";
import React from "react";
import { observer } from "mobx-react";
import styles from "./table.module.css";
import "./table.css";

const DataTable = ({ userStore }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  var data = [];

  userStore.user.amountsCharged.slice(-5).map((item, index) => {
    data.push({
      date: new Date(item.dateCharged).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      }),
      amount: item.amount / 100,
      key: index,
    });
  });

  return (
    <div
      className={`container border border-grey p-3 ` + styles.transactionstable}
    >
      <h6>Recent Activity</h6>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default observer(DataTable);
