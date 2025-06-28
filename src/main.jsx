
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import "./input.css";
import "./output.css";

const darkTheme = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#141414",
    colorTextBase: "#e0e0e0",
    colorBgLayout: "#1f1f1f",
    colorTextSecondary: "#bfbfbf",
  },
};

const Main = () => (
  <ConfigProvider theme={darkTheme}>
    <App />
  </ConfigProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
