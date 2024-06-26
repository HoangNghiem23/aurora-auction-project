import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Earrings = () => {
  const [earrings, setEarrings] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    fetchEarrings();
  }, [sortOption]);

  const fetchEarrings = async () => {
    try {
      const response = await axios.get("/api/earrings"); // Replace with your actual API endpoint
      let sortedEarrings = response.data;

      switch (sortOption) {
        case "popularity":
          sortedEarrings = sortedEarrings.sort((a, b) => b.popularity - a.popularity);
          break;
        case "type":
          sortedEarrings = sortedEarrings.sort((a, b) => a.type.localeCompare(b.type));
          break;
        case "gemstone":
          sortedEarrings = sortedEarrings.sort((a, b) => a.gemstone.localeCompare(b.gemstone));
          break;
        case "price":
          sortedEarrings = sortedEarrings.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setEarrings(sortedEarrings);
    } catch (error) {
      console.error("Error fetching earrings:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="earrings-wrapper">
      <Header />
      <div className="earrings-container">
        <main className="earrings-main-content">
          <section className="earrings-hero-section">
            <div className="earrings-hero-content">
              <h1 className="earrings-hero-title">Earrings</h1>
              <p className="earrings-hero-description">
                Discover our beautiful collection of earrings.
              </p>
            </div>
          </section>

          <div className="content-section">
            <div className="filter-section">
              <div className="filter-header">
                <h3>SORT BY:</h3>
                <ul className="sort-options">
                  <li
                    className={`sort-option ${sortOption === "popularity" ? "active" : ""}`}
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
                    className={`sort-option ${sortOption === "gemstone" ? "active" : ""}`}
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
              <div className="earrings-items-section">
                {earrings.map((earring, index) => (
                  <div className="earring-item" key={index}>
                    <img src={earring.imageUrl} alt={earring.name} />
                    <p>{earring.name}</p>
                    <p>${earring.price}</p>
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

export default Earrings;
