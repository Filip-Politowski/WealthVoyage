import React from "react";
import SingleView from "../../components/installmentSingleView/InstallmentSingleView";
import { singleTransaction } from "../../data";
import "./transaction.scss";
import TransactionSingleView from "../../components/transactionSingleView/TransactionSingleView";

const transaction = () => {
  const progressBar = {
    percentage: 50,
    color: "white",
  };
  return (
    <div className="transaction">
      <TransactionSingleView transaction={singleTransaction}/>
    </div>
  );
};

export default transaction;
