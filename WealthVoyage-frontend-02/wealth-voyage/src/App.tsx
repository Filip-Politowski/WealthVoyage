import "./styles/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Loans from "./pages/loans/Loans";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthForm from "./pages/authForm/AuthForm";
import Installment from "./pages/installment/Installment";

import SavingGoals from "./pages/savingGoals/SavingGoals";
import Transactions from "./pages/transactions/Transactions";
import Profile from "./pages/profile/Profile";
import SavingGoal from "./pages/savingGoal/SavingGoal";
import SignIn from "./components/authComponents/SignIn";
import Register from "./components/authComponents/Register";
import Home from "./pages/home/Home";
import { UserProvider } from "./context/useAuth";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { SavingGoalContextProvider } from "./context/SavingGoalContext";
import SingleTransaction from "./pages/transaction/SingleTransaction";

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
              <SavingGoalContextProvider>
                <SavingGoals />
              </SavingGoalContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/savingGoal/:id",
          element: (
            <ProtectedRoute>
              <SavingGoalContextProvider>
                <SavingGoal />
              </SavingGoalContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/loans",
          element: (
            <ProtectedRoute>
              <Loans />
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
              <SingleTransaction />
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
