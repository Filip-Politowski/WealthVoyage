import React, { useEffect, useState } from "react";
import "./plannedExpense.scss";
import axios from "axios";
import { handleError } from "../../../../../../helpers/ErrorHandler";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../../../../components/utils/backButton/BackButton";
import { PlannedExpense } from "../../../../../../models/PlannedExpense";
const api = "http://localhost:8080/api/";

const PlannedExpenseComponent = () => {
  const [plannedExpense, setPlannedExpense] = useState<PlannedExpense>();
  const { id } = useParams();

useEffect(() => {
  fetchPlannedExpense();
},[])

  const fetchPlannedExpense = () => {
    axios
      .get(`${api}plannedExpenses/${id}`)
      .then((response) => {
        setPlannedExpense(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="plannedExpense">
      <BackButton />
      <div className="topInfo">
        <h1>Planned Expense Details</h1>
      </div>
      <hr />
      <div className="plannedExpenseDetails">
        {plannedExpense &&
          Object.entries(plannedExpense)
            .filter((item) => item[0] !== "id")
            .map((item, index) => (
              <div className="row" key={index}>
                <div className="rowDetails">
                  <p>
                    {item[0][0].toUpperCase() +
                      item[0]
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}
                  </p>
                  <p className="fetchedDataFromPlannedExpense">
                    {item[0] === "amount"
                      ? `${Number(item[1]).toFixed(2)} zł`
                      : item[1]}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PlannedExpenseComponent;
