import React, { useState } from "react";
import "./add.scss";
import axios from "axios";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransaction = (props: Props) => {
  const [transaction, setTransaction] = useState<Transaction>({
    amount: 0,
    category: "",
    date: "",
    id: 0,
    transactionType: "INCOME",
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .post(`${api}transactions/add`, transaction)
      .then(() => {
        props.setOpen(false);
        setTransaction({
          amount: 0,
          category: "",
          date: "",
          id: 0,
          transactionType: "",
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleAddNewTransactionDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNewTransactionSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Transaction amount</label>
            <input
              type="number"
              name="amount"
              min={0}
              step="0.01"
              value={transaction.amount}
              onChange={handleAddNewTransactionDataChange}
              placeholder="Type transaction amount..."
            ></input>
          </div>
          <div className="item">
            <label>Date of transaction</label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleAddNewTransactionDataChange}
              placeholder="Pick date of transaction"
            ></input>
          </div>
          <div className="item">
            <label>Purpose of payment or revenue</label>
            <input
              type="text"
              name="category"
              value={transaction.category}
              onChange={handleAddNewTransactionDataChange}
              placeholder="Type transaction name..."
            ></input>
          </div>
          <div className="item">
            <label>Transaction type:</label>
            <select
              name="transactionType"
              value={transaction.transactionType}
              onChange={handleAddNewTransactionSelectChange}
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
