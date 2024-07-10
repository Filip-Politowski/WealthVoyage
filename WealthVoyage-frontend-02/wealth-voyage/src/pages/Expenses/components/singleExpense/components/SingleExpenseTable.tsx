import React from "react";
import { SingleExpense } from "../../../../../models/SingleExpense";

const SingleExpenseTable = (props: {
  singleExpenses: SingleExpense[];
  currentPage: number;
  itemsPerPage: number;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setElementId: React.Dispatch<React.SetStateAction<number>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleDeleteClick = (id: number) => {
    props.setDeleting((prevState) => !prevState);
    props.setElementId(id);
  };

  const handleEditClick = (id: number) => {
    props.setEditing((prevState) => !prevState);
    props.setElementId(id);
  };

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
              <img src="/edit.svg" alt="edit" onClick={() => handleEditClick(singleExpense.id)}/>
              <img
                src="/delete-orange.svg"
                alt="delete"
                onClick={() => handleDeleteClick(singleExpense.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SingleExpenseTable;
