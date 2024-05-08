import React, { useState } from "react";
import "./updateLoan.scss";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  loan: Loan;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateLoan = (props: Props) => {
  const [loan, setLoan] = useState<Loan>({
    id: props.loan.id,
    amountOfSingleInstallment: props.loan.amountOfSingleInstallment,
    endDateOFInstallment: props.loan.endDateOFInstallment,
    loanName: props.loan.loanName,
    loanStatus: props.loan.loanStatus,
    numberOfInstallments: props.loan.numberOfInstallments,
    numberOfPaidInstallments: props.loan.numberOfPaidInstallments,
    startDateOfInstallment: props.loan.startDateOfInstallment,
    totalAmountOfLoan: props.loan.totalAmountOfLoan,
  });

  const handleUpdateLoanDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLoan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    axios
      .put(`${api}loans/update/${loan.id}`, loan)
      .then(() => {
        props.setOpen(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="updateLoan">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Update Loan</h1>
        {props.loan && (
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Loan Name</label>
              <input
                type="text"
                name="loanName"
                value={loan.loanName}
                onChange={handleUpdateLoanDataChange}
                placeholder="Type the name of your loan..."
              ></input>
            </div>
            <div className="item">
              <label>Loan amount:</label>
              <input
                type="number"
                name="totalAmountOfLoan"
                value={loan.totalAmountOfLoan}
                onChange={handleUpdateLoanDataChange}
                placeholder="Update the amount of loan..."
              />
            </div>
            <div className="item">
              <label>Number of installments:</label>
              <input
                type="number"
                name="numberOfInstallments"
                value={loan.numberOfInstallments}
                onChange={handleUpdateLoanDataChange}
                placeholder="Update the number of installments..."
              />
            </div>
            <div className="item">
              <label>Start date of loan:</label>
              <input
                type="date"
                name="startDateOfInstallment"
                value={loan.startDateOfInstallment}
                onChange={handleUpdateLoanDataChange}
                placeholder="Update the start date of loan..."
              />
            </div>
            <div className="item">
              <label>End date of loan:</label>
              <input
                type="date"
                name="endDateOFInstallment"
                value={loan.endDateOFInstallment}
                onChange={handleUpdateLoanDataChange}
                placeholder="Update the end date of loan..."
              />
            </div>
            <div className="item">
              <label>Status:</label>
              <select
                name="loanStatus"
                value={loan.loanStatus}
                onChange={handleSelectChange}
              >
                <option value="UNPAID"> Loan unpaid in this month</option>
                <option value="PAID_OFF">Loan paid in this month</option>
              </select>
            </div>
            <button>Update</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateLoan;
