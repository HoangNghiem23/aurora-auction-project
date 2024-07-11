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
import moment from "moment";

function TransactionHistory({ transaction }) {
  const [userData, setUserData] = useState();
  const [dataTrans, setDataTrans] = useState([]);
  const [id, setId] = useState("");

  const getTransaction = async () => {
    try {
      const response = await api.get(`bid/${transaction}`);
      console.log(response.data);
      setDataTrans(response.data);
    } catch (e) {
      // alertFail(e.response.data);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const columns = [
    {
      title: "Amount of money",
      dataIndex: "amountofmoney",
      key: "amountofmoney",
    },
    {
      title: "Transfer To",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).format("DD/M/YYYY"),
    },
    {
      title: "Bid Status",
      dataIndex: "bidStatusEnum",
      key: "bidStatusEnum",
      render: (e) => <Tag color="gold">{e}</Tag>,
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
