import { useState, useEffect } from "react";
import {
  Layout,
  Dropdown,
  Avatar,
  Menu,
  Button,
  Space,
  Badge,
  Divider,
  Typography
} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DefaultUsersImage from "../../public/assets/default.jpg";
import UserProfileModal from "./UserProfileModal";

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = ({ collapsed, setCollapsed, isDarkMode, toggleTheme, isMobile }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(DefaultUsersImage);
  const [fileList, setFileList] = useState([]);

  const userData = {
    name: "Bagas Arya",
    email: "bagas@example.com",
    username: "bagasarya",
    image: "default.jpg",
  };

  const handleUserProfile = () => {
    setIsModalVisible(true);
    setPreviewImage(userData.image !== "default.jpg" ? userData.image : DefaultUsersImage);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("theme");
        localStorage.removeItem("token");
        navigate("/login", { state: { isLogout: true } });
      }
    });
  };

  const handleSaveProfile = (values, imageFile) => {
    console.log("✅ Updated Values:", values);
    console.log("🖼️ New Image File:", imageFile);
    setIsModalVisible(false);
  };

  const headerItems = [
    {
      key: "0",
      icon: <UserOutlined />,
      title: "User Profile",
      onClick: handleUserProfile,
    },
    {
      key: "1",
      icon: <LogoutOutlined />,
      title: "Logout",
      onClick: handleLogout,
    },
  ];

  const dropdownItems = (
    <Menu>
      {headerItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
          {item.title}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Header 
        style={{ 
          padding: '0 16px',
          background: isDarkMode ? "#1E1E2D" : "#fff",
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          borderBottom: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`
        }}
      >
        <Space size="middle">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 48,
              height: 48,
              color: isDarkMode ? "white" : "black",
              zIndex: 1001
            }}
          />
        </Space>

        <Space size="middle">
          {!isMobile && (
            <>
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                style={{ color: isDarkMode ? "white" : "black" }}
              />
              <Badge count={5} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ color: isDarkMode ? "white" : "black" }}
                />
              </Badge>
              <Divider type="vertical" style={{ height: 24 }} />
            </>
          )}

          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            style={{
              fontSize: "16px",
              color: isDarkMode ? "white" : "black",
            }}
          />

          <Dropdown overlay={dropdownItems} trigger={["click"]} placement="bottomRight">
            <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
              {!isMobile && (
                <Text style={{ color: isDarkMode ? "#e0e0e0" : "#25396f" }}>
                  {userData.name}
                </Text>
              )}
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                src={userData.image !== "default.jpg" ? userData.image : DefaultUsersImage}
              />
            </Space>
          </Dropdown>
        </Space>
      </Header>

      <UserProfileModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSaveProfile}
        userData={userData}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        fileList={fileList}
        setFileList={setFileList}
      />
    </>
  );
};

export default CustomHeader;