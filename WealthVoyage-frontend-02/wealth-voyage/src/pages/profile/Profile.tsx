import React, { useRef, useState } from "react";
import "./profile.scss";
import TopBox from "../../components/topBox/TopBox";
import ProfileInformation from "../../components/profileInformation/ProfileInformation";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileInformation />
    </div>
  );
};

export default Profile;
