import React, { useState, useEffect, useRef } from "react";
import "./navbar.scss";
import { useAuth } from "../../context/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../models/User";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settingsWindowRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { logout } = useAuth();
  const [user, setUser] = useState<User>();

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

  useEffect(() => {
    getUserImage();
  }, []);

  const getUserImage = async () => {
    try {
      const response = await axios.get(`${api}images/load-image`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageURL(url);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  useEffect(() => {
    const fetchUserMainData = async () => {
      try {
        const response = await axios.get(`${api}users/get`);
        setUser(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserMainData();
  }, []);

  return (
    <div className="navbar">
      <Link to="/dashboard">
        <div className="logo">
          <img src="/loginLogo.jpeg" alt="" />
          <span>Wealth Voyage</span>
        </div>
      </Link>
      <div className="icons" ref={settingsWindowRef}>
        {/* <img src="/search.svg" alt="" className="icon"></img>

        <div className="notifications">
          <img src="/notifications.svg" alt=""></img>
          <span>1</span>
        </div> */}
        <div
          className="user"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {imageURL ? (
            <img src={imageURL} alt=""></img>
          ) : (
            <img src="/profile.svg" alt=""></img>
          )}

          <span>{user?.username}</span>
        </div>
        {isOpen && (
          <div className="settingsWindow">
            <Link to="/dashboard">
              <p>Dashboard</p>
            </Link>
            <hr />
            <Link to="/dashboard/profile">
              <p>Your profile</p>
            </Link>
            <Link to="/dashboard/savingGoals">
              <p>Your goals</p>
            </Link>
            <Link to="/dashboard/transactions">
              <p>Your transactions</p>
            </Link>
            <Link to="/dashboard/loans">
              <p>Your installments</p>
            </Link>
            <Link to="/dashboard/incomes">
              <p>Your incomes</p>
            </Link>
            <Link to="/dashboard/expenses">
              <p>Your expenses</p>
            </Link>

            <hr />
            <p onClick={logout}>Sign out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
