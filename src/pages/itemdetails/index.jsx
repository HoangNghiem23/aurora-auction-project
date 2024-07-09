import React, { useState } from "react"; // Ensure useState is imported properly
import "./index.scss";
const ItemDetails = () => {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showTipsWarnings, setShowTipsWarnings] = useState(false);
  const [mainImageSrc, setMainImageSrc] = useState(
    "https://images5.alphacoders.com/135/1352225.jpeg"
  );

  const toggleProductDetails = () => {
    setShowProductDetails(!showProductDetails);
  };

  const toggleTipsWarnings = () => {
    setShowTipsWarnings(!showTipsWarnings);
  };

  const changeMainImage = (src) => {
    setMainImageSrc(src);
  };
  return (
    <div className="item-details-wrapper">
      <div className="item-details-container">
        <main className="item-details-main-content">
          <div className="item-details-detail">
            <div className="item-details-thumbnails">
              <img
                src="https://i.imgur.com/XzaQmMV.jpeg"
                alt="Thumbnail 1"
                className="item-details-thumbnail"
                onClick={() =>
                  changeMainImage("https://i.imgur.com/XzaQmMV.jpeg")
                }
              />
              <img
                src="https://i.imgur.com/C9w55tF.jpeg"
                alt="Thumbnail 2"
                className="item-details-thumbnail"
                onClick={() =>
                  changeMainImage("https://i.imgur.com/C9w55tF.jpeg")
                }
              />
              <img
                src="https://i.imgur.com/nfkynYg.jpeg"
                alt="Thumbnail 3"
                className="item-details-thumbnail"
                onClick={() =>
                  changeMainImage("https://i.imgur.com/nfkynYg.jpeg")
                }
              />
            </div>
            <div className="item-details-image">
              <img src={mainImageSrc} alt="Sample Item" />
            </div>
            <div className="item-details-info">
              <p className="back-to-selection">BACK TO SELECTION</p>
              <h1 className="item-details-title">Sample Item</h1>
              <p className="item-details-price">$1000.00</p>
              <p className="item-details-bid">Current Bid: $900.00</p>

              <button className="add-to-bag">REGISTER TO BID</button>
              <div className="product-details">
                <p onClick={toggleProductDetails} className="details-toggle">
                  DETAILS {showProductDetails ? "▲" : "▼"}
                </p>
                {showProductDetails && (
                  <div className="details-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat officiis ut soluta in laborum quis, optio enim
                      aspernatur maxime asperiores, libero deserunt.
                      Exercitationem, nihil ducimus. Iure iusto molestias sed
                      modi.
                    </p>
                  </div>
                )}
                <p onClick={toggleTipsWarnings} className="details-toggle">
                  TIPS & WARNINGS {showTipsWarnings ? "▲" : "▼"}
                </p>
                {showTipsWarnings && (
                  <div className="details-content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Placeat pariatur necessitatibus, aut illo porro adipisci
                      numquam, nisi, molestiae eligendi harum deserunt sapiente!
                      Praesentium molestiae delectus, veniam consequatur
                      possimus laudantium vitae.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemDetails;
