import React, { useEffect, useState } from "react";
import "./incomes.scss";
import { Link } from "react-router-dom";
import AddNewIncome from "../../components/add/AddNewIncome";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Income } from "../../models/Income";
const api = "http://localhost:8080/api/";

const Incomes = () => {
  const [selectedIncome, setSelectedIncome] = useState<string>("fixed");
  const [open, setOpen] = useState(false);

  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const fetchAllIncomes = async () => {
      try {
        const response = await axios.get(`${api}incomes/all`);
        const data = response.data;

        if (data && Array.isArray(data.content)) {
          console.log(data.content);
          setIncomes(data.content);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchAllIncomes();
  }, [open]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncome(event.target.value);
  };
  return (
    <div className="incomes">
      <div className="incomesHeader">
        <div className="title">
          <h1>Incomes</h1>
          <button onClick={() => setOpen(true)}>
            Add new source of income
          </button>
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
              {incomes
                .filter((income) => income.typeOfIncome === "FIXED_INCOME")
                .map((income, index) => (
                  <Link to={`/dashboard/income/${income.id}`}>
                    <div key={index} className="incomeBox">
                      <h2>
                        <strong>Amount:</strong> ${income.amount}
                      </h2>
                      <p>
                        <strong>Date:</strong> {income.incomeDate}
                      </p>
                      <p>
                        <strong>Source:</strong> {income.sourceOfIncome}
                      </p>
                      <p>
                        <strong>Type:</strong> {income.typeOfIncome}
                      </p>
                      <p>
                        <strong>Description:</strong> {income.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
        {selectedIncome === "supplementary" && (
          <div className="supplementaryIncomesList">
            <h1>Supplementary incomes</h1>
            <div className="incomeBoxes">
              {incomes
                .filter(
                  (income) => income.typeOfIncome === "SUPPLEMENTARY_INCOME"
                )
                .map((income, index) => (
                  <div key={index} className="incomeBox">
                    <h2>
                      <strong>Amount:</strong> ${income.amount}
                    </h2>
                    <p>
                      <strong>Date:</strong> {income.incomeDate}
                    </p>
                    <p>
                      <strong>Source:</strong> {income.sourceOfIncome}
                    </p>
                    <p>
                      <strong>Type:</strong> {income.typeOfIncome}
                    </p>
                    <p>
                      <strong>Description:</strong> {income.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        {open && <AddNewIncome setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default Incomes;
