import React, { useState, useEffect, useRef } from "react";

import "./styles/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Installments from "./pages/installments/Installments";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Home from "./pages/home/Home";
import AuthForm from "./pages/authForm/AuthForm";
import Installment from "./pages/installment/Installment";
import Transaction from "./pages/transaction/Transaction";
import SavingGoals from "./pages/savingGoals/SavingGoals";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import SavingGoal from "./pages/savingGoal/SavingGoal";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/register/Register";

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
        { path: "/savingGoal/:id", element: <SavingGoal /> },
        { path: "/installments", element: <Installments /> },
        { path: "/installment/:id", element: <Installment /> },
        { path: "/transactions", element: <Transactions /> },
        { path: "/transaction/:id", element: <Transaction /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthForm />,
      children: [
        {path:"/auth/signin", element: <SignIn />},
        {path:"/auth/register" , element: <Register />}
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
