import { useEffect, useState } from "react";
import {
  ProfileOutlined,
  HeartOutlined,
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  ProductOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, Space, Tag, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/features/counterSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const StaffPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [items, setItems] = useState([]);
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const role = "staff";

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (role === "owner") {
      setItems([
        getItem("Category", "category"),
        getItem("Hồ sơ", "profile", <ProfileOutlined />),
        getItem("Quản lý Clubs", "club", <HeartOutlined />, [
          getItem("Club 1", "club1"),
          getItem("Club 2", "club2"),
          getItem("Club 3", "club3"),
          getItem("All Promotion", "all-promotion"),
        ]),
        getItem("Quản lý Staffs", "staffs", <UserOutlined />, [
          getItem("Club 1", "staff-club-1"),
          getItem("Club 2", "staff-club-2"),
          getItem("Club 3", "staff-club-3"),
          getItem("All Staffs", "all-staffs"),
        ]),
        getItem("Thống kê", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
      ]);
    }
    if (role === "staff") {
      setItems([
        // getItem("Yêu Cầu Đấu Giá", "request", <CheckCircleOutlined />, [
        //   getItem("Court ID 1", "court-1"),
        //   getItem("Court ID 2", "court-2"),
        // ]),
        getItem("Auctions Request", "request", <AppstoreAddOutlined />),
      ]);
    }

    if (role === "admin") {
      setItems([
        getItem("Category", "category", <AppstoreAddOutlined />),
        getItem("Hồ sơ", "profile", <ProfileOutlined />),
        getItem("Quản lý Clubs", "clubs", <HeartOutlined />, [
          getItem("Club 1", "club1"),
          getItem("Club 2", "club2"),
          getItem("Club 3", "club3"),
          getItem("All Promotion", "all-promotion"),
        ]),
        getItem("Quản lý Accounts", "accounts", <TeamOutlined />, [
          getItem("Club 1", "account-club-1"),
          getItem("Club 2", "account-club-2"),
          getItem("Club 3", "account-club-3"),
          getItem("All Staffs", "all-staffs"),
        ]),
        getItem("Thống kê", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
        getItem("Thông báo", "chart", <DollarOutlined />),
      ]);
    }
    if (role === "manager") {
      setItems([
        getItem("Jewelry", "jewelry", <ProductOutlined />),
        getItem("Hồ sơ", "profile", <ProfileOutlined />),
        getItem("Quản lý Clubs", "club", <HeartOutlined />, [
          getItem("Club 1", "club1"),
          getItem("Club 2", "club2"),
          getItem("Club 3", "club3"),
          getItem("All Promotion", "all-promotion"),
        ]),
        getItem("Quản lý Staffs", "staffs", <UserOutlined />, [
          getItem("Club 1", "staff-club-1"),
          getItem("Club 2", "staff-club-2"),
          getItem("Club 3", "staff-club-3"),
          getItem("All Staffs", "all-staffs"),
        ]),
        getItem("Thống kê", "statistics", <BarChartOutlined />, [
          getItem("Club 1", "stats-club-1"),
          getItem("Club 2", "stats-club-2"),
          getItem("Club 3", "stats-club-3"),
          getItem("All Clubs", "all-clubs"),
        ]),
      ]);
    }
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, currentURI]);
  }, [currentURI]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["profile"]}
          mode="inline"
          selectedKeys={[currentURI]}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/staff/${subItem.key}`}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/staff/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "10px 60px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tag
            icon={<FaRegUserCircle />}
            color="processing"
            style={{
              width: "fit-content",
              alignItems: "center",
              gap: "10px",
              display: "flex",
              // marginLeft: "20px",
              fontSize: "16px",
            }}
          >
            {user?.roleEnum}
          </Tag>

          <LogoutOutlined
            style={{ fontSize: "20px" }}
            onClick={() => {
              dispatch(logout());
              toast.success("Logout Succesfully")
            }}
          />
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, array) => (
              <Breadcrumb.Item key={path}>
                {index === 0 ? path : <Link to={`/${path}`}>{path}</Link>}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#E3F2EE" }}>
          DATSAN79 ©{new Date().getFullYear()} Created by DEMI
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StaffPage;
