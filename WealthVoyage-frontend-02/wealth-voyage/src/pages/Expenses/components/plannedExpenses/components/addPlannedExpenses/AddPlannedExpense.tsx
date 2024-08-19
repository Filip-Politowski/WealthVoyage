import React, { useState } from "react";
import "./addPlannedExpense.scss";
import { PlannedExpense } from "../../../../../../models/PlannedExpense";
import axios from "axios";
import { handleError } from "../../../../../../helpers/ErrorHandler";
import { getTodayDate } from "../../../../../../components/utils/getTodayDate/GetTodayDate";
import { useParams } from "react-router-dom";
const api = "http://localhost:8080/api/";

const AddPlannedExpense = (props: {
  setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const {id} = useParams();
  const [plannedExpense, setPlannedExpense] = useState<PlannedExpense>({
    amount: 0,
    description: "",
    id: 0,
    name: "",
    paymentDate: "",
    paymentMethod: "CARD",
    priority: 1,
    status: "PAYABLE",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${api}plannedExpenses/add/${id}`, plannedExpense)
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
    setPlannedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="addNewPlannedExpense">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenAddWindow(false)}>
          X
        </span>
        <h1>Add New Planned Expense</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Planned Expense Name:</label>
            <input
              type="text"
              name="name"
              value={plannedExpense.name}
              onChange={handleDataChange}
              placeholder="Type planned expense name"
            />
          </div>
          <div className="item">
            <label>Planned Expense Amount:</label>
            <input
              type="number"
              name="amount"
              value={plannedExpense.amount}
              onChange={handleDataChange}
            />
          </div>
          <div className="item">
            <label>Planned Expense Description:</label>
            <input
              type="text"
              name="description"
              value={plannedExpense.description}
              onChange={handleDataChange}
              placeholder="Type planned expense description"
            />
          </div>
          <div className="item">
            <label>Planned Expense Payment Date:</label>
            <input
              type="date"
              name="paymentDate"
              min={getTodayDate()}
              value={plannedExpense.paymentDate}
              onChange={handleDataChange}
            />
          </div>
          <div className="item">
            <label>Planned Expense Priority:</label>
            <select
              name="priority"
              value={plannedExpense.priority}
              onChange={handleDataChange}
              title="Priority 1 is the lowest priority"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="item">
            <label>Planned Expense Payment Type:</label>
            <select
              name="paymentMethod"
              value={plannedExpense.paymentMethod}
              onChange={handleDataChange}
            >
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
              <option value="BANK_TRANSFER">Bank transfer</option>
              <option value="PAYPAL">PayPal</option>
              <option value="BLIK">BLIK</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlannedExpense;
