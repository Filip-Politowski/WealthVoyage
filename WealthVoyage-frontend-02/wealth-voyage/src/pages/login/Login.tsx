import React, { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl: string = "http://localhost:8080/api/auth/admin";

        const headers = new Headers();
        headers.set(
          "Authorization",
          "Bearer " +
            "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MDkxNTEyNDMsInJvbGVzIjoiQURNSU4ifQ.i8ACKAHKIDq9TSGBK6lx3PtS353wc408bG_GCCq7Vb4nPvAhOVb53wKDcLHWFM_h-fGbyn1BVa7AOycQbGhVMA5WQGiI13yGmW3R_OrmJcYgUU2J3c9dqV78ucHgWM70ykdeVRUQktHppTiggy7V7-2e1bE2OLPYq1H4xWqWB4WsNBARErCs9K2NTj9oGq-R7dzJWQJIh3eyVXaslqvkyUdXx2HiWFNOidiabnBDHaQp3r9zs8aki0nvbM2e0t8MRoCv0_Syr1NVwgiTUHzgfTFVv5zlxdc3hFq8q6fPn3i1bbkLXzNuSxWDIOW3TNv2OyLiiNdFH_xyJzpNudc23g"
        );

        const response = await fetch(baseUrl, { headers });

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        setData(responseJson.username);
        console.log(responseJson.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();

    // Optionally, return a cleanup function if needed
    // return () => {
    //   // Cleanup logic here
    // };
  }, []);

  return (
    <div className="login">
      <p>{data}</p>
    </div>
  );
};

export default Login;
