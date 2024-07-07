import React from "react";
import "./recurringExpense.scss";

import { RecurringExpense } from "../../../../models/RecurringExpense";
import ExpenseBoxSection from "./components/ExpenseBoxSection";

type Props = {
  recurringExpenses: RecurringExpense[];
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
};

const RecurringExpenseComponent = (props: Props) => {
  return (
    <ExpenseBoxSection
      currentPage={props.currentPage}
      goToPage={props.goToPage}
      recurringExpenses={props.recurringExpenses}
      totalPages={props.totalPages}
      recurringExpenseTypeDescription="Weekly Expenses"
    />
  );
};

export default RecurringExpenseComponent;
