import React, { useEffect, useState } from "react";
import "./expenses.scss";
import StyledSelect from "../../components/select/StyledSelect";
import { ExpenseOptions, expenseOptions } from "../../data";
import { SingleValue } from "react-select";
import { SingleExpense } from "../../models/SingleExpense";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import SingleExpenseComponent from "./components/singleExpense/SingleExpenseComponent";
const api = "http://localhost:8080/api/";

const Expenses = () => {
  const [selectedExpenseOption, setSelectedExpenseOption] =
    useState<ExpenseOptions | null>(
      expenseOptions.find((option) => option.value === "singleExpenses") ||
        expenseOptions[0]
    );
  const [expenseOption, setExpenseOption] = useState<string>("singleExpenses");
  const [singleExpenses, setSingleExpenses] = useState<SingleExpense[]>([]);

  useEffect(() => {
    if (expenseOption === "singleExpenses") {
      axios
        .get(`${api}singleExpenses/all`)
        .then((response) => {
          setSingleExpenses(response.data.content);
        })
        .catch((error: any) => handleError(error));
    } else if (expenseOption === "recurringExpenses") {
      console.log("recurringExpenses");
    } else if (expenseOption === "planedExpenses") {
      console.log("planedExpenses");
    } else {
      console.log("No expense option selected");
    }
  }, [expenseOption]);

  const handleExpenseSelection = (
    selectedOption: SingleValue<ExpenseOptions>
  ) => {
    if (selectedOption) {
      setSelectedExpenseOption(selectedOption);
      setExpenseOption(selectedOption.value);
    }
  };

  return (
    <div className="expenses">
      <div className="expensesHeader">
        <div className="title">
          <h1>Expenses</h1>
          <button>Add new expense</button>
        </div>
        <div className="customSelect">
          <StyledSelect
            value={selectedExpenseOption}
            onChange={handleExpenseSelection}
            options={expenseOptions}
            defaultValue={expenseOptions[0]}
          />
        </div>
      </div>
      {expenseOption === "singleExpenses" && (
       <SingleExpenseComponent singleExpenses={singleExpenses}/>
      )}
      {expenseOption === "recurringExpenses" && (
        <div className="recurringExpenses">Welcome recurring expenses</div>
      )}
      {expenseOption === "planedExpenses" && (
        <div className="budget">Welcome planedExpenses</div>
      )}
    </div>
  );
};

export default Expenses;
