import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import User from "../../models/User";
import { get } from "http";

const Users = () => {
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  
  return (
    <div>
      <h2>List of users:</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
};

export default Users;
