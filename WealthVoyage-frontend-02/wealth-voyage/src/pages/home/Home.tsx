import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./home.scss";
import Footer from "../../components/footer/Footer";
import CardSlider from "../../components/utils/cardSlider/CardSlider";

const Home = () => {
  return (
    <div className="home">
      <div className="navigation">
        <h1>Wealth Voyage</h1>

        <Link to="/auth/signin">
          <button>Sign In</button>
        </Link>
      </div>
      <div className="homeContainer">
        <div className="welcomeText">
          <h1>Manage Your Finances with Our Help !</h1>
          <p>
            Achieve Stability and Profitability Our platform offers
            comprehensive financial management solutions. Whether you you need
            support in planning your personal budget, or you want to optimize
            your company's finances, we are here to help you help.
          </p>
          <Link to="/auth/register">
            <button> Sing Up</button>
          </Link>
        </div>
        <div className="applicationImg">
          <img src="/apka2.jpeg" alt=""></img>
          {/* <img src="/dashboardApp.png" alt=""></img> */}
        </div>
        <div className="applicationText">
          <h2>Speed up your growth by using this tools:</h2>
        </div>
        <CardSlider />
      </div>
      <div className="contact">
        <div className="contactDetails">
          <p>Wealth Voyage</p>
          <p>e-mail: wealth.voyage@gmail.com</p>
          <p>phone: 123456789</p>
        </div>
        <div className="contactLogin">
          <Link to="/auth/signin">Sign In</Link>
          <hr/>
          <Link to="/auth/register">Sign up</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
