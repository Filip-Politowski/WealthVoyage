import React, { useEffect, useState } from "react";
import "./updateSetOfPlannedExpense.scss";
import { SetOfPlannedExpenses } from "../../../../../models/SetOfPlannedExpenses";
import axios from "axios";
import { handleError } from "../../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const UpdateSetOfPlannedExpense = (props: {
  elementId: number;
  setOpenUpdateWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [setOfPlannedExpense, setSetOfPlannedExpense] =
    useState<SetOfPlannedExpenses>({
      amount: 0,
      id: 0,
      name: "",
    });

  useEffect(() => {
    axios
      .get(`${api}setOfPlannedExpenses/${props.elementId}`)
      .then((response) => {
        setSetOfPlannedExpense(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [props.elementId]);

  const handleUpdateSetOfPlannedExpenseDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setSetOfPlannedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(
        `${api}setOfPlannedExpenses/update/${props.elementId}`,
        setOfPlannedExpense
      )
      .then(() => {
        props.setOpenUpdateWindow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };
  console.log(props.elementId)
  return (
    <div className="updateSetOfPlannedExpenses">
      <div className="modal">
        <span
          className="close"
          onClick={() => props.setOpenUpdateWindow(false)}
        >
          X
        </span>
        <h1>Update Set Of Planned Expenses</h1>
        {setOfPlannedExpense && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Set Name:</label>
              <input
                type="text"
                name="name"
                value={setOfPlannedExpense.name}
                onChange={handleUpdateSetOfPlannedExpenseDataChange}
                placeholder="Update set name..."
              />
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateSetOfPlannedExpense;
