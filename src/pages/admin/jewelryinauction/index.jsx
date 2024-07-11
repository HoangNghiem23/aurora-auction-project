import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios"; // Chắc chắn rằng bạn đã cài đặt axios

function JewelryInAuctionList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {

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
      title: "high_estimated_price",
      dataIndex: "high_estimated_price",
      key: "high_estimated_price",
    },
    {
      title: "low_estimated_price",
      dataIndex: "low_estimated_price",
      key: "low_estimated_price",
    },
    {
      title: "Status",
      dataIndex: "soldStatus",
      key: "soldStatus",
      render: (text) => (text ? "Sold" : "Not Sold"),
    },
    {
      title: "Current Bid Amount",
      dataIndex: "currentBidAmount",
      key: "currentBidAmount",
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
