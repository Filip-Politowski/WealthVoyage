import { useEffect, useRef, useState } from "react";
import { UserSavingGoal } from "../../models/UserSavingGoal";
import { handleError } from "../../helpers/ErrorHandler";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProgressBar from "../../components/utils/progressBar/ProgressBar";
import ThreeDots from "../../components/utils/threeDots/ThreeDots";
import "./savingGoal.scss";
import { useSavingGoalContext } from "../../context/SavingGoalContext";
import UpdateSavingGoal from "./components/UpdateSavingGoal";
import DepositFromSavingGoal from "./components/DepositFromSavingGoal";
const api = "http://localhost:8080/api/";

const SavingGoal = () => {
  const [userSavingGoal, setUserSavingGoal] = useState<UserSavingGoal>({
    id: 0,
    savingGoalName: "",
    savingGoalAmount: 0,
    amountSaved: 0,
    svgContent: "",
  });

  const { id } = useParams();
  const { deleting, setDeleting } = useSavingGoalContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeposit, setIsDeposit] = useState<boolean>(false);
  const [isPayOut, setIsPayOut] = useState<boolean>(false);
  const settingsWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserSavingGoal = async () => {
      try {
        const response = await axios.get(`${api}savingGoals/get/${id}`);
        setUserSavingGoal(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchUserSavingGoal();
  }, [id, isEditing, isDeposit]);

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

  const goalPercentageProgress: any = (
    (userSavingGoal.amountSaved / userSavingGoal?.savingGoalAmount) *
    100
  ).toFixed();

  const handleDeleteOnClick = () => {
    const deleteUserSavingGoal = async () => {
      try {
        await axios.delete(`${api}savingGoals/delete/${id}`);
        setDeleting(!deleting);
      } catch (error) {
        handleError(error);
      }
    };

    deleteUserSavingGoal();
  };

  return (
    <div className="savingGoal">
      <div className="singleViewGoal">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <div className="imgTitle">
                <h1>{userSavingGoal.savingGoalName}</h1>
                <img src={userSavingGoal.svgContent} alt="" />
                <h1>Goal details:</h1>
              </div>
              <div className="settingsDots" ref={settingsWindowRef}>
                <ThreeDots isOpen={isOpen} setIsOpen={setIsOpen} />
                {isOpen && (
                  <div className="settingsWindow">
                    <p onClick={() => setIsEditing(true)}>Edit Goal</p>
                    <Link to="/dashboard/savingGoals">
                      <p onClick={handleDeleteOnClick}>Delete goal</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="details">
              {userSavingGoal.savingGoalAmount !== 0 && (
                <div className="rowDetails">
                  <p> Target:</p>
                  <p>
                    <b>{userSavingGoal.savingGoalAmount} zł</b>
                  </p>
                </div>
              )}
              <hr />
              <div className="rowDetails">
                <p>Amount saved:</p>
                <p>
                  <b>{userSavingGoal.amountSaved} zł</b>
                </p>
              </div>
              <hr />
            </div>
          </div>
          {userSavingGoal.savingGoalAmount !== 0 && (
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
            <button onClick={() => setIsDeposit(true)}>Deposit</button>
            <button>Pay out</button>
          </div>
        </div>
      </div>
      {isEditing && (
        <UpdateSavingGoal
          setIsEditing={setIsEditing}
          savingGoal={userSavingGoal}
        ></UpdateSavingGoal>
      )}
      {isDeposit && (
        <DepositFromSavingGoal savingGoal={userSavingGoal} setIsDeposit={setIsDeposit} />
      )}
    </div>
  );
};

export default SavingGoal;
