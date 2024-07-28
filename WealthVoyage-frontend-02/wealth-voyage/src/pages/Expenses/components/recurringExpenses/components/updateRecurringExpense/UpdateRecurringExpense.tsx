import React, { useEffect, useState } from "react";
import "./updateRecurringExpense.scss";
import { RecurringExpense } from "../../../../../../models/RecurringExpense";
import axios from "axios";
import { handleError } from "../../../../../../helpers/ErrorHandler";
import { getTodayDate } from "../../../../../../components/utils/getTodayDate/GetTodayDate";
const api = "http://localhost:8080/api/";

type Props = {
  setOpenUpdateWindow: React.Dispatch<React.SetStateAction<boolean>>;
  elementId: number;
};

const UpdateRecurringExpense = (props: Props) => {
  const [recurringExpense, setRecurringExpense] = useState<RecurringExpense>({
    amount: 0,
    date: "",
    description: "",
    expenseFrequency: "",
    expenseName: "",
    expenseType: "",
    id: 0,
  });

  useEffect(() => {
    axios
      .get(`${api}recurringExpenses/${props.elementId}`)
      .then((res) => {
        setRecurringExpense(res.data);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [props.elementId]);
  console.log(recurringExpense);

  const handleUpdateRecurringExpenseDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setRecurringExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecurringExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(`${api}recurringExpenses/update/${props.elementId}`, recurringExpense)
      .then(() => {
        props.setOpenUpdateWindow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="updateRecurringExpense">
      <div className="modal">
        <span
          className="close"
          onClick={() => props.setOpenUpdateWindow(false)}
        >
          X
        </span>
        <h1>Update Recurring Expense</h1>
        {recurringExpense && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Recurring Expense Name:</label>
              <input
                type="text"
                name="expenseName"
                value={recurringExpense.expenseName}
                onChange={handleUpdateRecurringExpenseDataChange}
                placeholder="Update recurring expense name..."
              />
            </div>
            <div className="item">
              <label>Recurring Expense Type:</label>
              <select
                name="expenseType"
                value={recurringExpense.expenseType}
                onChange={handleSelectChange}
              >
                <option value={"SUBSCRIPTION"}>Subscription</option>
                <option value="HOUSE">House</option>
                <option value="CHARGES">Charges</option>
                <option value="FOOD">Food</option>
                <option value="TRANSPORT">Transport</option>
                <option value="HEALTH">Health</option>
                <option value="EDUCATION">Education</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="item">
              <label>RecurringExpense amount:</label>
              <input
                type="number"
                name="amount"
                value={recurringExpense.amount}
                onChange={handleUpdateRecurringExpenseDataChange}
                placeholder="Update the amount of recurring expense..."
              ></input>
            </div>
            <div className="item">
              <label>Recurring Expense Type:</label>
              <select
                name="expenseFrequency"
                value={recurringExpense.expenseFrequency}
                onChange={handleSelectChange}
              >
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="BIMONTHLY">Bimonthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>
            <div className="item">
              <label>Recurring Expense Description:</label>
              <input
                type="text"
                name="description"
                value={recurringExpense.description}
                onChange={handleUpdateRecurringExpenseDataChange}
                placeholder="Update the description of recurring expense..."
              ></input>
            </div>
            <div className="item">
              <label>Recurring Expense Date:</label>
              <input
                type="date"
                name="date"
                min={getTodayDate()}
                value={recurringExpense.date}
                onChange={handleUpdateRecurringExpenseDataChange}
                placeholder="Update the date of recurring expense..."
              ></input>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateRecurringExpense;
