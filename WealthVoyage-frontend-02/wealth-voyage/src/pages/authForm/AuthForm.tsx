import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import "./authForm.scss";
import { Link, Outlet } from "react-router-dom";
import SignIn from "../../components/authComponents/SignIn";

const Auth = () => {
  return (
    <div className="authMain">
     
      <div className="authForm">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
