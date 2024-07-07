import React from "react";
import "./expenseBoxSection.scss";
import { RecurringExpense } from "../../../../../models/RecurringExpense";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  recurringExpenses: RecurringExpense[];
  recurringExpenseTypeDescription: string;
  setElementId: React.Dispatch<React.SetStateAction<number>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseBoxSection = (props: Props) => {
  const handleClickOnDeleteImg = (id: number) => {
    props.setElementId(id);
    props.setDeleting((prevState) => !prevState);
  };

  return (
    <div className="expenseBoxSection">
      <div className="expenseType">
        <h3>{props.recurringExpenseTypeDescription}</h3>
      </div>
      <div className="nextPage">
        {props.currentPage > 1 && (
          <button onClick={() => props.setCurrentPage(props.currentPage - 1)}>
            <img src="/arrow-left.svg" alt="arrow-left" />
          </button>
        )}
      </div>
      <div className="incomeBoxes">
        {props.recurringExpenses.map((recurringExpense, index) => (
          <div key={index} className="incomeBox">
            <div className="actionIcons">
              <img src="/edit.svg" alt="edit" />
              <img
                onClick={() => handleClickOnDeleteImg(recurringExpense.id)}
                src="/delete-orange.svg"
                alt="delete"
              />
            </div>
            <h3 className="expenseName">{recurringExpense.expenseName}</h3>
            <p>{recurringExpense.description}</p>
            <h3>{recurringExpense.amount} zł</h3>
            <p>Type: {recurringExpense.expenseType}</p>
            <div className="dateRow">
              <p>Date:</p>
              <p>{recurringExpense.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="nextPage">
        {props.currentPage < props.totalPages && (
          <button onClick={() => props.setCurrentPage(props.currentPage + 1)}>
            <img src="/arrow-right.svg" alt="arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseBoxSection;
