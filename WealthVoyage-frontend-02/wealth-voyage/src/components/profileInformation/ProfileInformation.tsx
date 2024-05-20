import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./profileInformation.scss";
import { User } from "../../models/User";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const ProfileInformation = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const [userSavings, setUserSavings] = useState<number>(0);
  const [userLoansNumber, setUserLoansNumber] = useState<number>(0);
  const [userLoansSum, setUserLoansSum] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getUserImage = async () => {
    try {
      const response = await axios.get(`${api}images/load-image`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageURL(url);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  useEffect(() => {
    const fetchUserMainData = async () => {
      try {
        const response = await axios.get(`${api}users/get`);
        setUser(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserMainData();
    getUserImage();
  }, []);

  useEffect(() => {
    const fetchUserSavingsSum = async () => {
      try {
        const response = await axios.get(`${api}savingGoals/get/sum`);
        setUserSavings(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserSavingsSum();
  }, [userSavings]);
  useEffect(() => {
    const fetchUserLoansInformation = async () => {
      try {
        const response1 = await axios.get(`${api}loans/count`);
        const response2 = await axios.get(`${api}loans/sum`);
        setUserLoansNumber(response1.data);
        setUserLoansSum(response2.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserLoansInformation();
  }, [userSavings]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2 MB

      if (selectedFile.size > maxSize) {
        setErrorMessage("File size exceeds 2 MB");
        return;
      }

      setErrorMessage(null);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(`${api}images/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.status);
        getUserImage();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="profileInformation">
      <div className="mainInformation">
        {imageURL ? (
          <img src={imageURL} alt="User Profile" onClick={handleImageClick} />
        ) : (
          <div>Loading image...</div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="credentials">
          <h1>Profile</h1>
          <div className="credentialsDetails">
            <img src="/profile.svg" alt="profile" />
            Username:<p>{user?.username}</p>
          </div>
          <div className="credentialsDetails">
            <img src="/email.svg" alt="e-mail" />
            e-mail:<p>{user?.email}</p>
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <hr></hr>
      <div className="userFinancialInformation">
        <div className="financialInformationBox">
          <div className="financialInformationBoxHeader">
            <h2>Fixed income and savings</h2>
          </div>
          <hr />
          <div className="financialInformationBoxText">
            <div className="financialInformationBoxTextRow">
              <p>Fixed monthly income:</p>
            </div>
            <div className="financialInformationBoxTextRow">
              <p>Savings: </p>
              <p className="financialInformationBoxTextRowFetchedData">
                {userSavings} zł
              </p>
            </div>
          </div>
        </div>
        <div className="financialInformationBox">
          <div className="financialInformationBoxHeader">
            <h2>Fixed expenses</h2>
          </div>
          <hr />
          <div className="financialInformationBoxText">
            <div className="financialInformationBoxTextRow">
              <p>Fixed monthly income :</p>
            </div>
            <div className="financialInformationBoxTextRow">
              <p>Savings: </p>
            </div>
          </div>
        </div>
        <div className="financialInformationBox">
          <div className="financialInformationBoxHeader">
            <h2>Loan information</h2>
          </div>
          <hr />
          <div className="financialInformationBoxText">
            <div className="financialInformationBoxTextRow">
              <p>Number of loans: </p>
              <p className="financialInformationBoxTextRowFetchedData">
                {userLoansNumber}
              </p>
            </div>
            <div className="financialInformationBoxTextRow">
              <p>Cost of all loans: </p>
              <p className="financialInformationBoxTextRowFetchedData">
                {userLoansSum} zł
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
