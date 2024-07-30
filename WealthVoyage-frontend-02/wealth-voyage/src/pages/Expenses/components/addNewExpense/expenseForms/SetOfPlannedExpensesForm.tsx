import React, { useState } from "react";

import axios from "axios";
import { handleError } from "../../../../../helpers/ErrorHandler";
import { getTodayDate } from "../../../../../components/utils/getTodayDate/GetTodayDate";
import { SetOfPlannedExpenses } from "../../../../../models/SetOfPlannedExpenses";
const api = "http://localhost:8080/api/";

const SetOfPlannedExpensesForm = (props: {
  setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [setOfPlannedExpenses, setSetOfPlannedExpenses] =
    useState<SetOfPlannedExpenses>({
      id: 0,
      amount: 0,
      name: "",
    });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${api}setOfPlannedExpenses/add`, setOfPlannedExpenses)
      .then(() => {
        props.setOpenAddWindow((prevState) => !prevState);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSetOfPlannedExpenses((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="item" style={{width: "80%"}}>
        <label>List Name:</label>
        <input
          type="text"
          name="name"
          value={setOfPlannedExpenses.name}
          onChange={handleDataChange}
          placeholder="Type name of list"
        />
      </div>
      <button>Add</button>
    </form>
  );
};

export default SetOfPlannedExpensesForm;
