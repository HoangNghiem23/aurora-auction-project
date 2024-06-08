import "./index.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header-location-nav">
        <a href="https://maps.app.goo.gl/GS8h12gHueLTvLwv8">
          <img
            src="https://sothebys-com.brightspotcdn.com/d0/cb/b08c40e043e1a36d5730ce82144b/sothebys-logo-2.svg"
            alt="Location"
            className="header-location"
          />
        </a>
        <ul className="nav-links">
          <li>
            <a href="#" className="nav-link">
              Jewelry
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              New Releases
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Gifts
            </a>
          </li>
        </ul>
      </div>
      <h1 className="logo">AURORA</h1>
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
        <a href="#">
          <img src="/assets/user.png" alt="Profile" className="profile-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;
