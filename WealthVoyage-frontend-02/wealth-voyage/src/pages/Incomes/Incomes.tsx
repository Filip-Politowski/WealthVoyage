import React, { useState } from "react";
import "./incomes.scss";


const exampleData = [
  {
    username: "user1",
    amount: 1500.0,
    incomeDate: "2024-01-01",
    sourceOfIncome: "JOB",
    typeofIncome: "FIXED",
    description: "Monthly salary",
  },
  {
    username: "user2",
    amount: 200.0,
    incomeDate: "2024-01-15",
    sourceOfIncome: "FREELANCE",
    typeofIncome: "FIXED",
    description: "Freelance project",
  },
  {
    username: "user2",
    amount: 200.0,
    incomeDate: "2024-01-15",
    sourceOfIncome: "FREELANCE",
    typeofIncome: "FIXED",
    description: "Freelance project",
  },
  {
    username: "user2",
    amount: 200.0,
    incomeDate: "2024-01-15",
    sourceOfIncome: "FREELANCE",
    typeofIncome: "FIXED",
    description: "Freelance project",
  },
  {
    username: "user3",
    amount: 300.0,
    incomeDate: "2024-02-01",
    sourceOfIncome: "INVESTMENT",
    typeofIncome: "SUPPLEMENTARY",
    description: "Stock dividends",
  },
];

const Incomes = () => {
  const [selectedIncome, setSelectedIncome] = useState<string>("fixed");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncome(event.target.value);
  };

  return (
    <div className="incomes">
      <div className="incomesHeader">
        <div className="title">
          <h1>Incomes</h1>
          <button>Add new source of income</button>
        </div>
        <div className="customSelect">
          <select name="" id="" onChange={handleSelectChange}>
            <option value="fixed">Fixed incomes</option>
            <option value="supplementary">Supplementary incomes</option>
          </select>
          <span className="customArrow"></span>
        </div>
      </div>
      <div className="listOfAllIncomes">
        {selectedIncome === "fixed" && (
          <div className="fixedIncomesList">
            <h1>Fixed incomes</h1>
            <div className="incomeBoxes">
              {exampleData
                .filter((income) => income.typeofIncome === "FIXED")
                .map((income, index) => (
                  <div key={index} className="incomeBox">
                    <p>
                      <strong>Username:</strong> {income.username}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${income.amount}
                    </p>
                    <p>
                      <strong>Date:</strong> {income.incomeDate}
                    </p>
                    <p>
                      <strong>Source:</strong> {income.sourceOfIncome}
                    </p>
                    <p>
                      <strong>Type:</strong> {income.typeofIncome}
                    </p>
                    <p>
                      <strong>Description:</strong> {income.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        {selectedIncome === "supplementary" && (
          <div className="supplementaryIncomesList">
            <h1>Supplementary incomes</h1>
            <div className="incomeBoxes">
              {exampleData
                .filter((income) => income.typeofIncome === "SUPPLEMENTARY")
                .map((income, index) => (
                  <div key={index} className="incomeBox">
                    <p>
                      <strong>Username:</strong> {income.username}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${income.amount}
                    </p>
                    <p>
                      <strong>Date:</strong> {income.incomeDate}
                    </p>
                    <p>
                      <strong>Source:</strong> {income.sourceOfIncome}
                    </p>
                    <p>
                      <strong>Type:</strong> {income.typeofIncome}
                    </p>
                    <p>
                      <strong>Description:</strong> {income.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomes;
