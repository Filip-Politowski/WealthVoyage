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
import DepositPayOutFromSavingGoal from "./components/DepositPayOutFromSavingGoal";
import DeleteElement from "../../components/delete/DeleteElement";
import BackButton from "../../components/utils/backButton/BackButton";
import { useAuth } from "../../context/useAuth";
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
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
  }, [id, isEditing, isDeposit, isPayOut]);

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

  return (
    <div className="savingGoal">
      <div className="singleViewGoal">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              <BackButton />
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
                    <p onClick={() => setIsDeleting(!isDeleting)}>
                      Delete goal
                    </p>
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
            <button onClick={() => setIsPayOut(true)}>Pay out</button>
          </div>
        </div>
      </div>
      {isEditing && (
        <UpdateSavingGoal
          setIsEditing={setIsEditing}
          savingGoal={userSavingGoal}
        ></UpdateSavingGoal>
      )}
      {(isDeposit || isPayOut) && (
        <DepositPayOutFromSavingGoal
          savingGoal={userSavingGoal}
          setIsDeposit={setIsDeposit}
          isDeposit={isDeposit}
          isPayOut={isPayOut}
          setIsPayOut={setIsPayOut}
        />
      )}
      {isDeleting && (
        <DeleteElement
          deleting={deleting}
          isDeleting={isDeleting}
          describeElementToDelete="saving goal"
          setDeleting={setDeleting}
          endpointUrl={`${api}savingGoals/delete/${id}`}
          setIsDeleting={setIsDeleting}
          redirectUrl="/dashboard/savingGoals"
        />
      )}
    </div>
  );
};

export default SavingGoal;
