import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios"; // Chắc chắn rằng bạn đã cài đặt axios

function JewelryInAuctionList() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://152.42.226.77:8080/api/auction/AllAuctionsReady",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MjAyNzI5NjksImV4cCI6MTcyMDM1OTM2OX0.dkWBi-LA2IdZs4zGUIVghPaOeP2VhXgGZjPca_EeXvaajVfjz4z7VbrpAnMIrFDN",
          },
        }
      );
      const jewelryAuctions = response.data.filter(
        (auction) => auction.jewelry
      );
      const formattedData = jewelryAuctions.map((auction) => ({
        id: auction.id,
        name: auction.name,
        image: auction.image,
        startTime: auction.start_date,
        endTime: auction.end_date,
        soldStatus: auction.auctionsStatusEnum === "ISOPEDED",
        currentBidAmount: auction.jewelry.last_price,
      }));
      setData(formattedData);
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
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
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
