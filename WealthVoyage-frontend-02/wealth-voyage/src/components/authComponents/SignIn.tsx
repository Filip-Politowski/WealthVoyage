
import "./authComponents.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="authWindow">
      <div className="authHeading">
        <img src="/loginLogo.jpeg" alt="" />
        <h1>Wealth Voyage</h1>
      </div>
      <form method="POST">
        <label>Username</label>
        <input type="text" placeholder="Username..." />
        <label>Password</label>
        <input type="password" placeholder="Password..." />
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
