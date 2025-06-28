import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import CustomFooter from "./Footer";
import CustomHeader from "./Header";

const MainLayout = ({ isDarkMode, toggleTheme }) => {
  const { Content } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={collapsed} 
        isDarkMode={isDarkMode} 
        onCollapse={setCollapsed}
        isMobile={isMobile}
      />
      
      <Layout style={{background: isDarkMode ? '#151521' : '#F2F7FF'}}>
        <CustomHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          isMobile={isMobile}
        />
        
        <Content style={{ 
          margin: isMobile ? 0 : '16px', 
          padding: 24,
          minHeight: 280,
          background: isDarkMode ? '#151521' : '#F2F7FF',
        }}>
          <BreadCrumb location={location} isDarkMode={isDarkMode} />
          <Outlet />
        </Content>
        
        <CustomFooter isDarkMode={isDarkMode} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;