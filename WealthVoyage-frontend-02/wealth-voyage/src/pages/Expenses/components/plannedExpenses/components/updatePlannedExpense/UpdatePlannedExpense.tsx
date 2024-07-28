import React, { useState } from "react";
import "./updatePlannedExpense.scss";

import { PlannedExpense } from "../../../../../../models/PlannedExpense";
import { getTodayDate } from "../../../../../../components/utils/getTodayDate/GetTodayDate";
import axios from "axios";
import { handleError } from "../../../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const UpdatePlannedExpense = (props: {
  elementId: number;
  setOpenUpdateWindow: React.Dispatch<React.SetStateAction<boolean>>;
  plannedExpense: PlannedExpense;
  setPlannedExpense: React.Dispatch<React.SetStateAction<PlannedExpense>>;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `${api}plannedExpenses/update/${props.elementId}`,
        props.plannedExpense
      )
      .then(() => {
        props.setOpenUpdateWindow(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleUpdatePlannedExpenseDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    props.setPlannedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="updatePlannedExpense">
      <div className="modal">
        <span
          className="close"
          onClick={() => props.setOpenUpdateWindow(false)}
        >
          X
        </span>
        <h1>Update Planned Expense</h1>
        {props.plannedExpense && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Planned Expense Name:</label>
              <input
                type="text"
                name="name"
                value={props.plannedExpense.name}
                onChange={handleUpdatePlannedExpenseDataChange}
                placeholder="Update planned expense name..."
              />
            </div>
            <div className="item">
              <label>Planned Expense Amount:</label>
              <input
                type="number"
                name="amount"
                value={props.plannedExpense.amount}
                onChange={handleUpdatePlannedExpenseDataChange}
                placeholder="Update planned expense amount"
              />
            </div>
            <div className="item">
              <label>Planned Expense Description:</label>
              <input
                type="text"
                name="description"
                value={props.plannedExpense.description}
                onChange={handleUpdatePlannedExpenseDataChange}
                placeholder="Update planned expense description"
              />
            </div>
            <div className="item">
              <label>Planned Expense Payment Date:</label>
              <input
                type="date"
                min={getTodayDate()}
                name="paymentDate"
                value={props.plannedExpense.paymentDate}
                onChange={handleUpdatePlannedExpenseDataChange}
                placeholder="Update planned expense payment date"
              />
            </div>

            <div className="item">
              <label title="Level of importance of a given expense from 1 to 5">
                Planned Expense Priority:
              </label>
              <select
                title="Level of importance of a given expense from 1 to 5"
                name="priority"
                value={props.plannedExpense.priority}
                onChange={handleUpdatePlannedExpenseDataChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="item">
              <label>Planned Expense Payment Method:</label>
              <select
                name="paymentMethod"
                value={props.plannedExpense.paymentMethod}
                onChange={handleUpdatePlannedExpenseDataChange}
              >
                <option value="CARD">Card</option>
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="PAYPAL">PayPal</option>
                <option value="BLIK">BLIK</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePlannedExpense;
