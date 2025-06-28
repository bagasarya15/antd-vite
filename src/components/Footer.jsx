import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const CustomFooter = ({ isDarkMode }) => {
  return (
    <Footer style={{ 
      textAlign: 'center',
      background: isDarkMode ? '#1E1E2D' : '#fff',
      borderTop: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
      padding: '16px 50px'
    }}>
      <Text type={isDarkMode ? 'secondary' : undefined}>
        AntDash ©{new Date().getFullYear()} Created by Bagas Arya Pradipta
      </Text>
    </Footer>
  );
};

export default CustomFooter;