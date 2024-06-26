import React, { useState } from "react";
import "./authComponents.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [validEmail, setValidEmail] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [toShortPassword, setToShortPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [wrongRepeatedPassword, setWrongRepeatedPassword] = useState(false);
  const { registerUser } = useAuth();

  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[^\w\d]).{8,}$/;
  const emailRegex: RegExp =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerData.password.length < 8) {
      setToShortPassword(true);
      setWrongRepeatedPassword(false);
      setInvalidPassword(false);
      setValidEmail(false);
      return;
    }
    if (registerData.password.length >= 8) {
      if (!passwordRegex.test(registerData.password)) {
        setInvalidPassword(true);
        setToShortPassword(false);
        setWrongRepeatedPassword(false);
        setValidEmail(false);
        return;
      }
    }
    if (repeatedPassword !== registerData.password) {
      setWrongRepeatedPassword(true);
      setInvalidPassword(false);
      setToShortPassword(false);
      setValidEmail(false);
      return;
    }
    if (!emailRegex.test(registerData.email)) {
      setValidEmail(true);
      setWrongRepeatedPassword(false);
      setInvalidPassword(false);
      setToShortPassword(false);

      return;
    }
    registerUser(
      registerData.firstName,
      registerData.lastName,
      registerData.email,
      registerData.username,
      registerData.password
    );
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleRegisterDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRepeatedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(e.target.value);
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
          onChange={handleRegisterDataChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name..."
          value={registerData.lastName}
          onChange={handleRegisterDataChange}
        />
        <label>e-mail</label>
        <input
          type="email"
          name="email"
          placeholder="e-mail..."
          value={registerData.email}
          onChange={handleRegisterDataChange}
        />
        {validEmail && (
          <div className="wrongCredentials">
            <p>Invalid e-mail</p>
          </div>
        )}
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          value={registerData.username}
          onChange={handleRegisterDataChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={registerData.password}
          onChange={handleRegisterDataChange}
        />
        <label>Repeat password</label>
        <input
          type="password"
          placeholder="Repeat password..."
          name="repeatedPassword"
          value={repeatedPassword}
          onChange={handleRepeatedPasswordChange}
        />
        {(wrongRepeatedPassword || toShortPassword || invalidPassword) && (
          <div className="wrongCredentials">
            {wrongRepeatedPassword && <p>Repeated password is incorrect</p>}
            {toShortPassword && (
              <p>Password must be at least 8 characters long</p>
            )}
            {invalidPassword && (
              <p>
                Password must contain at least one uppercase letter and one
                special character(! @ # $ % ^ & *)
              </p>
            )}
          </div>
        )}
        <div className="authOptions">
          <Link to="/auth/signin">Already have an account? Login</Link>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
