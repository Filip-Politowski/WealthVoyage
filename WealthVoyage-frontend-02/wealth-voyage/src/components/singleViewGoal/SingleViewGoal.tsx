import React, { useState } from "react";
import ProgressBar from "../utils/progressBar/ProgressBar";
import "./singleViewGoal.scss";
import ThreeDots from "../utils/threeDots/ThreeDots";

type Props = {
  id: number;
  savingGoalName: string;
  savingGoalAmount: number;
  amountSaved: number;
  savingsProgression: number;
};

const SingleViewGoal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="singleViewGoal">
      <div className="view">
        {isOpen && (
          <div className="settingsWindow">
            <p>Change name of goal</p>
            <p>Change Target</p>
            <p>Change image</p>
            <p>Delete goal</p>
          </div>
        )}
        <div className="info">
          <div className="topInfo">
            <div className="imgTitle">
              <h1>{props.savingGoalName}</h1>
              <img src="/car.svg" alt="" />
              <h1>Goal details:</h1>
            </div>
            <div className="settingsDots">
              <ThreeDots isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
          <div className="details">
            <div className="rowDetails">
              <p> Target:</p>
              <p>
                <b>{props.savingGoalAmount} zł</b>
              </p>
            </div>
            <hr />
            <div className="rowDetails">
              <p>Amount saved:</p>
              <p>
                <b>{props.amountSaved} zł</b>
              </p>
            </div>
            <hr />
            <div className="rowDetails">
              <p>Savings progression:</p>
              <p>
                <b>{props.savingsProgression}%</b>
              </p>
            </div>
            <hr />
          </div>
        </div>

        <div className="progressContainer">
          <div className="progressDetails">
            <ProgressBar percentage={50} color="rgb(91, 119, 145)" />
            <span>Goal progress</span>
          </div>
        </div>

        <div className="buttonsSection">
          <button>Deposit</button>
          <button>Pay out</button>
        </div>
      </div>
    </div>
  );
};

export default SingleViewGoal;
