import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <span>Wealth Voyage</span>
      </div>
      <div className="icons">
        <img src="search.svg" alt="" className="icon"></img>
        <img src="app.svg" alt="" className="icon"></img>
        <img src="expand.svg" alt="" className="icon"></img>
        <div className="notifications">
          <img src="notifications.svg" alt=""></img>
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://avatars.githubusercontent.com/u/117862850?v=4"
            alt=""
          ></img>
          <span>Filip</span>
        </div>
        <img src="settings.svg" alt="" className="icon"></img>
      </div>
    </div>
  );
};

export default Navbar;
