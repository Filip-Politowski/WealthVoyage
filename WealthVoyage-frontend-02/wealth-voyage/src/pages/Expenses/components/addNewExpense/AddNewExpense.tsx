import React from "react";
import { ExpenseOptions } from "../../../../data";
import RecurringExpenseForm from "./expenseForms/RecurringExpenseForm";
import "./addNewExpense.scss";
import SingleExpenseForm from "./expenseForms/SingleExpenseForm";
import PlannedExpenseForm from "./expenseForms/PlannedExpenseForm";
type Props = {
  setOpenAddWindow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExpenseOption: ExpenseOptions;
};
const AddNewExpense = (props: Props) => {
  return (
    <div className="addNewExpense">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenAddWindow(false)}>
          X
        </span>
        <h1>
          Add New{" "}
          {props.selectedExpenseOption.label.slice(
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
          <PlannedExpenseForm setOpenAddWindow={props.setOpenAddWindow} />
        )}
      </div>
    </div>
  );
};

export default AddNewExpense;
