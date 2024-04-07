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
  const [recurringMonthlyExpense, setRecurringMonthlyExpense] = useState(0);
  const [recurringYearlyExpense, setRecurringYearlyExpense] = useState(0);

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

  useEffect(() => {
    const fetchNumberOfRecurringMonthlyExpense = async () => {
      try {
        const response = await axios.get<number>(
          `${api}recurringExpenses/monthlySum`
        );
        setRecurringMonthlyExpense(response.data);
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    fetchNumberOfRecurringMonthlyExpense();
  }, [logout]);
  useEffect(() => {
    const fetchNumberOfRecurringMonthlyExpense = async () => {
      try {
        const response = await axios.get<number>(
          `${api}recurringExpenses/yearlySum`
        );
        setRecurringYearlyExpense(response.data);
      } catch (error) {
        handleError(error);
        if (handleError(error) === "403") {
          logout();
        }
      }
    };
    fetchNumberOfRecurringMonthlyExpense();
  }, [logout]);

  return (
    <div className="profileInformation">
      <div className="mainInformation">
        <img src={profileImage} alt="profile" onClick={handleImageClick} />
        <input
          type="file"
          onChange={(e) => base64ConversionForImages(e)}
          ref={fileInputRef}
        />
        <div className="profileHeaderInformation">
          <div className="fullName">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div className="profileDetails">
            <div className="username">
              <img src="/profile.svg" alt="" />
              <p>{user.username}</p>
            </div>
            <div className="userEmail">
              <img src="/email.svg" alt="" />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="financialContainer">
        <div className="financialDescription">
          <h5>BASIC FINANCIAL INFORMATION</h5>
        </div>
        <div className="financialInformation">
          <p>
            Regular monthly income:
            <strong> {regularMonthlyIncome} zł</strong>
          </p>
          <p>
            Total savings:
            <strong> {totalSaving} zł</strong>
          </p>
          <p>
            Number of loans held:
            <strong> {numberOfLoans}</strong>
          </p>
          <p>
            Fixed monthly expenses:
            <strong> {recurringMonthlyExpense} zł</strong>
          </p>
          <p>
            Fixed yearly expenses:
            <strong> {recurringYearlyExpense} zł</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
