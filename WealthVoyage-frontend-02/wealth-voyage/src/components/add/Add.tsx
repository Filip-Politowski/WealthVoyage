import React, { useEffect, useState } from "react";
import "./add.scss";
import { Loan } from "../../models/Loan";
import axios from "axios";
import { handleError } from "../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  loan: Loan;
  setLoan: React.Dispatch<React.SetStateAction<Loan>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
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
          amountOfSingleInstallment:0,
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
    const updatedLoan = {
      ...props.loan,
      [name]: value,
    };
    const numberOfInstallments = calculateMonthDifference(
      new Date(updatedLoan.startDateOfInstallment),
      new Date(updatedLoan.endDateOFInstallment)
    );
    props.setLoan((prevState) => ({
      ...prevState,
      ...updatedLoan,
      numberOfInstallments: numberOfInstallments,
    }));
  };
  const calculateMonthDifference = (
    startDateString: Date,
    endDateString: Date
  ) => {
    let months: number;
    months = (endDateString.getFullYear() - startDateString.getFullYear()) * 12;
    months -= startDateString.getMonth();
    months += endDateString.getMonth();
    return months <= 0 ? 0 : months;
  };

  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="add">
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

export default Add;
