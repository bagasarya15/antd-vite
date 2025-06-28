import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MainRouter } from "../layouts/route";

const findRouteByPath = (path, routes, parents = []) => {
  for (const route of routes) {
    if (route.path === path) {
      return [...parents, route];
    }
    if (route.children) {
      const found = findRouteByPath(path, route.children, [...parents, route]);
      if (found.length) return found;
    }
  }
  return [];
};

const BreadCrumb = ({ isDarkMode }) => {
  const location = useLocation();
  const path = location.pathname;

  const matchedRoutes = findRouteByPath(path, MainRouter);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
    

      {matchedRoutes.map((route, index) => (
        <Breadcrumb.Item key={route.path}>
          {index !== matchedRoutes.length - 1 ? (
            <Link to="#">
              <span style={{ color: isDarkMode ? "#ccc" : "#555" }}>{route.title}</span>
            </Link>
          ) : (
            <Link to={route.path}>
              <span style={{ color: isDarkMode ? "white" : "#222" }}>{route.title}</span>
            </Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
