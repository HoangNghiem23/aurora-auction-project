import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import "./index.scss";
import { Button, Modal } from "antd";
import api from "../../config/axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import useRealtime from "../../assets/hook/useRealtime";

momentDurationFormatSetup(moment);

const UpcomingAuction = () => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [priceVisible, setPriceVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState({ from: 0, to: Infinity });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const itemsPerPage = 12;
  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdownVisible(false);
  };

  const togglePriceFilter = () => {
    setPriceVisible(!priceVisible);
  };

  const applyPriceFilter = () => {
    setFiltersVisible(false); // Tắt filter để dễ kiểm tra
  };

  const resetPriceFilter = () => {
    setPriceRange({ from: 0, to: Infinity });
    setFiltersVisible(false); // Tắt filter để dễ kiểm tra
  };
  const checkIfExpired = () => {
    // Loop through each auction item in the data array
    data.forEach((auction) => {
      const endDate = moment(auction.start_date); // Parse end_date using moment
      const currentTime = moment(); // Get the current time
      const isExpired = currentTime.isAfter(endDate); // Check if current time is after end_date
      if (isExpired) {
        setExpired(true); // Update the state if auction has expired
      }
    });
  };

  useRealtime(async (body) => {
    console.log(body.body);
    if (body.body === "time" || body.body == "UPCOMING") {
      await fetch();
    }
  });

  // useEffect(() => {
  //   const checkIfAnyExpired = () => {
  //     let anyExpired = false;
  //     // Loop through each auction item in the data array
  //     data.forEach((auction) => {
  //       const endDate = moment(auction.start_date); // Parse end_date using moment
  //       const currentTime = moment(); // Get the current time
  //       // Check if current time is after end_date
  //       if (currentTime.isAfter(endDate)) {
  //         anyExpired = true;
  //       }
  //     });

  //     // Update state based on whether any auction is expired
  //     setExpired(anyExpired);
  //   };

  //   checkIfAnyExpired(); // Initial check

  //   const intervalId = setInterval(checkIfExpired, 1000); // Check every second
  //   return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  // }, [data.start_date]);

  // useEffect(() => {
  //   if (expired) {
  //     fetch();
  //   }
  // }, [expired]);
  const fetch = async () => {
    try {
      const response = await api.get("/auction/AllAuctionsReady");
      console.log(response.data);
      setData(response.data);
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

  return (
    <>
      <div className="jewelry-section">
        <div className="text-first">Upcoming Auctions</div>
        <div className="results-and-filters">
          <div className="result">SHOWING 114 RESULTS</div>
          <div className="filters">
            <div className="search-btn">
              <input type="text" placeholder="Search Jewelry" />
              <SearchOutlined />
            </div>
            <button
              className="filter-btn-hide-filters"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </button>
            <div className="sort-dropdown">
              <button
                className="sort-btn"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                Sort By: {sortBy}
              </button>
              {dropdownVisible && (
                <div className="dropdown-content">
                  <div onClick={() => handleSortChange("Relevance")}>
                    Relevance
                  </div>
                  <div onClick={() => handleSortChange("$ - $$$")}>$ - $$$</div>
                  <div onClick={() => handleSortChange("$$$ - $")}>$$$ - $</div>
                  <div onClick={() => handleSortChange("Newest")}>Newest</div>
                </div>
              )}
            </div>
            <button className="view-btn" onClick={() => setViewMode("grid")}>
              Grid View
            </button>
            <button className="view-btn" onClick={() => setViewMode("list")}>
              List View
            </button>
          </div>
        </div>
        <div className="jewelry-products-section">
          {filtersVisible && (
            <div className="search-sidebar">
              <div className="filter-section">
                <h4 onClick={togglePriceFilter}>
                  PRICE {priceVisible ? <UpOutlined /> : <DownOutlined />}
                </h4>
                {priceVisible && (
                  <div className="price-filter">
                    <label className="label">
                      From
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange.from}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            from: Number(e.target.value),
                          })
                        }
                      />
                      <p className="USA">USD</p>
                    </label>
                    <label className="label">
                      To
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange.to === Infinity ? "" : priceRange.to}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            to: e.target.value
                              ? Number(e.target.value)
                              : Infinity,
                          })
                        }
                      />
                      <p className="USA">USD</p>
                    </label>
                    <div className="filter-buttons">
                      <div className="btn-reset" onClick={resetPriceFilter}>
                        Reset
                      </div>
                      <div className="btn-apply" onClick={applyPriceFilter}>
                        Apply
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="filter-section category-filter">
                <h4>CATEGORY</h4>
                <div className="category-list">
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Contemporary Art"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Contemporary Art
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Impressionist & Modern Art"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Impressionist & Modern Art
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Jewelry"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Jewelry
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Watches"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Watches
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Wine"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Wine
                  </div>
                  <div className="see-all">SEE ALL</div>
                </div>
              </div>
            </div>
          )}
          <div className="jewelry-products-container">
            <div
              className={`jewelry-products ${
                !filtersVisible ? "full-width" : ""
              } ${viewMode}`}
            >
              {data?.map((product) => (
                <div className="jewelry-product" key={product.id}>
                  <Link to={`/auction/${product?.id}`}>
                    <img src={product?.image} alt={product?.description} />
                    <div className="product-details">
                      <div className="product-status">
                        {product?.auctionsStatusEnum}
                      </div>
                      <div className="product-name">{product?.label}</div>
                      <div className="product-time-location">
                        {product.auctionsStatusEnum === "UPCOMING" &&
                          product?.countdown}
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
                        <Link to={`/auction/${product?.id}`}>BID</Link>
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
