import React, { useEffect, useState } from "react";
import "./expenseSummary.scss";
import axios from "axios";
import { handleError } from "../../../../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";
const ExpenseSummary = (props: { expensesSum: Record<string, number> }) => {
  

  const sumOfAllExpensesInCurrentMonth = () => {
    let sum = 0;
    for (const key in props.expensesSum) {
      sum += props.expensesSum[key];
    }
    return sum;
  }


  return (
    <div className="expenseSummary">
      <hr />
      <div className="expenseSummaryTitle">
        <h1>Total amount of fixed expenses in this month: <p>{sumOfAllExpensesInCurrentMonth()}</p> zł </h1>
        <h2>It includes:</h2>
      </div>
      <ul className="expenseSummaryList">
        <li>
          Weekly expenses: <p>{props.expensesSum.WEEKLY} zł</p>
        </li>
        <li>
          Monthly expenses: <p>{props.expensesSum.MONTHLY} zł</p>
        </li>
        <li>
          Bimonthly expenses: <p>{props.expensesSum.BIMONTHLY} zł</p>
        </li>
        <li>
          Yearly expenses: <p>{props.expensesSum.YEARLY} zł</p>
        </li>
      </ul>
    </div>
  );
};

export default ExpenseSummary;
