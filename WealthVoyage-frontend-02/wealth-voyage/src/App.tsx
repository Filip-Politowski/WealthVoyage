import React from "react";

import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { DashBoardPage } from "./layouts/DashBoardPage/DashBoardPage";

function App() {
  return (
    <>
      <Navbar />
      <DashBoardPage />
    </>
  );
}

export default App;
