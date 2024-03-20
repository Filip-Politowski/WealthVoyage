import "./authComponents.scss";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/authenticate", loginData)
      .then((response: AxiosResponse) => {
        const userData = response.data;
        localStorage.setItem("jwt", userData.jwt);
        localStorage.setItem("userId", userData.userId);
        console.log(userData);
        if (userData.jwt === "") {
          setInvalidCredentials(true);
          return;
        }
        setInvalidCredentials(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid username or password");
        navigate("/auth/signin");
      });
    setLoginData({
      username: "",
      password: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
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
