import React, { useState } from "react";
import "./expenses.scss";
import { Select } from "@mui/material";
import StyledSelect from "../../components/select/StyledSelect";
import { ExpenseOptions, expenseOptions } from "../../data";
import { SingleValue } from "react-select";
const Expenses = () => {
  const [expenseOption, setExpenseOption] = useState<string>("");
  const [selectedExpenseOption, setSelectedExpenseOption] =
    useState<ExpenseOptions | null>(expenseOptions[0]);

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
    </div>
  );
};

export default Expenses;
