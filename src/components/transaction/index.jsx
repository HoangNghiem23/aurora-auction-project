import React, { useEffect, useState } from "react";
import { Avatar, Space, Table, Tag } from "antd";
import "./index.scss";
import {
  FallOutlined,
  RiseOutlined,
  RollbackOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import api from "../../config/axios";

function TransactionHistory({ transaction }) {
  const [userData, setUserData] = useState();
  const [dataTrans, setDataTrans] = useState([]);
  const [id, setId] = useState("");

  const getTransaction = async () => {
    try {
      const response = await api.get(`bid/${transaction}`);
      console.log(response.data);
      // setDataTrans(response.data);
    } catch (e) {
      // alertFail(e.response.data);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "Transfer To",
      dataIndex: "artwork",
      key: "artwork",
      render: (artwork) => (
        <a>
          {artwork ? (
            <Avatar
              style={{ marginRight: "0.5em" }}
              src={artwork?.user.avt || ""}
            />
          ) : null}
          {artwork?.user.name}
        </a>
      ),
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => {
        var transactionDate = date;
        var year = transactionDate.substring(0, 4);
        var month = transactionDate.substring(4, 6) - 1; // Month in JavaScript Date object is 0-indexed
        var day = transactionDate.substring(6, 8);
        var hour = transactionDate.substring(8, 10);
        var minute = transactionDate.substring(10, 12);
        var second = transactionDate.substring(12, 14);

        var date = new Date(
          year,
          month,
          day,
          hour,
          minute,
          second
        ).toDateString();
        return <p>{date}</p>;
      },
    },
    {
      title: "Tags",
      key: "description",
      dataIndex: "description",
      render: (tag) => (
        <Tag
          color={
            tag == "Recharge"
              ? "green"
              : tag == "BUYPOST"
              ? "volcano"
              : tag == "Vip"
              ? "volcano"
              : tag == "Buy Artwork"
              ? "geekblue"
              : "yellow"
          }
          key={tag}
        >
          {tag == "Recharge"
            ? "Deposit"
            : tag == "BUYPOST"
            ? "Buy Post"
            : tag == "Vip"
            ? "Buy Post"
            : tag == "Pro"
            ? "Buy Post"
            : tag == "basic"
            ? "Buy Post"
            : tag == "Buy Artwork"
            ? "Transfer"
            : "Rollback"}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <p style={{ fontFamily: "MediumCereal" }}>
          {/* {tag == "Withdraw" ? (
          <FallOutlined style={{ color: "red", marginRight: "0.5em" }} />
        ) : tag == "Deposit" ? (
          <RiseOutlined style={{ color: "green", marginRight: "0.5em" }} />
        ) : tag == "Transfer" ? (
          <SwapOutlined style={{ color: "blue", marginRight: "0.5em" }} />
        ) : (
          <RollbackOutlined style={{ color: "yellow", marginRight: "0.5em" }} />
        )}{" "} */}
          {amount}$
        </p>
      ),
    },
  ];

  return (
    <div className="transaction-history">
      <h1>Transation History</h1>
      <Table
        style={{ fontFamily: "MediumCereal" }}
        columns={columns}
        dataSource={dataTrans}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
        }}
      />
    </div>
  );
}

export default TransactionHistory;
