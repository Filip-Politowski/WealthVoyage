import React from "react";
import { SingleExpense } from "../../../../../models/SingleExpense";

const SingleExpenseTable = (props: {
  singleExpenses: SingleExpense[];
  currentPage: number;
  itemsPerPage: number;
}) => {
  return (
    <table className="singleExpenseTable">
      <thead>
        <tr>
          <th>No.</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.singleExpenses.map((singleExpense, index) => (
          <tr key={singleExpense.id}>
            <td>{index + 1 + (props.currentPage - 1) * props.itemsPerPage}.</td>
            <td>{singleExpense.description}</td>
            <td>{singleExpense.amount} zł</td>
            <td>{singleExpense.date}</td>
            <td>{singleExpense.expenseCategory}</td>
            <td className="actions">
              <img src="/edit.svg" alt="edit" />{" "}
              <img src="/delete-orange.svg" alt="delete" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SingleExpenseTable;
