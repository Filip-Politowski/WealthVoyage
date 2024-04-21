import "./authComponents.scss";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";

const Login = () => {
  const { loginUser, accessToken } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(loginData.username, loginData.password);
    setInvalidCredentials(true);
  };

 useEffect(() => {
   const accessToken = localStorage.getItem("accessToken");
   if (accessToken) {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("refreshToken");
     localStorage.removeItem("tokenExpiry");
     localStorage.removeItem("user");
     window.location.reload(); 
   }
 }, []);

  return (
    <div className="authWindow">
      <div className="authHeading">
        <img src="/loginLogo.jpeg" alt="" />
        <h1>Wealth Voyage</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          value={loginData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={loginData.password}
          onChange={handleChange}
        />
        {invalidCredentials && (
          <div className="wrongCredentials">
            <p>Wrong password or username </p>
          </div>
        )}
        <div className="authOptions">
          <Link to="/auth/register">
            <p>Register</p>
          </Link>
          <Link to="">Forgot your password ?</Link>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
