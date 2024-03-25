import Footer from "../../components/footer/Footer";
import "./authForm.scss";
import { Outlet } from "react-router-dom";

import { UserProvider } from "../../context/useAuth";

const Auth = () => {
  return (
    <div className="authMain">
      <div className="authForm">
        <UserProvider>
          <Outlet />
        </UserProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
