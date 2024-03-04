import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
//   const [data, setData] = useState<any | null>(null);
//  useEffect(() => {
//    const fetchUsers = async () => {
//      try {
//        const baseUrl = "http://localhost:8080/api/users/1";

//        // Explicitly use the GET method in the fetch request
//        const response = await fetch(baseUrl, {
//          method: "DELETE",
//          headers: new Headers({
//            Authorization: `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MDk1ODA5OTIsInJvbGVzIjoiQURNSU4ifQ.JhhGLTYSQAMZal1vGmijF5GbR9mqo4ZuNZb6Tp03crzosGw4MJx5X3v19xDMxRaSMWI5SoR2H33c7Yu9R3SW_OgUTOGFs4BzTAmKAv1va_L8PpvslABw80eI6RHjEzIpYmlOMokWrQZ45n9dP9knljs3YRQdb5tn9DpcSgR87UIeTXFzjGNO3KfoyhTI-phE7yomghcJzCkm6K1jIIp0FH31YzV5lu4CbS_fnx6TWCepKtQYqT9Yeft8VlACGlsForiirExj-AGlDkWKB9iluElMpQtOHz4rMjp9se5Yj_CtbEyr6LQDSG6Uaii4OYfJmC9jIycQGmqLB3_YnNgfGQ`,
//          }),
//        });

//        if (!response.ok) {
//          throw new Error("Something went wrong!");
//        }

//        const responseJson = await response.json();
//        setData(responseJson.username);
//        console.log(responseJson.username);
//      } catch (error) {
//        console.error(error);
//      }
//    };

//    fetchUsers();
//  }, []);

  return (
    <div className="login">
      <div className="loginWindow">
        <div className="heading">
          <img src="logo.svg" alt="" />
          <h1>Wealth Voyage</h1>
        </div>
        <label>Username</label>
        <input type="text" placeholder="Username..." />
        <label>Password</label>
        <input type="password" placeholder="Password..." />
        <div className="loginOptions">
          <Link to="">Register</Link>
          <Link to="">Forgot your password ?</Link>
        </div>
        <button>Login</button>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Login;
