import React, { useState } from "react";
import "./authComponents.scss";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/register", registerData)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        navigate("/auth/signin");
      })
      .catch((error) => {
        console.log(error);
      });
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="authWindow">
      <div className="authHeading">
        <img src="/loginLogo.jpeg" alt="" />
        <h1>Wealth Voyage</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First name..."
          value={registerData.firstName}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name..."
          value={registerData.lastName}
          onChange={handleChange}
        />
        <label>e-mail</label>
        <input
          type="email"
          name="email"
          placeholder="e-mail..."
          value={registerData.email}
          onChange={handleChange}
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          value={registerData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={registerData.password}
          onChange={handleChange}
        />
        {/* <label>Repeat password</label>
        <input type="password" placeholder="Repeat password..." /> */}
        <div className="authOptions">
          <Link to="/auth/signin">Already have an account? Login</Link>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
