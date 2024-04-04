import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./profileInformation.scss";
import { User } from "../../models/User";
import { handleError } from "../../helpers/ErrorHandler";

import { useAuth } from "../../context/useAuth";

const api = "http://localhost:8080/api/";

const ProfileInformation = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [numberOfLoans, setNumberOfLoans] = useState(0);
  const [regularMonthlyIncome, setRegularMonthlyIncome] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);

  const [profileImage, setProfileImage] = useState<any>(
    "https://avatars.githubusercontent.com/u/117862850?v=4"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const base64ConversionForImages = async (e: any) => {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  };

  const getBase64 = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setProfileImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error", error);
    };
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const userProfileInformation = async () => {
      try {
        const response = await axios.get<User>(`${api}users/get`);
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    userProfileInformation();
  }, [logout]);

  useEffect(() => {
    const monthlyIncomesSum = async () => {
      try {
        const response = await axios.get<number>(`${api}incomes/sum`);
        setRegularMonthlyIncome(response.data);
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    monthlyIncomesSum();
  }, [logout]);

  useEffect(() => {
    const fetchTotalSaving = async () => {
      try {
        const response = await axios.get<number>(`${api}savingGoals/get/sum`);
        setTotalSaving(response.data);
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    fetchTotalSaving();
  }, [logout]);
  useEffect(() => {
    const fetchNumberOfInstallments = async () => {
      try {
        const response = await axios.get<number>(`${api}loans/count`);
        setNumberOfLoans(response.data);
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    fetchNumberOfInstallments();
  }, [logout]);

  return (
    <div className="profileInformation">
      <img src={profileImage} alt="profile" onClick={handleImageClick} />
      <h1>{user.firstName}</h1>
      <input
        type="file"
        onChange={(e) => base64ConversionForImages(e)}
        ref={fileInputRef}
      />

      <h2>Profile information:</h2>

      <p>
        <strong>First name: </strong>
        {user.firstName}
      </p>
      <p>
        <strong>Last Name: </strong>
        {user.lastName}
      </p>
      <p>
        <strong>e-mail: </strong>
        {user.email}
      </p>
      <hr />
      <p>
        <strong>Regular monthly income: </strong>
        {regularMonthlyIncome} zł
      </p>
      <p>
        <strong>Total savings: </strong>
        {totalSaving} zł
      </p>
      <p>
        <strong>Number of loans held: </strong>
        {numberOfLoans}
      </p>
      <p>
        <strong>Fixed monthly expenses: </strong>
      </p>
    </div>
  );
};

export default ProfileInformation;
