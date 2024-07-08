import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./index.scss";

const ItemDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  return (
    <div className="itemdetails-wrapper">
      <Header />
      <div className="itemdetails-container">
        <div className="itemdetails-content">
          <div className="itemdetails-images">
            <img
              src="https://images5.alphacoders.com/135/1352225.jpeg"
              alt="Sample Item"
              className="main-image"
            />
            <div className="thumbnail-images">
              <img
                src="https://images5.alphacoders.com/135/1352225.jpeg"
                alt="Sample Item"
              />
              <img
                src="https://images5.alphacoders.com/135/1352225.jpeg"
                alt="Sample Item"
              />
              <img
                src="https://images5.alphacoders.com/135/1352225.jpeg"
                alt="Sample Item"
              />
            </div>
          </div>
          <div className="itemdetails-info">
            <h1>Jayson Tatum Boston Celtics 2024 NBA Finals Game Worn Statement Edition Jersey | Game 2 | Double-Double</h1>
            <div className="itemdetails-summary">
              <div className="itemdetails-bid-info">
                <p>Current Bid: $70,000 USD</p>
                <p>25 Bids</p>
                <p>Lot closes: July 10, 09:01 AM +07</p>
                <button className="register-bid-button">Register to Bid</button>
              </div>
            </div>
          </div>
        </div>
        <div className="lot-details">
          <h2>Lot Details</h2>
          <div className="lot-details-section">
            <h3>Description</h3>
            <p>NIKE, NIKE MESH JERSEY, SIZE 48 (+4 LENGTH)</p>
          </div>
          <div className="lot-details-section">
            <h3>Condition Report</h3>
            <p>
              This home ‘Statement Edition’ jersey was worn by Jayson Tatum on June 9, 2024 during Game 2 of the NBA Finals when the Boston Celtics played the Dallas Mavericks.
            </p>
          </div>
          <div className="lot-details-section">
            <h3>Catalogue Note</h3>
            <p>
              Tatum recorded a double-double, finishing with 18 points, dishing out a game-high 12 assists, grabbed 9 rebounds, and added 1 steal. He also played a game-high 45 minutes.
            </p>
            <p>
              Tatum was key in the Celtics' 3rd Quarter run that eventually set them up to close out Game 2. He constantly fought off double teams to find open teammates or deftly weaved through the lane to score at the rim. In his second Finals appearance, Tatum established himself as one of the great players of his generation.
            </p>
          </div>
          <div className="lot-details-section">
            <h3>Going Deeper | Jayson Tatum</h3>
            <p>
              Tatum’s play since his entrance to the league has helped catapult the Celtics into the championship conversation each season. Boston has made the Playoffs each year since Tatum’s arrival in the 2017-2018 season, making the Eastern Conference Finals 4 times and the Finals twice.
            </p>
            <p>
              In the 2023 NBA All-Star Game, Tatum set a new All-Star Game Record with 55 points, taking home the ‘The Kobe Bryant MVP Trophy’ in the process.
            </p>
            <p>
              At the time of cataloging, Tatum has career averages of 23.1 points, 7.2 rebounds, and 3.5 assists per game. He is a 5-time NBA All-Star, a 3-time All-NBA 1st Team selection, 2021-2022 Eastern Conference Finals MVP, and 2017-2018 All-Rookie First Team selection. Tatum won his first NBA Championship with the Celtics in 2024.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
