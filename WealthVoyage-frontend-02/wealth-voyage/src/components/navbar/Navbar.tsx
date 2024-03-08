import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settingsWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        settingsWindowRef.current &&
        !settingsWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/loginLogo.jpeg" alt="" />
        <span>Wealth Voyage</span>
      </div>
      <div className="icons" ref={settingsWindowRef}>
        <img src="/search.svg" alt="" className="icon"></img>

        <div className="notifications">
          <img src="/notifications.svg" alt=""></img>
          <span>1</span>
        </div>
        <div
          className="user"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/117862850?v=4"
            alt=""
          ></img>
          <span>Filip</span>
        </div>
        {isOpen && (
          <div className="settingsWindow">
            <p>Set profile img</p>
            <hr />
            <p>Your profile</p>
            <p>Your goals</p>
            <p>Your transactions</p>
            <p>Your installments</p>
            <hr />
            <p>Sign out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
