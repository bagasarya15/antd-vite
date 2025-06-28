import { Layout, Menu, theme, Drawer, Button } from "antd";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  FolderOpenOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";

const { Sider } = Layout;
const { useToken } = theme;

const Sidebar = ({ collapsed, isDarkMode, onCollapse, isMobile }) => {
  const { token } = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarWidth = isMobile ? '80vw' : 250;

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) onCollapse(true);
  };

  const openKeys = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.length > 1 ? [segments[0]] : [];
  }, [location.pathname]);

  const selectedKeys = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return ["/"];
    return [path];
  }, [location.pathname]);

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      onClick: () => handleNavigate("/"),
    },
    {
      key: "master",
      icon: <FolderOpenOutlined />,
      label: "Master Data",
      children: [
        {
          key: "/master/category",
          icon: <DatabaseOutlined />,
          label: "Category",
          onClick: () => handleNavigate("/master/category"),
        },
        {
          key: "/master/users",
          icon: <UserOutlined />,
          label: "Users",
          onClick: () => handleNavigate("/master/users"),
        },
      ],
    },
    {
      key: "reports",
      icon: <PieChartOutlined />,
      label: "Reports",
      children: [
        {
          key: "/reports/sales",
          icon: <FileTextOutlined />,
          label: "Sales Report",
          onClick: () => handleNavigate("/reports/sales"),
        },
        {
          key: "/reports/expenses",
          icon: <FileTextOutlined />,
          label: "Expenses Report",
          onClick: () => handleNavigate("/reports/expenses"),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => handleNavigate("/settings"),
    },
  ];

  if (isMobile) {
    return (
      <>
        {!collapsed && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
            onClick={() => onCollapse(true)}
          />
        )}
        
        <Drawer
          placement="left"
          closable={false}
          onClose={() => onCollapse(true)}
          open={!collapsed}
          width={sidebarWidth}
          bodyStyle={{ 
            padding: 0,
            backgroundColor: isDarkMode ? token.colorBgContainer : '#fff'
          }}
          headerStyle={{ display: 'none' }}
          style={{ zIndex: 1000 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: `1px solid ${isDarkMode ? token.colorBorder : "#f0f0f0"}`,
          }}>
            <div style={{ 
              fontSize: 20, 
              fontWeight: "bold",
              color: isDarkMode ? token.colorWhite : token.colorText,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span style={{ color: token.colorPrimary }}>Ant</span>
              <span>Dash</span>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => onCollapse(true)}
              style={{ marginLeft: 'auto' }}
            />
          </div>

          <Menu
            mode="inline"
            theme={isDarkMode ? "dark" : "light"}
            selectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            items={menuItems}
            style={{
              borderRight: 0,
              padding: "8px 0",
              height: 'calc(100vh - 80px)',
              overflow: 'auto'
            }}
          />
        </Drawer>
      </>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={80}
      width={sidebarWidth}
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
        boxShadow: token.boxShadow,
        borderRight: `1px solid ${isDarkMode ? token.colorBorder : "#f0f0f0"}`,
        background: isDarkMode ? "#1E1E2D" : "#fff",
      }}
    >
      <div
        style={{
          padding: "24px 16px",
          textAlign: collapsed ? "center" : "left",
          borderBottom: `1px solid ${isDarkMode ? token.colorBorder : "#f0f0f0"}`,
        }}
      >
        {collapsed ? (
          <div style={{ fontSize: 20, fontWeight: "bold", color: token.colorPrimary }}>
            AD
          </div>
        ) : (
          <>
            <div style={{ 
              fontSize: 20, 
              fontWeight: "bold",
              color: isDarkMode ? token.colorWhite : token.colorText,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span style={{ color: token.colorPrimary }}>Ant</span>
              <span>Dash</span>
            </div>
            <div style={{ 
              fontSize: 12, 
              color: isDarkMode ? token.colorTextSecondary : token.colorTextTertiary,
              marginTop: 4
            }}>
              Simplified Management
            </div>
          </>
        )}
      </div>

      <Menu
        mode="inline"
        theme={isDarkMode ? "dark" : "light"}
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        inlineCollapsed={collapsed}
        items={menuItems}
        style={{
          borderRight: 0,
          backgroundColor: "transparent",
          padding: "8px 0",
        }}
      />
    </Sider>
  );
};

export default Sidebar;