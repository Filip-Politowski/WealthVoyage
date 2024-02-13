import React, { useRef, useState } from "react";
import "./profile.scss";
import TopBox from "../../components/topBox/TopBox";

const Profile = () => {
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

  return (
    <div className="profile">
      <div className="profileInformation">
        <div className="box1">
          <img
            src={profileImage}
            alt="profile"
            onClick={handleImageClick}
          />
          <h1>Filip</h1>
          <input
            type="file"
            onChange={(e) => base64ConversionForImages(e)}
            ref={fileInputRef}
          />
        </div>
        <div className="box2">
          <div className="balance">
            <p>Balance:</p>
            <p className="amount">200 zł</p>
          </div>
          <div className="loansNumber">
            <p>Number of loans:</p>
            <p className="l-number">3</p>
          </div>
          <div className="goalsNumber">
            <p>Number of goals:</p>
            <p>6</p>
          </div>
        </div>
      </div>
      <div className="box3">
        <TopBox />
      </div>
    </div>
  );
};

export default Profile;
