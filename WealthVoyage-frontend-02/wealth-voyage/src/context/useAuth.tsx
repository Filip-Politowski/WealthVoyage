import { UserProfile } from "../models/User";
import React, { createContext, useEffect, useState } from "react";
import { loginAPI, registerAPI } from "../services/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  user: UserProfile | null;
  accessToken: string | null;
  registerUser: (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  console.log(isReady);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (user && token) {
      setUser(JSON.parse(user));
      setAccessToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);
  const registerUser = async (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    await registerAPI(email, password, username, firstName, lastName)
      .then((response) => {
        if (response) {
          console.log("register success");
          navigate("/auth/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("accessToken", response?.data.accessToken);
          const userObj = {
            username: response?.data.username,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setAccessToken(response?.data.accessToken!);
          setUser(userObj!);
          console.log("login success");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, accessToken, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
