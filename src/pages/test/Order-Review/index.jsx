import { useNavigate } from "react-router-dom";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";

const OrderReview = () => {
  const navigate = useNavigate();

  const handleFillOutOrderInfo = () => {
    navigate("/fillinfo");
  };

  return (
    <div className="order-review">
      <section className="order-details">
        <h2>Order Review</h2>
        <div className="order-item">
          <img
            src="https://dam.sothebys.com/dam/image/Item/2c0e2d5a-bd43-4b3c-a116-a435d250723e/primary/medium"
            alt="Sample Item"
          />
          <div className="item-details">
            <p className="name">Sample Item</p>
            <p className="quantity">Quantity: 1</p>
            <a href="/edit-order">EDIT ORDER</a>
          </div>
          <p className="item-price">
            $100.00
            <button className="delete-item">
              <DeleteOutlined />
            </button>
          </p>
        </div>
        <h3>Add more to your bag</h3>
        <div className="additional-items">
          {[
            "Diamond Choker",
            "Leaf Pendant",
            "Interlocking Gold",
            "Ruby Pendant",
            "Opal Heart",
          ].map((item, index) => (
            <div className="additional-item" key={index}>
              <img
                src="https://dam.sothebys.com/dam/image/Item/2c0e2d5a-bd43-4b3c-a116-a435d250723e/primary/medium"
                alt={item}
              />
              <p>{item}</p>
              <p>${index * 50 + 50}.00</p>
              <PlusOutlined className="btn" />
            </div>
          ))}
        </div>
      </section>
      <section className="order-total">
        <h2>Order Total</h2>
        <div className="order-summary">
          <h5>
            1 Sample Item <span>$100.00</span>
          </h5>
          <p>
            Subtotal <span>$100.00</span>
          </p>
          <button onClick={handleFillOutOrderInfo}>FILL OUT ORDER INFO</button>
        </div>
      </section>
    </div>
  );
};

export default OrderReview;
