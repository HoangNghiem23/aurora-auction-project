import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { Button, Select } from "antd";
import api from "../../config/axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import useRealtime from "../../assets/hook/useRealtime";

momentDurationFormatSetup(moment);

const UpcomingAuction = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const itemsPerPage = 12;

  const handleSearch = async (value) => {
    if (value) {
      try {
        const response = await api.get(`/jewelry/findJewelryByNameContaining`, {
          params: { name: value },
        });

        setOptions(
          response.data.map((item) => ({ value: item.name, label: item.name }))
        );
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setOptions([]);
    }
  };

  useRealtime(async (body) => {
    console.log(body.body);
    if (body.body === "time" || body.body == "UPCOMING") {
      await fetch();
    }
  });

  const fetch = async () => {
    try {
      const response = await api.get(`/auction/AllAuctionsReady`);
      console.log(response.data);
      setData(
        response.data.filter(
          (item) =>
            item.auctionsStatusEnum == "UPCOMING" ||
            item.auctionsStatusEnum == "ISOPENED"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const calculateCountdown = (endDate) => {
    const now = moment();
    const duration = moment.duration(moment(endDate).diff(now));
    return duration.format("D[d] : HH[h]: mm[m] ss[s]");
  };

  const updateCountdowns = () => {
    setData((prevData) =>
      prevData.map((product) => ({
        ...product,
        countdown: calculateCountdown(product.start_date),
      }))
    );
  };

  useEffect(() => {
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval); //clean-up
  }, []);

  const formatDates = (startDate, endDate) => {
    const start = moment(startDate).format("D MMMM");
    const end = moment(endDate).format("D MMMM YYYY");
    return `${start} - ${end}`;
  };

  return (
    <>
      <div className="jewelry-section">
        <div className="text-first">Upcoming Auctions</div>
        <div className="results-and-filters">
          <div className="result">SHOWING {data.length} RESULTS</div>
          <div className="filters">
            <div className="search-btn">
              <Select
                className="search-input"
                showSearch
                placeholder="Search Jewelry"
                value={selectedItems}
                onChange={setSelectedItems}
                onSearch={handleSearch}
                style={{ width: "300px" }}
                options={options}
                filterOption={false}
                suffixIcon={<SearchOutlined />}
              />
            </div>
          </div>
        </div>
        <div className="jewelry-products-section">
          <div className="jewelry-products-container">
            <div className="jewelry-products full-width">
              {data?.map((product) => (
                <div className="jewelry-product" key={product.id}>
                  <Link to={`/auction/${product?.id}`}>
                    <img src={product?.image} alt={product?.name} />
                    <div className="product-details">
                      <div className="product-status">
                        {product?.auctionsStatusEnum}
                      </div>

                      <div className="product-status">
                        {product.auctionsStatusEnum === "UPCOMING" &&
                          product?.countdown}
                      </div>
                      <div className="product-name">{product?.name}</div>
                      <div className="product-time">
                        {formatDates(product?.start_date, product?.end_date)}
                      </div>
                      <div className="product-price">
                        Estimate {product?.jewelry?.low_estimated_price} -{" "}
                        {product?.jewelry?.high_estimated_price} USD
                      </div>

                      {product.auctionsStatusEnum === "ISOPENED" && (
                        <div className="start_bid">
                          Starting Bid : {product.minPriceBeforeStart}
                        </div>
                      )}
                      <Button className="product-bid">
                        <Link to={`/auctionItem/${product?.id}`}>
                          View Detail
                        </Link>
                      </Button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingAuction;
