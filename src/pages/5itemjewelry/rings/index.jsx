import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Rings = () => {
  const [rings, setRings] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    fetchRings();
  }, [sortOption]);

  const fetchRings = async () => {
    try {
      const response = await axios.get("/api/rings"); // Replace with your actual API endpoint
      let sortedRings = response.data;

      switch (sortOption) {
        case "popularity":
          sortedRings = sortedRings.sort((a, b) => b.popularity - a.popularity);
          break;
        case "type":
          sortedRings = sortedRings.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
          break;
        case "gemstone":
          sortedRings = sortedRings.sort((a, b) =>
            a.gemstone.localeCompare(b.gemstone)
          );
          break;
        case "price":
          sortedRings = sortedRings.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setRings(sortedRings);
    } catch (error) {
      console.error("Error fetching rings:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="rings-wrapper">
      <Header />
      <div className="rings-container">
        <main className="rings-main-content">
          <section className="rings-hero-section">
            <div className="rings-hero-content">
              <h1 className="rings-hero-title">Rings</h1>
              <p className="rings-hero-description">
                Discover our beautiful collection of rings.
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
              <div className="rings-items-section">
                {rings.map((ring, index) => (
                  <div className="ring-item" key={index}>
                    <img src={ring.imageUrl} alt={ring.name} />
                    <p>{ring.name}</p>
                    <p>${ring.price}</p>
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

export default Rings;
