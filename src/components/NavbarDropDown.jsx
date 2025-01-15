import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import Avatar from "../assets/icons/avatar.png";

const NavbarDropDown = () => {
  const { user, logoutAction } = useAuth();

  const items = [
    {
      label: (
        // center the button
        <Button
          onClick={logoutAction}
          className=""
          style={{ display: "block", margin: "0 auto" }}
          type="primary"
          danger
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="top"
      trigger={["click"]}
    >
      <a
        className="text-decoration-none text-black bg-d d-flex align-items-center "
        onClick={(e) => e.preventDefault()}
      >
        <Space align="center">
          <img
            src={Avatar}
            width={40}
            alt="user"
            className="rounded rounded-circle"
          />
          <p className=" m-0 fs-5 fw-bold me-3">{user?.name}</p>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default NavbarDropDown;
