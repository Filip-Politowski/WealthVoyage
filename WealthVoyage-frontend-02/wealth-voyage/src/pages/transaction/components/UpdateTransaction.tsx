import React, { useState } from "react";
import { Transaction } from "../../../models/Transaction";
import { handleError } from "../../../helpers/ErrorHandler";
import "./updateTransaction.scss";
import axios from "axios";
const api = "http://localhost:8080/api/";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction;
};

const UpdateTransaction = (props: Props) => {
  const [transaction, setTransaction] = useState<Transaction>({
    amount: props.transaction.amount,
    category: props.transaction.category,
    date: props.transaction.date,
    id: props.transaction.id ,
    transactionType: props.transaction.transactionType,
  });

  const handleUpdateTransactionDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(`${api}transactions/update/${transaction.id}`, transaction)
      .then(() => {
        props.setOpen(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };
console.log(transaction)
  return (
    <div className="updateTransaction">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Update Transaction</h1>
        {props.transaction && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Transaction amount</label>
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleUpdateTransactionDataChange}
                placeholder="Update the amount of transaction..."
              ></input>
            </div>
            <div className="item">
              <label>Status:</label>
              <select
                name="transactionType"
                value={transaction.transactionType}
                onChange={handleSelectChange}
              >
                <option value="INCOME"> Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTransaction;
