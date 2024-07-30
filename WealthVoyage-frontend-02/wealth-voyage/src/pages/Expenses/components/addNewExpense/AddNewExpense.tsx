import React from "react";
import { ExpenseOptions } from "../../../../data";
import RecurringExpenseForm from "./expenseForms/RecurringExpenseForm";
import "./addNewExpense.scss";
import SingleExpenseForm from "./expenseForms/SingleExpenseForm";
import SetOfPlannedExpensesForm from "./expenseForms/SetOfPlannedExpensesForm";
type Props = {
  setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExpenseOption: ExpenseOptions;
};
const AddNewExpense = (props: Props) => {
  console.log(props.selectedExpenseOption)
  return (
    <div className="addNewExpense">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenAddWindow(false)}>
          X
        </span>
        <h1>
          Add New{" "}
          {props.selectedExpenseOption.value === "plannedExpenses"
            ? "List Of Planned Expenses"
            : props.selectedExpenseOption.label.slice(
                0,
                props.selectedExpenseOption.label.length - 1
              )}
        </h1>
        {props.selectedExpenseOption.value === "recurringExpenses" && (
          <RecurringExpenseForm setOpenAddWindow={props.setOpenAddWindow} />
        )}
        {props.selectedExpenseOption.value === "singleExpenses" && (
          <SingleExpenseForm setOpenAddWindow={props.setOpenAddWindow} />
        )}
        {props.selectedExpenseOption.value === "plannedExpenses" && (
          <SetOfPlannedExpensesForm setOpenAddWindow={props.setOpenAddWindow} />
        )}
      </div>
    </div>
  );
};

export default AddNewExpense;
