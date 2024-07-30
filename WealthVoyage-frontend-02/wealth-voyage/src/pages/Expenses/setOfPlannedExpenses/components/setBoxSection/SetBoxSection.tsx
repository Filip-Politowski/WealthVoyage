import React from "react";
import "./setBoxSection.scss";
import { SetOfPlannedExpenses } from "../../../../../models/SetOfPlannedExpenses";
import { Link } from "react-router-dom";

const SetBoxSection = (props: {
  setOfPlannedExpenses: SetOfPlannedExpenses[];
  setElementId: React.Dispatch<React.SetStateAction<number>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdateWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClickOnDeleteImg = (id: number) => {
    props.setElementId(id);
    props.setDeleting((prevState) => !prevState);
  };

  const handleClickOnEditImg = (id: number) => {
    props.setElementId(id);
    props.setOpenUpdateWindow((prevState) => !prevState);
  };

  return (
    <div className="setBoxSection">
      <div className="setBoxes">
        {props.setOfPlannedExpenses.map((setOfPlannedExpense, index) => (
          <div key={index} className="setBox">
            <div className="actionIcons">
              <Link to={`/dashboard/plannedExpenses/${setOfPlannedExpense.id}/${setOfPlannedExpense.name}`}>
                <img src="/details.svg" alt="details" />
              </Link>
              <img
                onClick={() => handleClickOnEditImg(setOfPlannedExpense.id)}
                src="/edit.svg"
                alt="edit"
              />
              <img
                onClick={() => handleClickOnDeleteImg(setOfPlannedExpense.id)}
                src="/delete-orange.svg"
                alt="delete"
              />
            </div>
            <div className="setBoxTextSection">
              <h3 className="setOfPlannedExpensesName">
                {setOfPlannedExpense.name}
              </h3>
              <p>{setOfPlannedExpense.amount.toFixed(2)} zł</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetBoxSection;
