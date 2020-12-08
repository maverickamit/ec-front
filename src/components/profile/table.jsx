import Table from "rc-table";
import React, { useCallback } from "react";
import { observer } from "mobx-react";

const DataTable = ({ userStore }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount",
      width: 200,
    },
  ];

  var data = [];

  userStore.user.amountsCharged.map((item) => {
    data.push({
      date: new Date(item.dateCharged).toLocaleDateString("en-US"),
      amount: item.amount / 100,
    });
  });
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default observer(DataTable);
