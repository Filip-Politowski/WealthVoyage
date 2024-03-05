import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./home.scss";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="navigation">
        <h1>Wealth Voyage</h1>
        <Link to="/auth/register">
          <button>Sign Up</button>
        </Link>
      </div>
      <div className="homeContainer">
        <div className="welcomeText">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
          <Link to="/auth/signin">
            <button> Sing In</button>
          </Link>
        </div>
        <div className="applicationImg">
          <img src="/apka.jpeg" alt=""></img>
        </div>
        <div className="homeBoxes">
          <div className="homeBox homeBox1"></div>
          <div className="homeBox homeBox2"></div>
          <div className="homeBox homeBox3"></div>
          <div className="homeBox homeBox4"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
