import React, { useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Necklaces = () => {
  // State to keep track of the current sorting option
  const [sortOption, setSortOption] = useState("popularity");

  // Function to change the sort option based on user interaction
  const handleSortChange = (option) => {
    setSortOption(option);
    // Here you could also add logic to sort the necklace items based on the selected option
  };

  return (
    <div className="necklaces-wrapper">
      <Header />
      <div className="necklaces-container">
        <main className="necklaces-main-content">
          <section className="necklaces-hero-section">
            <div className="necklaces-hero-content">
              <h1 className="necklaces-hero-title">Necklaces</h1>
              <p className="necklaces-hero-description">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </section>

          <div className="content-section">
            <div className="filter-section">
              <div className="filter-header">
                <h3>SORT BY:</h3>
                <ul className="sort-options">
                  <li
                    className={`sort-option ${
                      sortOption === "popularity" ? "active" : ""
                    }`}
                    onClick={() => handleSortChange("popularity")}
                  >
                    Popularity
                  </li>
                  <li
                    className={`sort-option ${
                      sortOption === "type" ? "active" : ""
                    }`}
                    onClick={() => handleSortChange("type")}
                  >
                    Type
                  </li>
                  <li
                    className={`sort-option ${
                      sortOption === "gemstone" ? "active" : ""
                    }`}
                    onClick={() => handleSortChange("gemstone")}
                  >
                    Gemstone
                  </li>
                  <li
                    className={`sort-option ${
                      sortOption === "price" ? "active" : ""
                    }`}
                    onClick={() => handleSortChange("price")}
                  >
                    Price
                  </li>
                </ul>
              </div>
              <div className="necklaces-items-section">
                {/* Mapping over necklace items could be done here if data is dynamic */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="necklace-item" key={index}>
                    <img
                      src="https://via.placeholder.com/200"
                      alt={`Necklace ${index + 1}`}
                    />
                    <p>Necklace {index + 1}</p>
                    <p>${(index + 1) * 100}.00</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Necklaces;
