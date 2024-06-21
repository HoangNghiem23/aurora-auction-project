import { Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function JewelryInAuctionList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/auctions");
      setData(response.data.filter((auction) => auction.isJewelry));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="product" width="50" />,
    },
    {
      title: "Starting Bid",
      dataIndex: "startingBid",
      key: "startingBid",
    },
    {
      title: "Bid Step",
      dataIndex: "bidStep",
      key: "bidStep",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
  ];

  return (
    <div>
      <h1>Jewelry Currently in Auction</h1>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
}

export default JewelryInAuctionList;
