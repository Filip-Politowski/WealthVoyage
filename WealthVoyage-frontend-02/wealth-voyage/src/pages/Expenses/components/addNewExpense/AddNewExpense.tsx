import React from "react";
import { ExpenseOptions } from "../../../../data";
import RecurringExpenseForm from "./expenseForms/RecurringExpenseForm";
import "./addNewExpense.scss"
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
        <h1>Add New {props.selectedExpenseOption.label.slice( 0, props.selectedExpenseOption.label.length - 1)}</h1>
        {props.selectedExpenseOption.value === "recurringExpenses" && (
          <RecurringExpenseForm setOpenAddWindow={props.setOpenAddWindow} />
        )}
        
      </div>
    </div>
  );
};

export default AddNewExpense;
