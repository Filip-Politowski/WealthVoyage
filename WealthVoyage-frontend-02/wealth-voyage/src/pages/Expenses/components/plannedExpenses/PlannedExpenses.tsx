import React, { useEffect, useState } from "react";
import "./plannedExpenses.scss";
import Checkbox from "../../../../components/utils/checkBox/CheckBox";
import axios from "axios";
import { PlannedExpense } from "../../../../models/PlannedExpense";
import { handleError } from "../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

const PlannedExpenses = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  const [plannedExpenses, setPlannedExpenses] = useState<PlannedExpense[]>([]);
  useEffect(() => {
    fetchPlannedExpanses();
  }, [isChecked]);

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

  return (
    <div className="plannedExpenses">
      <div className="plannedExpensesHeader">
        <h1>Yours planned expenses</h1>
      </div>
      <div className="plannedExpensesBody">
        <ul>
          {plannedExpenses &&
            plannedExpenses.map((plannedExpense) => (
              <li>
                <div className="plannedExpenseRow">
                  <div className="checkBoxAndText">
                    <Checkbox
                      checked={isChecked}
                      label={`${plannedExpense.name};`}
                      onChange={handleCheckboxChange}
                    />
                    <p>{plannedExpense.amount} zł</p>
                  </div>
                  <div className="actionButtons">
                    <img src="/edit.svg" alt="" />
                    <img src="/delete-orange.svg" alt="" />
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
