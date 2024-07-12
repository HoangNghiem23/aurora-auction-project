import { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { Dropdown, Select } from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const user = useSelector(selectUser);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const onClick = ({ key }) => {
    navigate(`${key}`);
  };
  const auction_items = [
    {
      key: "/upcoming-auctions",
      label: "Upcoming Auctions",
    },
    {
      key: "/auction-results",
      label: "Auction Results",
    },
  ];
  const login_items = [
    {
      key: "/login",
      label: "Login",
    },
  ];
  const affter_login_items = [
    {
      key: "/my-account/profile",
      label: "Profile",
    },
    {
      key: "/wallet",
      label: "Recharge",
    },
    {
      key: "/",
      label: (
        <a
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(logout());
            localStorage.clear();
            toast.success("Logouted");
            return navigate("/login");
          }}
        >
          Logout
        </a>
      ),
    },
  ];

  return (
    <header className="header-page">
      <div className="header-page__navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <Dropdown
              menu={{
                items: auction_items,
                onClick,
              }}
              placement="bottom"
              arrow
            >
              <Link to="/upcoming-auctions">Auction</Link>
            </Dropdown>
          </li>

          <li>
            <Link to={"/sell"} className="nav-link">
              Sell
            </Link>
          </li>
          <li>
            <Link to={"/buy-sell"} className="nav-link">
              HOW TO BUY & SELL
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <h1 className="logo">
        <Link to={"/"}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/aurora-auction-e6371.appspot.com/o/Aurora-auction%20shop.png?alt=media&token=53f6261f-1152-48e6-b146-7a443512b907"
            alt="Favorite"
            width={150}
          />{" "}
        </Link>
      </h1>
      <div className="search-and-icons">
        <div className="search">
          <Select
            className="search-input"
            mode="multiple"
            placeholder="Search Aurora's Auction"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: "300px",
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
            suffixIcon={<SearchOutlined />}
          />
        </div>

        <Link to={"/order-review"} className="cart">
          <ShoppingOutlined />
        </Link>

        <div className="profile-container">
          <Dropdown
            menu={{
              items: user == null ? login_items : affter_login_items,
              onClick,
            }}
            placement="bottom"
            arrow
          >
            <Link className="user">
              <UserOutlined />
            </Link>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
