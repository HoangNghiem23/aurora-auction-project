import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Necklaces = () => {
  const [necklaces, setNecklaces] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    fetchNecklaces();
  }, [sortOption]);

  const fetchNecklaces = async () => {
    try {
      const response = await axios.get("/api/necklaces"); // Replace with your actual API endpoint
      let sortedNecklaces = response.data;

      switch (sortOption) {
        case "popularity":
          sortedNecklaces = sortedNecklaces.sort(
            (a, b) => b.popularity - a.popularity
          );
          break;
        case "type":
          sortedNecklaces = sortedNecklaces.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
          break;
        case "gemstone":
          sortedNecklaces = sortedNecklaces.sort((a, b) =>
            a.gemstone.localeCompare(b.gemstone)
          );
          break;
        case "price":
          sortedNecklaces = sortedNecklaces.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setNecklaces(sortedNecklaces);
    } catch (error) {
      console.error("Error fetching necklaces:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
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
                Discover our beautiful collection of necklaces.
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
                {necklaces.map((necklace, index) => (
                  <div className="necklace-item" key={index}>
                    <img src={necklace.imageUrl} alt={necklace.name} />
                    <p>{necklace.name}</p>
                    <p>${necklace.price}</p>
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
