import CategoryIndex from "./category";
import DashboardIndex from "./dashboard";
import LoginPage from "./auth/component/LoginPage";
import RegisterPage from "./register/component/RegisterPage";
import { Navigate } from "react-router-dom";
import {
  IconCategory,
  IconCoin,
  IconCoinOff,
  IconDashboard,
  IconUserCog,
} from "@tabler/icons-react";
import NotFoundPage from "./utils/404";
import React from "react";

export const AuthRouter = [
  {
    key: "1",
    path: "/login",
    element: <LoginPage />,
  },
  {
    key: "2",
    path: "/register",
    element: <RegisterPage />,
  },

  {
    key: "404",
    path: "*",
    element: <NotFoundPage />,
  },
];

export const MainRouter = [
  {
    key: "1",
    path: "/",
    title: "Dashboard",
    icon: <IconDashboard />,
    element: <DashboardIndex />,
  },
  {
    key: "2",
    path: "/master",
    title: "Master",
    icon: <IconUserCog />,
    children: [
      {
        key: "2-1",
        path: "/master/category",
        title: "Category",
        icon: <IconCategory />,
        element: <CategoryIndex />,
      },
    ],
  },
];

