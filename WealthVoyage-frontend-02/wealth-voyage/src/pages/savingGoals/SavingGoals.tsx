import React, { useEffect, useState } from "react";
import "./savingGoals.scss";
import AddNewGoal from "../../components/add/AddNewGoal";
import { Link } from "react-router-dom";
import { UserSavingGoal } from "../../models/UserSavingGoal";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { useSavingGoalContext } from "../../context/SavingGoalContext";
const api = "http://localhost:8080/api/";

const SavingGoals = () => {
  const [open, setOpen] = useState(false);
  const [savingGoals, setSavingGoals] = useState<UserSavingGoal[]>([]);
  const { deleting } = useSavingGoalContext();

  useEffect(() => {
    const fetchAllSavingGoals = async () => {
      try {
        const response = await axios.get(`${api}savingGoals/all`);
        setSavingGoals(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchAllSavingGoals();
  }, [open, deleting]);

  return (
    <div className="savingGoals">
      <div className="newGoals">
        <h1>Goals</h1>
        <button onClick={() => setOpen(true)}>Add New Goal</button>
      </div>
      <div className="goals">
        {savingGoals.map((savingGoal) => (
          <Link
            to={`/dashboard/savingGoal/${savingGoal.id}`}
            className="box"
            key={savingGoal.id}
          >
            <div className="theme">
              <img src={savingGoal.svgContent} alt="" />
              <span>{savingGoal.savingGoalName}</span>
            </div>
            <div className="amountTarget">
              <div className="amount">
                <label>Amount:</label>
                <p>{savingGoal.amountSaved} zł</p>
              </div>
              {savingGoal.savingGoalAmount !== 0 && (
                <div className="target">
                  <label>Target:</label>
                  <p>{savingGoal.savingGoalAmount} zł</p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {open && (
        <AddNewGoal
          setOpen={setOpen}
          slug="Goal"
          images={[
            "/money.svg",
            "/car.svg",
            "/homeImg.svg",
            "/bike.svg",
            "/gift.svg",
            "/games.svg",
          ]}
        />
      )}
    </div>
  );
};

export default SavingGoals;
