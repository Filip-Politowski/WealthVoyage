import React, { useState } from "react";
import { SingleExpense } from "../../../../../models/SingleExpense";
import axios from "axios";
import { handleError } from "../../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const SingleExpenseForm = (props: {
  setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [singleExpense, setSingleExpense] = useState<SingleExpense>({
    id: 0,
    amount: 0,
    date: "",
    description: "",
    expenseCategory: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${api}singleExpenses/add`, singleExpense)
      .then(() => {
        props.setOpenAddWindow(false);
        setSingleExpense({
          id: 0,
          amount: 0,
          date: "",
          description: "",
          expenseCategory: "",
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSingleExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="item">
        <label>Single Expense Description:</label>
        <input
          type="text"
          name="description"
          value={singleExpense.description}
          onChange={handleDataChange}
          placeholder="Type single expense description..."
        />
      </div>
      <div className="item">
        <label>Single Expense Amount:</label>
        <input
          type="number"
          name="amount"
          value={singleExpense.amount}
          onChange={handleDataChange}
          placeholder="Type amount of single expense..."
        />
      </div>
      <div className="item">
        <label>Single Expense Date:</label>
        <input
          type="date"
          name="date"
          value={singleExpense.date}
          onChange={handleDataChange}
          placeholder="Select date of expense..."
        />
      </div>
      <div className="item">
        <label>Select Category of Expense:</label>
        <select
          name="expenseCategory"
          value={singleExpense.expenseCategory}
          onChange={handleDataChange}
        >
          <option value="ACCOMMODATION">Accommodation</option>
          <option value="FOOD">Food</option>
          <option value="TRANSPORTATION">Transportation</option>
          <option value="HEALTHCARE">Healthcare</option>
          <option value="PERSONAL_CARE">Personal Care</option>
          <option value="CLOTHING_AND_FOOTWEAR">Clothing and Footwear</option>
          <option value="ENTERTAINMENT">Entertainment</option>
          <option value="EDUCATION">Education</option>
          <option value="SAVINGS">Savings</option>
          <option value="DEBT">Debt</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <button>Add</button>
    </form>
  );
};

export default SingleExpenseForm;
