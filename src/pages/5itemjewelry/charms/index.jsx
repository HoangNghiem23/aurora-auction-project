import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./index.scss";

const Charms = () => {
  const [charms, setCharms] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    fetchCharms();
  }, [sortOption]);

  const fetchCharms = async () => {
    try {
      const response = await axios.get(
        ""//text thử mock api hỏi Thịnh 
      );
      let sortedCharms = response.data;

      switch (sortOption) {
        case "popularity":
          sortedCharms = sortedCharms.sort(
            (a, b) => b.popularity - a.popularity
          );
          break;
        case "type":
          sortedCharms = sortedCharms.sort((a, b) =>
            a.type.localeCompare(b.type)
          );
          break;
        case "gemstone":
          sortedCharms = sortedCharms.sort((a, b) =>
            a.gemstone.localeCompare(b.gemstone)
          );
          break;
        case "price":
          sortedCharms = sortedCharms.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }

      setCharms(sortedCharms);
    } catch (error) {
      console.error("Error fetching charms:", error);
    }
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="charms-wrapper">
      <Header />
      <div className="charms-container">
        <main className="charms-main-content">
          <section className="charms-hero-section">
            <div className="charms-hero-content">
              <h1 className="charms-hero-title">Charms</h1>
              <p className="charms-hero-description">
                Discover our beautiful collection of charms.
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
              <div className="charms-items-section">
                {charms.map((charm, index) => (
                  <div className="charm-item" key={index}>
                    <img src={charm.imageUrl} alt={charm.name} />
                    <p>{charm.name}</p>
                    <p>${charm.price}</p>
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

export default Charms;
