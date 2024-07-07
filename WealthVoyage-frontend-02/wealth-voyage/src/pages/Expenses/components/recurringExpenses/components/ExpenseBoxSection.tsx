import React from 'react'
import "./expenseBoxSection.scss"
import { RecurringExpense } from '../../../../../models/RecurringExpense';

type Props = {
currentPage: number;
totalPages: number;
goToPage: (pageNumber: number) => void;
recurringExpenses: RecurringExpense[];
recurringExpenseTypeDescription: string;
}

const ExpenseBoxSection = (props: Props) => {
  return (
    <div className="expenseBoxSection">
      <div className="expenseType">
        <h3>{props.recurringExpenseTypeDescription}</h3>
      </div>
      <div className="nextPage">
        {props.currentPage > 1 && (
          <button onClick={() => props.goToPage(props.currentPage - 1)}>
            <img src="/arrow-left.svg" alt="arrow-left" />
          </button>
        )}
      </div>
      <div className="incomeBoxes">
        {props.recurringExpenses.map((recurringExpense, index) => (
          <div key={index} className="incomeBox">
            <p>{recurringExpense.description}</p>
            <p>{recurringExpense.amount}</p>
          </div>
        ))}
      </div>
      <div className="nextPage">
        {props.currentPage < props.totalPages && (
          <button onClick={() => props.goToPage(props.currentPage + 1)}>
            <img src="/arrow-right.svg" alt="arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseBoxSection
