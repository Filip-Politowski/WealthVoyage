import React from "react";

import "./App.css";
import Home from "./layouts/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Users from "./layouts/users/Users";
import Installments from "./layouts/installments/Installments";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "installments",
      element: <Installments />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
