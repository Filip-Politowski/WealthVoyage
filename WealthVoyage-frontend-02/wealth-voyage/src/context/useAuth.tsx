import React, { createContext, useEffect, useState } from "react";
import {
  loginAPI,
  registerAPI,
  refreshTokenAPI,
} from "../services/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../models/User";
const MINUTES_UNTIL_EXPIRY = 11;

type UserContextType = {
  user: UserProfile | null;
  accessToken: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string,
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


  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (user && token) {
      setUser(JSON.parse(user));
      setAccessToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, [accessToken]);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry, 10);
        const currentTime = Math.floor(Date.now() / 1000); 
        const timeUntilExpiry = expiryTime - currentTime;

        const minutesLeft = Math.ceil(timeUntilExpiry / 60); 

        if (minutesLeft < MINUTES_UNTIL_EXPIRY) {
          try {
            const newAccessToken = await refreshTokenAPI();
            setAccessToken(newAccessToken); 
            console.log("Access token refreshed");
          } catch (error) {
           
            logout();
          }
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 720000);
    return () => clearInterval(interval);
  }, [accessToken]);

  const registerUser = async (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    await registerAPI(email, username, password, firstName, lastName)
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
    localStorage.removeItem("accessToken");
    await loginAPI(username, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("accessToken", response?.data.accessToken);
          const expiryTime = Math.floor(Date.now() / 1000) + 1 * 60; 
          localStorage.setItem("tokenExpiry", expiryTime.toString());
          const userObj = {
            username: response?.data.username,
            role: response?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          localStorage.setItem("refreshToken", response.data.refreshToken);
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
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("refreshToken")
    setUser(null);
    setAccessToken(null);
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
