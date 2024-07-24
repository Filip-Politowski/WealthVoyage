import React, { useEffect, useState } from "react";
import "./plannedExpenses.scss";
import Checkbox from "../../../../components/utils/checkBox/CheckBox";
import axios from "axios";
import { PlannedExpense } from "../../../../models/PlannedExpense";
import { handleError } from "../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const PlannedExpenses = () => {
  const [plannedExpenses, setPlannedExpenses] = useState<PlannedExpense[]>([]);

  useEffect(() => {
    fetchPlannedExpanses();
  }, []);

  const fetchPlannedExpanses = () => {
    axios
      .get(`${api}planedExpenses/all`)
      .then((response) => {
        setPlannedExpenses(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newStatus:string = checked ? "PAID" : "PAYABLE";
    console.log(newStatus)
    axios
      .put(`${api}planedExpenses/${id}/${newStatus}`)
      .then(() => {
     
        setPlannedExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === id ? { ...expense, status: newStatus } : expense
          )
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="plannedExpenses">
      <div className="plannedExpensesHeader">
        <h1>Your planned expenses</h1>
      </div>
      <div className="plannedExpensesBody">
        <ul>
          {plannedExpenses.map((plannedExpense) => (
            <li key={plannedExpense.id}>
              <div className="plannedExpenseRow">
                <div className="checkBoxAndText">
                  <Checkbox
                    checked={plannedExpense.status === "PAID"}
                    label={`${plannedExpense.name}`}
                    id={plannedExpense.id}
                    onChange={handleCheckboxChange}
                  />
                  <p>{plannedExpense.amount} zł</p>
                </div>
                <div className="actionButtons">
                  <img src="/edit.svg" alt="Edit" />
                  <img src="/delete-orange.svg" alt="Delete" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlannedExpenses;
