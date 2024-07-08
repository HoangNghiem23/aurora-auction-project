import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import "./index.scss";
import Header from "../../components/header";
import { Button, Modal } from "antd";
import Footer from "../../components/footer";
import api from "../../config/axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

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
    return () => clearInterval(interval);
  }, []);

  const offset = currentPage * itemsPerPage;
  let filteredProducts = data.filter(
    (product) =>
      product.price >= priceRange.from && product.price <= priceRange.to
  );

  if (sortBy === "$ - $$$") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "$$$ - $") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

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
              {data.map((product) => (
                <div className="jewelry-product" key={product?.label}>
                  <Link to={`/auction/${product?.id}`}>
                    <img src={product?.image} alt={product?.description} />
                    <div className="product-details">
                      <div className="product-status">
                        {product?.auctionsStatusEnum}
                      </div>
                      <div className="product-name">{product?.label}</div>
                      <div className="product-time-location">
                        {product?.countdown}
                      </div>
                      <div className="product-price">
                        {product?.jewelry?.low_estimated_price} USD -{" "}
                        {product?.jewelry?.high_estimated_price} USD
                      </div>
                      <Button className="product-bid">
                        <Link to={product?.link}>BID</Link>
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
