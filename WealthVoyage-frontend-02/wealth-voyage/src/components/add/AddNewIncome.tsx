import React, { useEffect, useState } from "react";
import "./add.scss";

import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";

import { Income } from "../../models/Income";
const api = "http://localhost:8080/api/";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewIncome = (props: Props) => {
  const [income, setIncome] = useState<Income>({
    id: 0,
    amount: 0,
    description: "",
    incomeDate: "",
    sourceOfIncome: "EMPLOYMENT_CONTRACT",
    typeOfIncome: "FIXED_INCOME",
    incomeStatus:""
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${api}incomes/add`, income)
      .then(() => {
        props.setOpen(false);
        setIncome({
          id: 0,
          amount: 0,
          description: "",
          incomeDate: "",
          sourceOfIncome: "EMPLOYMENT_CONTRACT",
          typeOfIncome: "FIXED_INCOME",
          incomeStatus:""
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };
console.log(income)
  const handleAddNewIncomeDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNewIncomeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add New Income</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Income amount:</label>
            <input
              type="number"
              name="amount"
              value={income.amount}
              onChange={handleAddNewIncomeDataChange}
              placeholder="Type amount of income..."
            ></input>
          </div>
          <div className="item">
            <label>Date of income: </label>
            <input
              type="date"
              name="incomeDate"
              value={income.incomeDate}
              onChange={handleAddNewIncomeDataChange}
            ></input>
          </div>
          <div className="item">
            <label>Select source of income</label>
            <select
              name="sourceOfIncome"
              value={income.sourceOfIncome}
              onChange={handleAddNewIncomeSelectChange}
            >
              <option value="EMPLOYMENT_CONTRACT" >Employment contract</option>
              <option value="B2B">B2B</option>
              <option value="CONTRACT">Contract</option>
              <option value="RETIREMENT">Retirement</option>
              <option value="ALLOWANCE">Allowance</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="item">
            <label>Select type of income</label>
            <select
              name="typeOfIncome"
              value={income.typeOfIncome}
              onChange={handleAddNewIncomeSelectChange}
            >
              <option value="FIXED_INCOME" >Fixed income</option>
              <option value="SUPPLEMENTARY_INCOME">Supplementary income</option>
            </select>
          </div>
          <div className="item">
            <label>Description of income: </label>
            <input
              type="text"
              name="description"
              value={income.description}
              onChange={handleAddNewIncomeDataChange}
            ></input>
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewIncome;
