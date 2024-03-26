import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./profileInformation.scss";
import { User } from "../../models/User";

const api = "http://localhost:8080/api/";

const ProfileInformation = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
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
    const userData = async () => {
      try {
        const response = await axios.get<User>(`${api}users/1`);
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);

  return (
    <div className="profileInformation">
      <img src={profileImage} alt="profile" onClick={handleImageClick} />
      <h1>{user.firstName}</h1>
      <input
        type="file"
        onChange={(e) => base64ConversionForImages(e)}
        ref={fileInputRef}
      />
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>

    </div>
  );
};

export default ProfileInformation;
