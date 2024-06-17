import {
  EnvironmentOutlined,
  HeartOutlined,
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";

const HeaderTest = () => {
  return (
    <header className="header">
      <div className="header__left">
        <nav>
          <ul>
            <li className="icon">
              <EnvironmentOutlined />
            </li>
            <li>
              <a href="/jewelry">JEWELRY</a>
            </li>
            <li>
              <a href="/new-releases">NEW RELEASES</a>
            </li>
            <li>
              <a href="/gifts">GIFTS</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__center">
        <h1>AURORA</h1>
      </div>
      <div className="header__right">
        <input type="text" placeholder="Search"></input>
        <i className="icon-search">
          <SearchOutlined />
        </i>
        <i className="icon-heart">
          <HeartOutlined />
        </i>
        <i className="icon-bag">
          <ShoppingOutlined />
        </i>
        <i className="icon-user">
          <UserOutlined />
        </i>
      </div>
    </header>
  );
};

export default HeaderTest;
