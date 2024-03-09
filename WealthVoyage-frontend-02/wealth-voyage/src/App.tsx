import "./styles/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Installments from "./pages/installments/Installments";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthForm from "./pages/authForm/AuthForm";
import Installment from "./pages/installment/Installment";
import Transaction from "./pages/transaction/Transaction";
import SavingGoals from "./pages/savingGoals/SavingGoals";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import SavingGoal from "./pages/savingGoal/SavingGoal";
import SignIn from "./components/authComponents/SignIn";
import Register from "./components/authComponents/Register";
import Home from "./pages/home/Home";

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
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/dashboard/savingGoals", element: <SavingGoals /> },
        { path: "/dashboard/savingGoal/:id", element: <SavingGoal /> },
        { path: "/dashboard/installments", element: <Installments /> },
        { path: "/dashboard/installment/:id", element: <Installment /> },
        { path: "/dashboard/transactions", element: <Transactions /> },
        { path: "/dashboard/transaction/:id", element: <Transaction /> },
        { path: "/dashboard/profile", element: <Profile /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthForm />,
      children: [
        { path: "/auth/signin", element: <SignIn /> },
        { path: "/auth/register", element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
