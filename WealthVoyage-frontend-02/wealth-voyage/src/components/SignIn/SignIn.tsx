
import "./signIn.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="signInWindow">
      <div className="loginHeading">
        <img src="/logo.svg" alt="" />
        <h1>Wealth Voyage</h1>
      </div>
      <form>
        <label>Username</label>
        <input type="text" placeholder="Username..." />
        <label>Password</label>
        <input type="password" placeholder="Password..." />
        <div className="loginOptions">
          <Link to="/auth/register">Register</Link>
          <Link to="">Forgot your password ?</Link>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
