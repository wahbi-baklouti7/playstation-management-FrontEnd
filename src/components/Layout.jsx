import { Layout, Menu, theme } from "antd";
import PlaysStationImage from "../assets/icons/PSN.png";
import {
  BsController,
  BsDisplay,
  BsHouse,
  BsPeople,
  BsPersonVideo3,
  BsSpeedometer,
} from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import NavbarDropDown from "./NavbarDropDown";
const { Header, Content, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: <BsHouse />,
  },
  {
    label: "Sessions",
    key: "/sessions",
    icon: <BsPersonVideo3 />,
    roles: ["admin"],
  },
  {
    label: "Devices",
    key: "/devices",
    icon: <BsDisplay />,
    roles: ["admin"],
  },
  {
    label: "Games",
    key: "/games",
    icon: <BsController />,
    roles: ["admin"],
  },
  {
    label: "Users",
    key: "/users",
    icon: <BsPeople />,
    roles: ["admin"],
  },
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: <BsSpeedometer />,
    roles: ["admin"],
  },
];

const LayoutA = () => {
  const auth = useAuth();

  const filteredItems = items.filter((item) => {
    if (item.roles) {
      return item.roles.includes(auth?.user?.is_admin);
    } else {
      return true;
    }
  });

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        {/* <div className="demo-logo-vertical" /> */}
        <div className="d-flex justify-content-center">
          <img src={PlaysStationImage} width={100} alt="" />
        </div>
        <Menu
          onClick={({ key }) => navigate(key)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={filteredItems}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-end pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <p>Header</p> */}
          <NavbarDropDown />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="p-md-3 p-0"
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <AppRoutes /> */}
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutA;
