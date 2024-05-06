import "./installment.scss";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Loan } from "../../models/Loan";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/utils/progressBar/ProgressBar";
import { Transaction } from "../../models/Transaction";
import { handleError } from "../../helpers/ErrorHandler";
import BackButton from "../../components/utils/backButton/BackButton";
import UpdateLoan from "../../components/update/UpdateLoan";

const api = "http://localhost:8080/api/";

const Installment = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState<Loan>({
    loanName: "",
    amountOfSingleInstallment: 0,
    endDateOFInstallment: "",
    id: 0,
    loanStatus: "",
    numberOfInstallments: 0,
    numberOfPaidInstallments: 0,
    startDateOfInstallment: "",
    totalAmountOfLoan: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const repaidAmount = loan
    ? loan.amountOfSingleInstallment * loan.numberOfPaidInstallments
    : 0;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const fetchLoan = async () => {
      const response = await axios.get(`${api}loans/${id}`);
      if (JSON.stringify(loan) !== JSON.stringify(response.data)) {
        setLoan(response.data);
      }
    };
    fetchLoan();
  }, [loan, id, open]);
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

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="instalment">
      <BackButton />
      <div className="topInfo">
        <img src="/single-loan.svg" alt="single loan" />
        <h1>{loan?.loanName.toUpperCase()}</h1>
        <button onClick={() => setOpen(true)}>Update</button>
      </div>
      <div className="instalmentContent">
        <div className="info">
          <div className="details">
            <div className="item">
              <label>Loan amount: </label>
              <p>{loan?.totalAmountOfLoan.toFixed(2)} zł</p>
            </div>
            <div className="item">
              <label>Amount repaid: </label>
              <p>{repaidAmount.toFixed(2)} zł</p>
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
              <label>Start date of loan: </label>
              <p>{loan?.startDateOfInstallment}</p>
            </div>
            <div className="item">
              <label>End date of loan: </label>
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
            <span>Loan repayment progress </span>
          </div>
        </div>

        <div className="activities">
          <h2>Latest transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount.toFixed(2)} zł</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <div>
              {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)}{" "}
              of {totalItems}
            </div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastItem >= totalItems}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {open && (
        <UpdateLoan
          setOpen={setOpen}
          loan={loan}
        />
      )}
    </div>
  );
};

export default Installment;
