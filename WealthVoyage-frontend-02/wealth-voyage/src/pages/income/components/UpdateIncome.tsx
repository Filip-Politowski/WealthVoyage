import React, { useState } from "react";
import { Income } from "../../../models/Income";
import { handleError } from "../../../helpers/ErrorHandler";
import "./updateIncome.scss";
import axios from "axios";
const api = "http://localhost:8080/api/";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  income: Income;
};

const UpdateIncome = (props: Props) => {
  const [income, setIncome] = useState<Income>({
    amount: props.income.amount,
    description: props.income.description,
    id: props.income.id,
    incomeDate: props.income.incomeDate,
    sourceOfIncome: props.income.sourceOfIncome,
    typeOfIncome: props.income.typeOfIncome,
    incomeStatus:props.income.incomeStatus
  });

  const handleUpdateIncomeDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(`${api}incomes/update/${income.id}`, income)
      .then(() => {
        props.setOpen(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };
  console.log(income);
  return (
    <div className="updateIncome">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Update Transaction</h1>
        {props.income && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Transaction amount</label>
              <input
                type="number"
                name="amount"
                value={income.amount}
                onChange={handleUpdateIncomeDataChange}
                placeholder="Update the amount of income..."
              ></input>
            </div>
            <div className="item">
              <label>Date of income: </label>
              <input
                type="date"
                name="incomeDate"
                value={income.incomeDate}
                onChange={handleUpdateIncomeDataChange}
              ></input>
            </div>
            <div className="item">
              <label>Select source of income</label>
              <select
                name="sourceOfIncome"
                value={income.sourceOfIncome}
                onChange={handleSelectChange}
              >
                <option value="EMPLOYMENT_CONTRACT">Employment contract</option>
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
                onChange={handleSelectChange}
              >
                <option value="FIXED_INCOME">Fixed income</option>
                <option value="SUPPLEMENTARY_INCOME">
                  Supplementary income
                </option>
              </select>
            </div>
            <div className="item">
              <label>Description of income: </label>
              <input
                type="text"
                name="description"
                value={income.description}
                onChange={handleUpdateIncomeDataChange}
              ></input>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateIncome;
