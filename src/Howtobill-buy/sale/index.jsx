import "./index.scss";

const SalePage = () => {
  return (
    <div className="sale-page">
      <div className="breadcrumb">
        <a href="#">Help Center</a> / <a href="#">Buying</a>
      </div>
      <h1>Can I see a work in person before a sale?</h1>
      <p className="update-time">Updated on Mon, 18 Sep, 2023 at 01:24 PM</p>
      <div className="content-container">
        <div className="content">
          <p>
            Our galleries often showcase sale highlights for several days before
            an auction, and during this time our specialists are available to
            answer any questions. The exhibitions are completely free and open
            to the general public.
          </p>
          <p>Sale exhibition information can be found on our website:</p>
          <ul>
            <li>
              Find the auction you are interested in <a href="#">here</a>.
            </li>
            <li>Click the Auction Details tab.</li>
            <li>
              If works from the sale will be on display, Exhibit Information
              will be shown on the right side of the page.
            </li>
            <li>
              The specific address and directions can be found by clicking the
              name of the exhibition location.
            </li>
          </ul>
        </div>
        <div className="related-links">
          <h2>Buying</h2>
          <ul>
            <li>
              <a href="#">What are the Conditions of Business for Buyers?</a>
            </li>
            <li>
              <a href="#">What are the ways to buy at Sotheby’s?</a>
            </li>
            <li>
              <a href="#">If I am the winning bidder, what happens next?</a>
            </li>
            <li>
              <a href="#">
                Do I need to pay for Sotheby’s brokerage service for Private
                Sales?
              </a>
            </li>
            <li>
              <a href="#">
                If I buy an item through an online auction, can I check out
                online?
              </a>
            </li>
            <li>
              <a href="#">How can I purchase a Buy Now item?</a>
            </li>
            <li>
              <a href="#">What is Buy Now?</a>
            </li>
            <li>
              <a href="#">Can I see a work in person before a sale?</a>
            </li>
            <li>
              <a href="#">What are Sothebys different sales channels?</a>
            </li>
            <li>
              <a href="#">
                Can I cancel an order or return items purchased on Buy Now?
              </a>
            </li>
            <li>
              <a href="#">What is the “Make an Offer” option on Buy Now?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
