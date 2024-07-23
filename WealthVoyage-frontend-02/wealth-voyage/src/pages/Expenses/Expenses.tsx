import React, { useState } from "react";
import "./expenses.scss";
import StyledSelect from "../../components/select/StyledSelect";
import { ExpenseOptions, expenseOptions } from "../../data";
import { SingleValue } from "react-select";

import SingleExpenseComponent from "./components/singleExpense/SingleExpenseComponent";
import RecurringExpenseComponent from "./components/recurringExpenses/RecurringExpenseComponent";

import AddNewExpense from "./components/addNewExpense/AddNewExpense";
import PlannedExpenses from "./components/plannedExpenses/PlannedExpenses";

const Expenses = () => {
  const [selectedExpenseOption, setSelectedExpenseOption] =
    useState<ExpenseOptions | null>(
      expenseOptions.find((option) => option.value === "singleExpenses") ||
        expenseOptions[0]
    );
  const [openAddWindow, setOpenAddWindow] = useState<boolean>(false);
  const [expenseOption, setExpenseOption] = useState<string>("singleExpenses");

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
          <button onClick={() => setOpenAddWindow(true)}>
            Add new expense
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
      {expenseOption === "singleExpenses" && <SingleExpenseComponent />}
      {expenseOption === "recurringExpenses" && (
        <RecurringExpenseComponent openAddWindow={openAddWindow} />
      )}
      {expenseOption === "planedExpenses" && (
        <PlannedExpenses />
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
