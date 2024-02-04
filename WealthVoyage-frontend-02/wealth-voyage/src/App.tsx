import React from "react";

import "./styles/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Installments from "./pages/installments/Installments";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Installment from "./pages/installment/Installment";
import SavingGoals from "./pages/savingGoals/SavingGoals";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
          
              <Outlet />
           
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/savingGoals", element: <SavingGoals /> },
        { path: "/installments", element: <Installments /> },
        { path: "/installments/:id", element: <Installment /> },
        { path: "/transactions", element: <Transactions /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
