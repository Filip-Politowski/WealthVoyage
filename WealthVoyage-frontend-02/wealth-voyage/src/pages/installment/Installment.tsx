import "./installment.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loan } from "../../models/Loan";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/utils/progressBar/ProgressBar";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";
import transaction from "../transaction/Transaction";

const api = "http://localhost:8080/api/";

const Installment = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState<Loan>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const fetchLoan = async () => {
      const response = await axios.get(`${api}loans/${id}`);
      if (JSON.stringify(loan) !== JSON.stringify(response.data)) {
        setLoan(response.data);
      }
    };
    fetchLoan();
  }, [loan, id]);
  useEffect(() => {
    const fetchTransactionAssignedToLoan = async () => {
      try {
        const response = await axios.get(`${api}transactions/loan/all/${id}`);
        setTransactions(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchTransactionAssignedToLoan();
  }, [id]);

  const progressBar = {
    percentage: loan
      ? (loan.numberOfPaidInstallments / loan.numberOfInstallments) * 100
      : 0,
    color: "rgb(66, 79, 90)",
  };
  const repaidAmount = loan ? loan.amountOfSingleInstallment * loan.numberOfPaidInstallments : 0;

  return (
    <div className="installment">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="/single-loan.svg" alt="single loan" />
            <h1>{loan?.loanName.toUpperCase()}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            <div className="item">
              <label>Loan amount: </label>
              <p>{loan?.totalAmountOfLoan} zł</p>
            </div>
            <div className="item">
              <label>Amount repaid: </label>
              <p>{repaidAmount} zł</p>
            </div>
            <div className="item">
              <label>Amount of a single installment: </label>

              <p>{loan?.amountOfSingleInstallment.toFixed(2)} zł</p>
            </div>
            <div className="item">
              <label>Number of installments: </label>
              <p>{loan?.numberOfInstallments}</p>
            </div>
            <div className="item">
              <label>Number of paid installments: </label>
              <p>{loan?.numberOfPaidInstallments}</p>
            </div>

            <div className="item">
              <label>Start date of installment: </label>
              <p>{loan?.startDateOfInstallment}</p>
            </div>
            <div className="item">
              <label>End date of installment: </label>
              <p>{loan?.endDateOFInstallment}</p>
            </div>
            <div className="item">
              <label>Status: </label>
              <p>{loan?.loanStatus}</p>
            </div>
          </div>
          <div className="progressContainer">
            <ProgressBar
              percentage={progressBar.percentage}
              color={progressBar.color}
            />
            <span>Progress</span>
          </div>
        </div>
      </div>

      <div className="activities">
        <h2>Latest transactions</h2>

        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <div>
                <label>{transaction.category}</label>
                <p>{transaction.amount} zł</p>
                <time>Payment date: {transaction.date}</time>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Installment;
