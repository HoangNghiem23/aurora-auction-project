import { useState } from "react";
import "./index.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { Button, Input, InputNumber, Modal } from "antd";
import api from "../../config/axios";

const Header = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showAuctionsDropdown, setShowAuctionsDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };
  const [number, setNumber] = useState(0);

  const toggleAuctionsDropdown = () => {
    setShowAuctionsDropdown(!showAuctionsDropdown);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    // setIsModalOpen(false);
    console.log(number);

    const response = await api.post("/wallet/request-recharge-vnpay", {
      amount: number,
    });

    console.log(response.data);
    window.open(response.data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRecharge = () => {};
  return (
    <header className="header">
      <div className="header-location-nav">
        <a href="https://maps.app.goo.gl/GS8h12gHueLTvLwv8">
          <img
            src="/assets/location.png"
            alt="Location"
            className="header-location"
          />
        </a>
        <ul className="nav-links">
          <li
            className="nav-link"
            onMouseEnter={toggleAuctionsDropdown}
            onMouseLeave={toggleAuctionsDropdown}
          >
            Auctions
            {showAuctionsDropdown && (
              <div className="dropdown-menu">
                <Link to="/upcoming-auctions">Upcoming Auctions</Link>
                <Link to="/auction-results">Auction Results</Link>
              </div>
            )}
          </li>
          <li>
            <a href="/jewelry" className="nav-link">
              Jewelry
            </a>
          </li>
          <li>
            <a href="/sell" className="nav-link">
              Sell
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <h1 className="logo">
        <Link to={"/"}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/aurora-auction-e6371.appspot.com/o/4180764.png?alt=media&token=a64d3f14-8b7d-4f1d-ad11-2b46330d2464"
            alt="Favorite"
            width={80}
          />{" "}
        </Link>
      </h1>
      <div className="search-and-icons">
        <div className="search">
          <input type="text" placeholder="Search" className="search-input" />
          <img src="/assets/search.png" alt="Search" className="search-icon" />
        </div>
        <a href="#">
          <img
            src="/assets/heart.png"
            alt="Favorite"
            className="favorite-icon"
          />
        </a>
        <a href="#">
          <img src="/assets/cart.png" alt="Cart" className="cart-icon" />
        </a>
        <div className="profile-container">
          <img
            src="/assets/user.png"
            alt="Profile"
            className="profile-icon"
            onClick={toggleProfileOptions}
          />
          {showProfileOptions && (
            <div className="profile-options">
              {user == null ? (
                <Link to="/login">Login</Link>
              ) : (
                <>
                  <a
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(logout());
                      localStorage.clear();
                      return navigate("/my-account/profile");
                    }}
                  >
                    Profile
                  </a>
                  <a
                    onClick={handleRecharge}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div type="primary" onClick={showModal}>
                      Rechage
                    </div>
                    <>
                      <Modal
                        title="Enter the amount"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <Input />
                      </Modal>
                    </>
                  </a>

                  <a
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(logout());
                      localStorage.clear();
                      return navigate("/login");
                    }}
                  >
                    Logout
                  </a>
                </>
              )}

              {/* <Link to="/register">Sign In</Link> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
