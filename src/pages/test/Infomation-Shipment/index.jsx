import { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const FillInfo = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const navigate = useNavigate();

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const handlePurchase = () => {
    setPurchaseCompleted(true);
  };

  if (purchaseCompleted) {
    return (
      <div className="purchase-complete">
        <h2>Order placed!</h2>
        <p>A copy of your receipt has been sent to your email.</p>
        <div className="order-summary">
          <div className="order-item">
            <div className="item-info">
              <p>1 x Sample Item</p>
            </div>
            <div className="item-info">
              <p>Total: $109.50</p>
            </div>
          </div>
          <div className="customer-info">
            <div className="left">
              <div className="info">
                <strong>Name:</strong> JANE A DOE
              </div>
              <div className="info">
                <strong>Email address:</strong> jane.a.doe@gmail.com
              </div>
              <div className="info">
                <strong>Phone number:</strong> 555-555-5555
              </div>
              {deliveryMethod === "shipment" ? (
                <div className="info">
                  <strong>Shipping Address:</strong> 123 Chestnut St, New York,
                  NY 12345
                </div>
              ) : (
                <div className="info">
                  <strong>PICKUP AT:</strong> Marigold Mall, 123 Greenleaf Ave.,
                  New York, NY 12345
                </div>
              )}
            </div>
            <div className="right">
              <div className="info">
                <strong>Paid With:</strong> CardBrand ending in 1111
              </div>
              <div className="info">
                <strong>Exp. Date:</strong> 01/99
              </div>
              <div className="info">
                <strong>CVV:</strong> 000
              </div>
              <div className="info">
                <strong>Billing Address:</strong> 123 Chestnut St, New York, NY
                12345
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              return navigate("/");
            }}
          >
            BACK TO SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fill-info">
      <div className="info-section">
        <a href="/order-review" className="back-link">
          BACK TO ORDER REVIEW
        </a>
        <h2>My Information</h2>
        <form className="info-form">
          <input type="email" placeholder="Email address" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="text" placeholder="Address" required />
          <div className="address-details">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="ZIP Code" required />
          </div>
        </form>
        <h3>How would you like to receive your order?</h3>
        <div className="delivery-options">
          <div
            className={`delivery-option ${
              deliveryMethod === "shipment" ? "selected" : ""
            }`}
            onClick={() => handleDeliveryChange("shipment")}
          >
            By shipment
          </div>
          <div
            className={`delivery-option ${
              deliveryMethod === "in-person" ? "selected" : ""
            }`}
            onClick={() => handleDeliveryChange("in-person")}
          >
            In person
          </div>
        </div>
        {deliveryMethod && (
          <>
            {deliveryMethod === "shipment" && (
              <div className="shipping-details">
                <h4>Shipping Details</h4>
                <div className="autofill">Autofill with My Information</div>
                <form className="info-form">
                  <input type="text" placeholder="Shipping address" required />
                  <div className="address-details">
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="State" required />
                    <input type="text" placeholder="ZIP Code" required />
                  </div>
                </form>
              </div>
            )}
            {deliveryMethod === "in-person" && (
              <div className="pickup-location">
                <h4>Pickup Location</h4>
                <p>MARIGOLD MALL</p>
                <p>13 Greenleaf Ave.</p>
                <p>New York, NY 12345</p>
                <p className="pickup_avai">
                  Pickup Available from 8 AM to 7 PM
                </p>
              </div>
            )}
            <h3>Billing Information</h3>
            <form className="billing-form">
              <input type="text" placeholder="Name on Card" required />
              <input
                type="text"
                placeholder="Debit / Credit Card Number"
                required
              />
              <div className="card-details">
                <input
                  type="text"
                  placeholder="Expiration Date (MM/YY)"
                  required
                />
                <input type="text" placeholder="CVV" required />
                <input type="text" placeholder="ZIP Code" required />
              </div>
              <input type="text" placeholder="Billing Address" required />
            </form>
          </>
        )}
      </div>

      <div className="order-summary">
        <h2>Order Total</h2>
        <div className="summary-details">
          <p>
            Subtotal <span>$100.00</span>
          </p>
          {deliveryMethod === "shipment" && (
            <p>
              Shipping <span>$4.50</span>
            </p>
          )}
          <p>
            Sales Tax <span>$5.00</span>
          </p>
          <p className="total">
            Total{" "}
            <span>{deliveryMethod === "shipment" ? "$109.50" : "$105.00"}</span>
          </p>
          <button onClick={handlePurchase}>PURCHASE</button>
        </div>
      </div>
    </div>
  );
};

export default FillInfo;
