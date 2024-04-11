import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "../utils/progressBar/ProgressBar";
import "./singleViewGoal.scss";
import ThreeDots from "../utils/threeDots/ThreeDots";
import { UserSavingGoal } from "../../models/UserSavingGoal";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { handleError } from "../../helpers/ErrorHandler";
import { useSavingGoalContext } from "../../context/SavingGoalContext";
const api = "http://localhost:8080/api/";

type Props = {
  savingGoal: UserSavingGoal;
};

const SingleViewGoal = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const settingsWindowRef = useRef<HTMLDivElement>(null);

  const goalPercentageProgress: any = (
    (props.savingGoal.amountSaved / props.savingGoal?.savingGoalAmount) *
    100
  ).toFixed(0);

  const { id } = useParams();
  const { openTest, setOpenTest } = useSavingGoalContext();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        settingsWindowRef.current &&
        !settingsWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleDeleteOnClick = () => {
    const deleteUserSavingGoal = async () => {
      try {
        await axios.delete(`${api}savingGoals/delete/${id}`);
        setOpenTest(!openTest);
      } catch (error) {
        handleError(error);
      }
    };

    deleteUserSavingGoal();
  };

  return (
    <div className="singleViewGoal">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <div className="imgTitle">
              <h1>{props.savingGoal.savingGoalName}</h1>
              <img src={props.savingGoal.svgContent} alt="" />
              <h1>Goal details:</h1>
            </div>
            <div className="settingsDots" ref={settingsWindowRef}>
              <ThreeDots isOpen={isOpen} setIsOpen={setIsOpen} />
              {isOpen && (
                <div className="settingsWindow">
                  <p>Change name of goal</p>
                  <p>Change Target</p>
                  <p>Change image</p>
                  <Link to="/dashboard/savingGoals">
                    <p onClick={handleDeleteOnClick}>Delete goal</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="details">
            {props.savingGoal.savingGoalAmount !== 0 && (
              <div className="rowDetails">
                <p> Target:</p>
                <p>
                  <b>{props.savingGoal.savingGoalAmount} zł</b>
                </p>
              </div>
            )}
            <hr />
            <div className="rowDetails">
              <p>Amount saved:</p>
              <p>
                <b>{props.savingGoal.amountSaved} zł</b>
              </p>
            </div>
            <hr />
          </div>
        </div>
        {props.savingGoal.savingGoalAmount !== 0 && (
          <div className="progressContainer">
            <div className="progressDetails">
              <ProgressBar
                percentage={goalPercentageProgress}
                color="rgb(91, 119, 145)"
              />
              <span>Goal progress</span>
            </div>
          </div>
        )}
        <div className="buttonsSection">
          <button>Deposit</button>
          <button>Pay out</button>
        </div>
      </div>
    </div>
  );
};

export default SingleViewGoal;
