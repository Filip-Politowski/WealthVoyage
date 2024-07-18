import React, { useEffect, useState } from 'react'
import { SingleExpense } from '../../../../../../models/SingleExpense';
import axios from 'axios';
import { handleError } from '../../../../../../helpers/ErrorHandler';
import "./updateSingleExpense.scss"
const api = "http://localhost:8080/api/";

const UpdateSingleExpense = (props: {
  elementId: number;
  setOpenUpdateWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [singleExpense, setSingleExpense] = useState<SingleExpense>({
    id: 0,
    amount: 0,
    date: "",
    description: "",
    expenseCategory: "",
  });

  useEffect(() => {
    axios
      .get(`${api}singleExpenses/${props.elementId}`)
      .then((res) => {
        setSingleExpense(res.data);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [props.elementId]);

  const handleUpdateSingleExpenseDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setSingleExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSingleExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(`${api}singleExpenses/update/${props.elementId}`, singleExpense)
      .then(() => {
        props.setOpenUpdateWindow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };



  return (
    <div className="updateSingleExpense">
      <div className="modal">
        <span
          className="close"
          onClick={() => props.setOpenUpdateWindow(false)}
        >
          X
        </span>
        <h1>Update Single Expense</h1>
        {singleExpense && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Recurring Expense Description:</label>
              <input
                type="text"
                name="description"
                value={singleExpense.description}
                onChange={handleUpdateSingleExpenseDataChange}
                placeholder="Update single expense description..."
              />
            </div>
            <div className="item">
              <label>Single Expense Category:</label>
              <select
                name="expenseCategory"
                value={singleExpense.expenseCategory}
                onChange={handleSelectChange}
              >
                <option value={"ACCOMMODATION"}>Accommodation</option>
                <option value={"FOOD"}>Food</option>
                <option value={"TRANSPORTATION"}>Transportation</option>
                <option value={"HEALTHCARE"}>Healthcare</option>
                <option value={"PERSONAL_CARE"}>Personal Care</option>
                <option value={"CLOTHING_AND_FOOTWEAR"}>
                  Clothing and Footwear
                </option>
                <option value={"ENTERTAINMENT"}>Entertainment</option>
                <option value={"EDUCATION"}>Education</option>
                <option value={"SAVINGS"}>Savings</option>
                <option value={"DEBT"}>Debt</option>
                <option value={"OTHER"}>Other</option>
              </select>
            </div>
            <div className="item">
              <label>Single Expense Amount:</label>
              <input
                type="number"
                name="amount"
                value={singleExpense.amount}
                onChange={handleUpdateSingleExpenseDataChange}
                placeholder="Update the amount of single expense..."
              ></input>
            </div>

            <div className="item">
              <label>Single Expense Date:</label>
              <input
                type="date"
                name="date"
                value={singleExpense.date}
                onChange={handleUpdateSingleExpenseDataChange}
                placeholder="Update the date of single expense..."
              ></input>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateSingleExpense
