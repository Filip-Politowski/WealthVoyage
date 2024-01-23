import React from "react";

import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { DashBoardPage } from "./layouts/DashBoardPage/DashBoardPage";
import { Sidebar } from "./layouts/NavbarAndFooter/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <DashBoardPage /> */}
    </>
  );
}

export default App;
