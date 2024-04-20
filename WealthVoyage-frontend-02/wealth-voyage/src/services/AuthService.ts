import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { UserProfileToken } from "../models/User";

const api = "http://localhost:8080/api/";
export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/authenticate", {
      username: username,
      password: password,
    });
    return data;
    
  } catch (error) {
    handleError(error); 
  }
};

export const registerAPI = async (
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const refreshTokenAPI = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post<UserProfileToken>(
      api + "auth/refresh-token",
      {
        refreshToken: refreshToken,
      }
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

