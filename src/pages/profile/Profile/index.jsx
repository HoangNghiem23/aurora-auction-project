import { Link, Navigate } from "react-router-dom";
import "./index.scss";
import { selectUser } from "../../../redux/features/counterSlice";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <>
      <div className="welcome">
        <div className="welcome__profile">
          <div className="welcome__profile__1">
            <h3>Profile</h3>
          </div>
          <div className="welcome__profile__2">
            Have questions about your account? Visit our{" "}
            <a href="#">FAQ page</a>.
          </div>
        </div>
        <div className="welcome__username">
          <div className="welcome__username__1">
            <h5>Welcome Ms Nghiem</h5>
          </div>
          <div className="welcome__username__2">hoangttt02@gmail.com</div>
        </div>
      </div>
      <div className="profile">
        <div className="profile__navbar">
          <div
            className="profile__navbar__1"
            onClick={() => {
              return Navigate("/my-account/profile");
            }}
          >
            Profile
          </div>
          <div
            className="profile__navbar__2"
            onClick={() => {
              return Navigate("/my-account/auctions");
            }}
          >
            Auctions
          </div>
          <div
            className="profile__navbar__3"
            onClick={() => {
              return Navigate("/my-account/bids");
            }}
          >
            Bids
          </div>
          <div
            className="profile__navbar__4"
            onClick={() => {
              return Navigate("/my-account/purchases");
            }}
          >
            Purchases
          </div>
          <div className="profile__navbar__5">
            <hr />
          </div>
          <div
            className="profile__navbar__4"
            onClick={() => {
              return Navigate("/my-account/seller-portal");
            }}
          >
            Seller Portal
          </div>
          <div className="profile__navbar__4">Metaverse</div>
        </div>
        <div className="profile__info">
          <div className="profile__info__profile">
            <div className="detail__1">Profile details</div>
            <div className="detail__2">
              <div className="name">Ms Hoang Nghiem</div>{" "}
              <div className="gmail">hoangttt02@gmail.com</div>{" "}
              <div className="password">Password</div>
              <div className="changepassword">Change password</div>
            </div>
            <div className="pass">******</div>
            <hr />
            <div className="detail__3">
              Your account currently enables you to get updates, save lots,
              access sale details and more. To bid, buy and sell with Aurora,
              please take a moment to complete your profile.
            </div>
            <div className="detail__4">Complete your profile</div>
          </div>
          <div className="profile__info__account">
            <div className="acount">Accounts and auction preferences</div>
            <div className="account__detail">
              You have no Aurora Auction account numbers.
            </div>
          </div>
          <div className="profile__info__address">
            <div className="address">
              <div className="address__title">Address book</div>
              <div className="address__btn">+ Add new address</div>
            </div>
            <div className="address__detail">You have no addresses.</div>
          </div>
          <div className="profile__info__phone">
            <div className="phone">
              <div className="phone__title">Phone book</div>
              <div className="phone__btn">+ Add new phone number</div>
            </div>
            <div className="phone__detail">You have no phone numbers.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
