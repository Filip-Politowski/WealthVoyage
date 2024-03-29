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
import { UserProvider } from "./context/useAuth";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const Layout = () => {
    return (
      <UserProvider>
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
      </UserProvider>
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
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/savingGoals",
          element: (
            <ProtectedRoute>
              <SavingGoals />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/savingGoal/:id",
          element: (
            <ProtectedRoute>
              <SavingGoal />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/installments",
          element: (
            <ProtectedRoute>
              <Installments />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/installment/:id",
          element: (
            <ProtectedRoute>
              <Installment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/transactions",
          element: (
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/transaction/:id",
          element: (
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
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
