import axios from 'axios';
import React, { useState } from 'react'
import { RecurringExpense } from "../../../../../models/RecurringExpense";
import { handleError } from '../../../../../helpers/ErrorHandler';
const api = "http://localhost:8080/api/";

type Props = {
    setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
}


const RecurringExpenseForm = (props: Props) => {
    const [recurringExpense, setRecurringExpense] = useState<RecurringExpense>({
      amount: 0,
      date: "",
      description: "",
      expenseFrequency: "",
      expenseName: "",
      expenseType: "",
      id: 0,
    });

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  axios
    .post(`${api}recurringExpenses/add`, recurringExpense)
    .then(() => {
      props.setOpenAddWindow(false);
      setRecurringExpense({
        id: 0,
        amount: 0,
        description: "",
        date: "",
        expenseFrequency: "",
        expenseName: "",
        expenseType: "",
      });
    })
    .catch((error) => {
      handleError(error);
    });
};

const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
    const  {name, value} = e.target;

    setRecurringExpense((prevState) => ({
        ...prevState,
        [name]: value,
    }))
};

const getTodayDate = (): string => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();


  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="item">
        <label>Recurring Expense Name:</label>
        <input
          type="text"
          name="expenseName"
          value={recurringExpense.expenseName}
          onChange={handleDataChange}
          placeholder="Type recurring expense name..."
        />
      </div>
      <div className="item">
        <label>Recurring Expense Type:</label>
        <select
          name="expenseType"
          value={recurringExpense.expenseType}
          onChange={handleDataChange}
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
          onChange={handleDataChange}
          placeholder="Type the amount of recurring expense..."
        ></input>
      </div>
      <div className="item">
        <label>Recurring Expense Type:</label>
        <select
          name="expenseFrequency"
          value={recurringExpense.expenseFrequency}
          onChange={handleDataChange}
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
          onChange={handleDataChange}
          placeholder="Type the description of recurring expense..."
        ></input>
      </div>
      <div className="item">
        <label>Recurring Expense Date:</label>
        <input
          type="date"
          name="date"
          min={getTodayDate()}
          value={recurringExpense.date}
          onChange={handleDataChange}
          placeholder="Type the date of recurring expense..."
        ></input>
      </div>
      <button>Add</button>
    </form>
  );
};

export default RecurringExpenseForm
