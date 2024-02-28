import React, { useEffect, useState } from "react";

const Login = () => {
 const [userName, setUserName] = useState("");
 useEffect(() => {
   const fetchBooks = async () => {
     const baseUrl: string = "http://localhost:8080/api/users";
     const username = "admin"; // Replace with your actual username
     const password = "password"; // Replace with your actual password

     const headers = new Headers();
     headers.set("Authorization", "Basic " + btoa(`${username}:${password}`));

     const response = await fetch(baseUrl, { headers });

     if (!response.ok) {
       throw new Error("Something went wrong!");
     }

     const responseJson = await response.json();
     const responseDataUser = responseJson._embedded.users;
     setUserName(responseDataUser[0].username);
     console.log(responseDataUser);
   };

   fetchBooks().catch((error: any) => {
     console.log(error);
   });
 }, []);

  return (
  <div className="login">
    
      <p>{userName}</p>
    
  </div>);
};

export default Login;
