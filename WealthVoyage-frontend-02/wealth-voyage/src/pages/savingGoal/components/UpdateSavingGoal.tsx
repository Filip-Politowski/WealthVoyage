import React, { useState } from "react";
import "../components/updateSavingGoal.scss";
import { UserSavingGoal } from "../../../models/UserSavingGoal";
import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler"
const api = "http://localhost:8080/api/";

type Props = {
 setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
 savingGoal: UserSavingGoal;
};
const UpdateSavingGoal = (props: Props) => {

const [savingGoal, SetSavingGoal] = useState<UserSavingGoal>({
  id: props.savingGoal.id,
  savingGoalName: props.savingGoal.savingGoalName,
  savingGoalAmount: props.savingGoal.savingGoalAmount,
  amountSaved: props.savingGoal.amountSaved ,
  svgContent: props.savingGoal.svgContent,
});

const handleUpdateNewGoalDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    SetSavingGoal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`${api}savingGoals/update/${savingGoal.id}`, savingGoal)
      .then((response) => {
        console.log(response.data);
        props.setIsEditing(false);
      })
      .catch((error) => {
        handleError(error);
      });
}

  return (
    <div className="updateSavingGoal">
      <div className="modal">
        <h1>Update Saving Goal</h1>
        <span className="close" onClick={() => props.setIsEditing(false)}>
          X
        </span>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Update Goal Name:</label>
            <input
              type="text"
              name="savingGoalName"
              value={savingGoal.savingGoalName}
              onChange={handleUpdateNewGoalDataChange}
            />
          </div>
          <div className="item">
            <label>Update Goal Target:</label>
            <input
             type="number"
             name="savingGoalAmount"
             value={savingGoal.savingGoalAmount}
             onChange={handleUpdateNewGoalDataChange}
             />
          </div>

          <button>Accept Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSavingGoal;
