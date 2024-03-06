import React from "react";
import "./topBox.scss";
import { lastTransactions } from "../../data";
const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Last transactions</h1>
      <div className="list">
        {lastTransactions.map((transaction) => (
          <div className="listItem" key={transaction.id}>
            <div className="transaction">
              {transaction.transactionType === "income" ? (
                <img src="/arrowup.svg" alt="Income" />
              ) : (
                <img src="/arrowdown.svg" alt="Expense" />
              )}
              <div className="transactionText">
                <span className="transactionDate">{transaction.date}</span>
                <span className="transactionType">
                  {transaction.transactionType}
                </span>
              </div>
            </div>
            <span className="amount">{transaction.amount} zł</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
