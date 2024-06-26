import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Bracelets = () => {
  const [bracelets, setBracelets] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    fetchBracelets();
  }, [sortOption]);

  const fetchBracelets = async () => {
    try {
      const response = await axios.get("/api/bracelets"); // Replace with your actual API endpoint
      let sortedBracelets = response.data;

      switch (sortOption) {
        case "popularity":
          sortedBracelets = sortedBracelets.sort(
            (a, b) => b.popularity - a.popularity
          );
          break;
        case "type":
          sortedBracelets = sortedBracelets.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
          break;
        case "gemstone":
          sortedBracelets = sortedBracelets.sort((a, b) =>
            a.gemstone.localeCompare(b.gemstone)
          );
          break;
        case "price":
          sortedBracelets = sortedBracelets.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setBracelets(sortedBracelets);
    } catch (error) {
      console.error("Error fetching bracelets:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="bracelets-wrapper">
      <Header />
      <div className="bracelets-container">
        <main className="bracelets-main-content">
          <section className="bracelets-hero-section">
            <div className="bracelets-hero-content">
              <h1 className="bracelets-hero-title">Bracelets</h1>
              <p className="bracelets-hero-description">
                Discover our beautiful collection of bracelets.
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
                    className={`sort-option ${sortOption === "type" ? "active" : ""}`}
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
                    className={`sort-option ${sortOption === "price" ? "active" : ""}`}
                    onClick={() => handleSortChange("price")}
                  >
                    Price
                  </li>
                </ul>
              </div>
              <div className="bracelets-items-section">
                {bracelets.map((bracelet, index) => (
                  <div className="bracelet-item" key={index}>
                    <img src={bracelet.imageUrl} alt={bracelet.name} />
                    <p>{bracelet.name}</p>
                    <p>${bracelet.price}</p>
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

export default Bracelets;
