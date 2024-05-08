import React, { useEffect, useState } from "react";
import "./addLoan.scss";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  loan: Loan;
  setLoan: React.Dispatch<React.SetStateAction<Loan>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLoan = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${api}loans/add`, props.loan)
      .then(() => {
        props.setOpen(false);
        props.setLoan({
          id: 0,
          endDateOFInstallment: "",
          loanName: "",
          numberOfInstallments: 0,
          numberOfPaidInstallments: 0,
          startDateOfInstallment: "",
          totalAmountOfLoan: 0,
          amountOfSingleInstallment: 0,
          loanStatus: "UNPAID",
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleAddNewLoanDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    props.setLoan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="addLoan">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add New Loan</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Loan Name</label>
            <input
              type="text"
              name="loanName"
              value={props.loan.loanName}
              onChange={handleAddNewLoanDataChange}
              placeholder="Type the name of your loan..."
            ></input>
          </div>
          <div className="item">
            <label>Number of paid installments</label>
            <input
              type="number"
              min={0}
              name="numberOfPaidInstallments"
              value={props.loan.numberOfPaidInstallments}
              onChange={handleAddNewLoanDataChange}
              placeholder="Type number of paid installments..."
            ></input>
          </div>
          <div className="item">
            <label>Total amount of loan</label>
            <input
              type="number"
              min={0}
              name="totalAmountOfLoan"
              value={props.loan.totalAmountOfLoan}
              onChange={handleAddNewLoanDataChange}
              placeholder="Type total amount of your loan..."
            ></input>
          </div>
          <div className="item">
            <label>Start date of installment</label>
            <input
              type="date"
              onKeyDown={handleDateKeyDown}
              name="startDateOfInstallment"
              value={props.loan.startDateOfInstallment}
              onChange={handleAddNewLoanDataChange}
              placeholder="Type starting date of installment..."
            ></input>
          </div>
          <div className="item">
            <label>Date of last installment</label>
            <input
              type="date"
              onKeyDown={handleDateKeyDown}
              name="endDateOFInstallment"
              value={props.loan.endDateOFInstallment}
              onChange={handleAddNewLoanDataChange}
              placeholder="Type date of last installment..."
            ></input>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
