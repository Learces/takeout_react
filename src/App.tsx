import * as React from "react";
import "./App.scss";
import { useRoutes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import OrderPage from "./pages/OrderPage";
import UserPage from "./pages/UserPage";

const App: React.FC = () => {
  // const isLogined = !!localStorage.getItem("token");
  const isLogined = false;

  const routes = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/order",
      element: <OrderPage />,
    },
    {
      path: "/user",
      element: <UserPage />,
    },
    {
      path: "/",
      element: <Navigate to={isLogined ? "/home" : "/login"} replace />,
    },
  ]);

  return routes;
};

export default App;
