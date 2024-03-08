import React from "react";
import "./authComponents.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="authWindow">
      <div className="authHeading">
        <img src="/loginLogo.jpeg" alt="" />
        <h1>Wealth Voyage</h1>
      </div>
      <form method="POST">
        <label>First Name</label>
        <input type="text" placeholder="First name..."></input>
        <label>Last Name</label>
        <input type="text" placeholder="Last Name..."></input>
        <label>e-mail</label>
        <input type="email" placeholder="e-mail..."></input>
        <label>Username</label>
        <input type="text" placeholder="Username..." />
        <label>Password</label>
        <input type="password" placeholder="Password..." />
        <label>Repeat password</label>
        <input type="password" placeholder="Repeat password..." />
        <div className="authOptions">
          <Link to="/auth/signin">Already have an account ? Login</Link>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
