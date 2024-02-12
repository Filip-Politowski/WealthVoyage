import React from "react";
import "./profile.scss";
import TopBox from "../../components/topBox/TopBox";
const Profile = () => {
  return (
    <div className="profile">
      <div className="profileInformation">
        <div className="box1">
          <img
            src="https://avatars.githubusercontent.com/u/117862850?v=4"
            alt="profile"
          />
          <h1>Filip</h1>
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
