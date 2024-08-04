import React, { useEffect, useState } from "react";
import "./topBox.scss";
import axios from "axios";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";
const TopBox = () => {

const [transactions, setTransactions] = useState<Transaction[]>([]);
   
   useEffect(() => {
     const fetchUserTransactions = async () => {
       try {
         const response = await axios.get(`${api}transactions/all`, {
           params: {
             page: 0,
             size: 5,
             sort: "date,desc",
           },
         });
         setTransactions(response.data.content);
       } catch (error) {
         handleError(error);
       }
     };
     fetchUserTransactions();
   }, []);
 
  return (
    <div className="topBox">
      <h1>Last transactions</h1>
      <div className="list">
        {transactions.map((transaction) => (
          <div className="listItem" key={transaction.id}>
            <div className="transaction">
              {transaction.transactionType === "INCOME" ? (
                <img src="/arrowup.svg" alt="INCOME" />
              ) : (
                <img src="/arrowdown.svg" alt="EXPENSE" />
              )}
              <div className="transactionText">
                <span className="transactionDate">{transaction.date}</span>
                <span className="transactionType">
                  {transaction.transactionType}
                </span>
                <span className="transactionType">
                  
                  {transaction.transactionCategory}
                </span>
              </div>
            </div>
            <span className="amount">{transaction.amount.toFixed(2)} zł</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
