import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./index.scss";

function HowToBid() {
  const [helpfulCount, setHelpfulCount] = useState(136);
  const [totalCount, setTotalCount] = useState(136);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleYesClick = () => {
    setHelpfulCount(helpfulCount + 1);
    setTotalCount(totalCount + 1);
    setFeedbackMessage("Thank you for your feedback!");
  };

  const handleNoClick = () => {
    setTotalCount(totalCount + 1);
    setFeedbackMessage("We're sorry to hear that. Please contact us for further assistance.");
  };

  return (
    <div className="how-to-bid-container">
      <div className="how-to-bid-content">
        <h1>How to Bid in an Auction</h1>
        <p>Updated on Tue, 09 May, 2023 at 03:03 PM</p>
        <p>
          Simply choose any auction and click on the ‘Register to Bid’ button for
          that event:
        </p>
        <Link to={"/register"}>
          <button className="register-button">REGISTER TO BID</button>
        </Link>
        <p>
          The detailed pages for each auction also provide the option to register.
          To be eligible to bid, please
          <p>
            {" "}
            be sure to complete your account profile 24 hours prior to the
            auction. Don’t have an account?
            <p>
              {" "}
              <a href="/register">See this guide on how to set one up.</a>
            </p>
          </p>
        </p>
        <p>
          Depending on the sale, you may have the following options for bidding:
        </p>
        <h2>Saleroom</h2>
        <p>
          If you attend the auction in-person, you can raise your hand or paddle
          to indicate your
        </p>
        <p>
          intent to bid. When the auctioneer sees your hand or paddle, they will
          acknowledge you and the
        </p>
        <p>amount of your bid according to predefined increments.</p>

        <h2>Telephone</h2>
        <p>
          Phone bidding allows you to bid remotely with the support of a Sotheby’s <br />
          representative. You need to register beforehand and will be called as
          your lot approaches for <br />auction. You can then place your bid over the
          phone, which the representative in turn will relay to <br /> the auctioneer.
        </p>
        <h2>Online</h2>
        <p>
          You can participate in real time via Sotheby’s online bidding platform.
          You need to register <br />for an account beforehand and place a bid on a lot
          before the auction <br /> begins. During the auction, you can monitor bidding
          and place additional bids if you choose.
        </p>
        <h2>Absentee</h2>
        <p>
          Absentee bidding allows you to leave a maximum bid with Sotheby’s before
          the auction <br /> begins. Sotheby’s will then bid on your behalf up to your
          maximum bid amount during the auction. If <br /> someone else bids higher than
          your maximum bid, you will be outbid. If you win the lot, we will notify <br />
          you after the auction.
        </p>

        <div className="feedback-section">
          <p>Did this answer your question?</p>
          <button className="feedback-button" onClick={handleNoClick}>No</button>
          <button className="feedback-button" onClick={handleYesClick}>Yes</button>
          <p>{helpfulCount} out of {totalCount} found this helpful.</p>
          {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
        </div>
      </div>
      <div className="how-to-bid-sidebar">
        <div className="sidebar-title">
          <InfoCircleOutlined /> Bidding at Auction
        </div>
        <ul>
          <li><Link to="/results">Where can I see results of past auctions?</Link></li>
          <li><Link to="/requirements">What is needed to bid in an auction?</Link></li>
          <li><Link to="/cancel-bid">Can I cancel a bid?</Link></li>
          <li><Link to="/how-to-bid">How can I bid in an auction?</Link></li>
          <li><Link to="/sale-results">Where can I see sale results for items that were sold through channels other than auction?</Link></li>
          <li><Link to="/premium-lot">What is a premium lot?</Link></li>
          <li><Link to="/organization-bids">Does Sotheby’s also accept bids from organizations?</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default HowToBid;
