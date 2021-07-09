import Table from "rc-table";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./table.module.css";
import { prodUrl } from "../../urls";
import "./table.css";

const DataTable = ({ userStore }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Details",
      dataIndex: "merchant",
      key: "merchant",
    },
    {
      title: "Round Up($)",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  useEffect(() => {
    fetch(prodUrl + "/users/banking/api/transactions", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.token,
      },
      body: JSON.stringify({
        no_of_records: 5,
        no_of_days: 30,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        userStore.setTransactions(results.transactions);
      });
  }, []);

  const data = [];
  if (userStore.transactions !== undefined) {
    userStore.transactions.map((item, index) => {
      data.push({
        date: new Date(item.date).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
        }),
        merchant: item.merchant.split(" ").slice(0, 2).join(" "),
        amount: (Math.ceil(item["amount"]) - item["amount"]).toFixed(2),
        key: index,
      });
    });
  }
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
