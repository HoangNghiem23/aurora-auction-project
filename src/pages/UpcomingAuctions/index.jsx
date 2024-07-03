import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import "./index.scss";
import { ShoppingOutlined } from "@ant-design/icons";
import Header from "../../components/header";
// import { Footer } from "antd/es/layout/layout";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Button } from "antd";
import Footer from "../../components/footer";
// import FooterTest from "../../components/compo-test/footer-test";

const UpcomingAuction = () => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [priceVisible, setPriceVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState({ from: 0, to: Infinity });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [swiperRef, setSwiperRef] = useState(null);

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

  const imgdemo2 =
    "https://sothebys-com.brightspotcdn.com/dims4/default/8b753ec/2147483647/strip/true/crop/593x700+4+0/resize/309x365!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2Fe0%2F36%2F315a45e440319dca83d595bdb711%2Fpf2409-cyzys-600x700-calendar.jpg";

  const imgdemo3 =
    "https://sothebys-com.brightspotcdn.com/dims4/default/cf7af46/2147483647/strip/true/crop/1912x2259+12+0/resize/309x365!/format/webp/quality/90/?url=https%3A%2F%2Fsothebys-md.brightspotcdn.com%2F1e%2F4b%2Fb1443322430ba261aa8967276247%2Fn11420-ccb57-t2-01a-cal.jpg";

  const products = [
    {
      src: imgdemo2,
      status: "UPCOMING AUCTION",
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 3000,
      link: "/product1",
    },
    {
      src: imgdemo2,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      status: "UPCOMING AUCTION",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 6000,
      link: "/product1",
    },
    {
      src: imgdemo2,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      status: "UPCOMING AUCTION",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 9000,
      link: "/product1",
    },
    {
      src: imgdemo3,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      status: "UPCOMING AUCTION",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 12000,
      link: "/product1",
    },
    {
      src: imgdemo3,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      status: "UPCOMING AUCTION",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 15000,
      link: "/product1",
    },
    {
      src: imgdemo3,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      status: "UPCOMING AUCTION",
      product_time_location: "19 JUNE 2024 | 2:30 PM CEST | PARIS",
      price: 18000,
      link: "/product1",
    },
  ];

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  let filteredProducts = products.filter(
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
      <Header />
      <div className="jewelry-section">
        <div className="text-first">Upcoming Auctions</div>
        {/* 
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://sothebys-com.brightspotcdn.com/dims4/default/bd49ee5/2147483647/strip/true/crop/4000x2244+0+212/resize/802x450!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fba%2Ff8%2Fbb777389449fa4a6220d6b53e4df%2F1-sothebys2023-1108-181128-3858-alivecoverage.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://sothebys-com.brightspotcdn.com/dims4/default/83e6f5d/2147483647/strip/true/crop/1604x900+2+0/resize/802x450!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fe0%2F95%2Fd527470e4416a3cba4309bf0205a%2F061424-calendar-handbags.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://sothebys-com.brightspotcdn.com/dims4/default/5f36610/2147483647/strip/true/crop/1604x900+2+0/resize/802x450!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F96%2F5b%2Fefe53eb4472e95c045493507072b%2F061424-calendar-rolex.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://sothebys-com.brightspotcdn.com/dims4/default/742bc77/2147483647/strip/true/crop/1440x808+0+83/resize/802x450!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F60%2F01%2Fee9459254848b8d8f889c4392ee4%2Fdownload.jpeg"
              alt=""
            />
          </SwiperSlide>
        </Swiper> */}

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
                      // checked={selectedCategory === "Contemporary Art"}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Contemporary Art
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Impressionist & Modern Art"
                      // checked={
                      //   selectedCategory === "Impressionist & Modern Art"
                      // }
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Impressionist & Modern Art
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Jewelry"
                      // checked={selectedCategory === "Jewelry"}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Jewelry
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Watches"
                      // checked={selectedCategory === "Watches"}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />{" "}
                    Watches
                  </div>
                  <div className="category-item">
                    <input
                      type="checkbox"
                      name="category"
                      value="Wine"
                      // checked={selectedCategory === "Wine"}
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
              {currentProducts.map((product) => (
                <div className="jewelry-product" key={product.label}>
                  <Link to={product.link}>
                    <img src={product.src} alt={product.label} />
                    <div className="product-details">
                      <div className="product-status">{product.status}</div>
                      <div className="product-name">{product.label}</div>
                      <div className="product-time-location">
                        {product.product_time_location}
                      </div>
                      <div className="product-price">{product.price} USD</div>
                      <Button className="product-bid">
                        <Link to={""}>BID</Link>
                      </Button>
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

export default UpcomingAuction;
