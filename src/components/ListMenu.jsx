import React from "react";
import { Menu } from "antd";
import { MainRouter } from "../layouts/route";
import { Link, useLocation } from "react-router-dom";

const ListMenu = ({ isDarkMode }) => {
  const location = useLocation();

  // 🔧 Dummy role user sementara untuk template
  const userRoles = ["admin"]; // kamu bisa ganti "admin" dengan "user", dll.

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "transparent" }}
    >
      {MainRouter.map((item) => {
        const isAuthorized =
          !item.roles || userRoles.includes(item.roles); // jika tidak ada `roles`, tampilkan default

        return isAuthorized ? (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            style={{
              color:
                location.pathname === item.path
                  ? "#ffffff"
                  : isDarkMode
                  ? "#e0e0e0"
                  : "#25396f",
              fontWeight: location.pathname === item.path ? "bold" : "500",
              backgroundColor:
                location.pathname === item.path ? "#435ebe" : "transparent",
            }}
          >
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ) : null;
      })}
    </Menu>
  );
};

export default ListMenu;
