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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 200,
    },
  ];

  const data = [
    { date: "10-12-2020", amount: 3.7, key: "1" },
    { date: "10-12-2020", amount: 36, key: "2" },
  ];
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};
export default observer(DataTable);
