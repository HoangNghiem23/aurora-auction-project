import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import "./index.scss";
import { ShoppingOutlined } from "@ant-design/icons";
import Header from "../../components/header";
import { Footer } from "antd/es/layout/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Button } from "antd";
import api from "../../config/axios"; // Assuming this is your axios instance

const AuctioResults = () => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [priceVisible, setPriceVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState({ from: 0, to: Infinity });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const itemsPerPage = 12;
  const fetchSoldAuctions = async () => {
    try {
      const response = await api.get("/auction/GetAuctionISSOLD");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching sold auctions:", error);
    }
  };

  useEffect(() => {
    fetchSoldAuctions();
  }, []);

  console.log(products);
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  let filteredProducts = products.filter(
    (product) =>
      product.low_estimated_price >= priceRange.from &&
      product.high_estimated_price <= priceRange.to
  );

  if (sortBy === "$ - $$$") {
    filteredProducts.sort(
      (a, b) => a.low_estimated_price - b.low_estimated_price
    );
  } else if (sortBy === "$$$ - $") {
    filteredProducts.sort(
      (a, b) => b.low_estimated_price - a.low_estimated_price
    );
  }

  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="jewelry-section">
        <div className="text-first">Auction Results</div>
        <div className="results-and-filters">
          <div className="result">
            SHOWING {filteredProducts.length} RESULTS
          </div>
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
              {products?.map((product) => (
                <div className="jewelry-product" key={product.id}>
                  <Link to={`/auctionItem/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                      <div className="product-name">
                        {product.jewelry.high_estimated_price}
                      </div>
                      <div className="product-name">
                        {product.jewelry.weight}
                      </div>
                      <div className="product-name">
                        {product.jewelry.high_estimated_price}
                      </div>
                      <div className="product-price">
                        Estimate {product.low_estimated_price} -{" "}
                        {product.high_estimated_price} USD
                      </div>
                      <div className="product-status">SOLD</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuctioResults;
