import React, { useState } from "react";
import "./expenses.scss";
import StyledSelect from "../../components/select/StyledSelect";
import { ExpenseOptions, expenseOptions } from "../../data";
import { SingleValue } from "react-select";

import SingleExpenseComponent from "./components/singleExpense/SingleExpenseComponent";
import RecurringExpenseComponent from "./components/recurringExpenses/RecurringExpenseComponent";

import AddNewExpense from "./components/addNewExpense/AddNewExpense";

import SetOfPlannedExpensesComponent from "./setOfPlannedExpenses/SetOfPlannedExpensesComponent";

const Expenses = () => {
  
  const storedOptionValue = sessionStorage.getItem("selectedExpenseOption");
  const initialOption =
    expenseOptions.find((option) => option.value === storedOptionValue) ||
    expenseOptions[0];

  const [selectedExpenseOption, setSelectedExpenseOption] =
    useState<ExpenseOptions | null>(initialOption);
  const [openAddWindow, setOpenAddWindow] = useState<boolean>(false);
  const [expenseOption, setExpenseOption] = useState<string>(
    initialOption.value
  );

  const handleExpenseSelection = (
    selectedOption: SingleValue<ExpenseOptions>
  ) => {
    if (selectedOption) {
      setSelectedExpenseOption(selectedOption);
      setExpenseOption(selectedOption.value);
      sessionStorage.setItem("selectedExpenseOption", selectedOption.value); 
    }
  };

  return (
    <div className="expenses">
      <div className="expensesHeader">
        <div className="title">
          <h1>Expenses</h1>
          <button onClick={() => setOpenAddWindow(true)}>
            Add new
          </button>
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
        <SingleExpenseComponent openAddWindow={openAddWindow} />
      )}
      {expenseOption === "recurringExpenses" && (
        <RecurringExpenseComponent openAddWindow={openAddWindow} />
      )}
      {expenseOption === "plannedExpenses" && (
        <SetOfPlannedExpensesComponent openAddWindow={openAddWindow} />
      )}
      {openAddWindow && (
        <AddNewExpense
          setOpenAddWindow={setOpenAddWindow}
          selectedExpenseOption={selectedExpenseOption as ExpenseOptions}
        />
      )}
    </div>
  );
};

export default Expenses;
