import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import HeaderTest from "../../components/compo-test/header-test";
import FooterTest from "../../components/compo-test/footer-test";
import { ShoppingOutlined } from "@ant-design/icons";

const Jewelry = () => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const handleSortChange = (value) => {
    setSortBy(value);
    setDropdownVisible(false);
  };

  const imgdemo =
    "https://dam.sothebys.com/dam/image/Item/collection-merchandisingTile_752f37b5-f80e-41de-891b-bacacbb1fe19/primary/small";

  const imgdemo2 =
    "https://dam.sothebys.com/dam/image/Item/4fe83f7e-0a72-446a-8019-4dc1dd38c15b/primary/medium";

  const items = [
    {
      src: imgdemo,
      label: "Bridal",
      link: "/bridal",
    },
    {
      src: imgdemo,
      label: "Fine Jewelry",
      link: "/fine-jewelry",
    },
    {
      src: imgdemo,
      label: "High Jewelry",
      link: "/high-jewelry",
    },
    {
      src: imgdemo,
      label: "Vintage",
      link: "/vintage",
    },
    {
      src: imgdemo,
      label: "Top Brands",
      link: "/top-brands",
    },
    {
      src: imgdemo,
      label: "Diamonds",
      link: "/diamonds",
    },
  ];

  const products = [
    {
      src: imgdemo2,
      label: "White Gold, Multicolor Sapphire and Diamond Floral Necklace",
      price: "22,000 USD",
      link: "/product1",
    },
    {
      src: imgdemo2,
      label: "White Gold, Multigem and Diamond Bracelet",
      price: "13,000 USD",
      link: "/product2",
    },
    {
      src: imgdemo2,
      label: "Rose Gold and Resin Gardenia Earclips",
      price: "18,000 USD",
      link: "/product3",
    },
    {
      src: imgdemo2,
      label: "Coral Necklace",
      price: "15,000 USD",
      link: "/product4",
    },
    {
      src: imgdemo2,
      label: "Gold Leaf Necklace",
      price: "25,000 USD",
      link: "/product5",
    },
    {
      src: imgdemo2,
      label: "Sapphire and Diamond Earrings",
      price: "20,000 USD",
      link: "/product6",
    },
  ];

  return (
    <>
      <HeaderTest />
      <div className="jewelry-section">
        <div className="jewelry-content">
          <div className="jewelry-text">
            <h2>Trang Sức</h2>
            <p>
              Mua sắm tuyển chọn các đồ trang sức cao cấp hiện đại và cổ điển.
              Khám phá vòng cổ Van Cleef Alhambra, vòng tay Tiffany & Co.
              Schlumberger hoặc vòng tay Cartier LOVE mang tính biểu tượng.
              Duyệt qua những chiếc nhẫn kim cương màu vàng hoặc kim cương màu
              hồng lạ mắt , hoa tai hồng ngọc của Miến Điện , dây chuyền
              sapphire Ceylon hoặc trang sức ngọc lục bảo Colombia .
            </p>
          </div>
          <div className="jewelry-image">
            <img
              src={
                "https://sothebys-md.brightspotcdn.com/dims4/default/19ccde3/2147483647/strip/true/crop/2050x550+0+0/resize/2048x549!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Faf%2Fc1%2F1eb60047461d83ecf50eb1da274e%2Fjewelry-banners-apri24-jewelry.png"
              }
              alt="Jewelry"
            />
          </div>
        </div>
        <div className="jewelry-items">
          {items.map((item) => (
            <div className="jewelry-item" key={item.label}>
              <Link to={item.link}>
                <img src={item.src} alt={item.label} />
                <p>{item.label}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="results-and-filters">
          <div className="results-count">3451 results</div>
          <div className="filters">
            <button className="filter-btn-change-money">
              {" "}
              <img
                src="https://i.pinimg.com/564x/af/25/d8/af25d8c372e08ec5210629ca8d575870.jpg"
                width={20}
                alt=""
              />
              USD
            </button>
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
              <div className="search-filter">
                <h3>Search Jewelry</h3>
                <input type="text" placeholder="Search Jewelry" />
              </div>
              <div className="filter-section">
                <h4>Way to Buy</h4>
                <ul>
                  <li>
                    <input type="checkbox" /> Bid Now
                  </li>
                  <li>
                    <input type="checkbox" /> Buy Now
                  </li>
                  <li>
                    <input type="checkbox" /> Private Sale
                  </li>
                </ul>
                <h4>Jewelry Type</h4>
                <ul>
                  <li>
                    <input type="checkbox" /> Bracelet
                  </li>
                  <li>
                    <input type="checkbox" /> Brooch
                  </li>
                  <li>
                    <input type="checkbox" /> Cufflink, Stud & Tie Clip
                  </li>
                  <li>
                    <input type="checkbox" /> Earring
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div
            className={`jewelry-products ${
              !filtersVisible ? "full-width" : ""
            } ${viewMode}`}
          >
            {products.map((product) => (
              <div className="jewelry-product" key={product.label}>
                <Link to={product.link}>
                  <img src={product.src} alt={product.label} />
                  <div className="product-details">
                    <div className="product-name">{product.label}</div>
                    <div className="product-price">{product.price}</div>
                    <div className="buy-now">
                      <ShoppingOutlined />
                      &nbsp;Buy Now
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterTest />
    </>
  );
};

export default Jewelry;
