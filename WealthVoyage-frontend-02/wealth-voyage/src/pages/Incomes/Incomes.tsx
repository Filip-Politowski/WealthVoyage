import React, { useEffect, useState } from "react";
import "./incomes.scss";
import { Link } from "react-router-dom";
import AddNewIncome from "../../components/add/AddNewIncome";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Income } from "../../models/Income";
import Select from "react-select";
import { MonthsOptions, monthsOptions } from "../../data";

const api = "http://localhost:8080/api/";

const incomeTypeOptions = [
  { value: "all", label: "All Incomes" },
  { value: "fixed", label: "Fixed incomes" },
  { value: "supplementary", label: "Supplementary incomes" },
];

const Incomes = () => {
  const [selectedIncome, setSelectedIncome] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [sumOfFixedIncomes, setSumOfFixedIncomes] = useState<number>(0);
  const [sumOfSupplementaryIncomes, setSumOfSupplementaryIncomes] =
    useState<number>(0);

  const [selectedMonthOption, setSelectedMonthOption] =
    useState<MonthsOptions | null>(null);

  const yearOptions = [...Array(20)].map((_, i) => ({
    value: new Date().getFullYear() - i,
    label: (new Date().getFullYear() - i).toString(),
  }));

  const [selectedYearOption, setSelectedYearOption] = useState<{
    value: number | null;
    label: string;
  } | null>(null);

  const [selectedIncomeOption, setSelectedIncomeOption] = useState<{
    value: string;
    label: string;
  } | null>(incomeTypeOptions[0]);

  useEffect(() => {
    const fetchAllIncomes = async () => {
      try {
        const response1 = await axios.get(`${api}incomes/all`);
        const response2 = await axios.get(`${api}incomes/fixed/sum`);
        const response3 = await axios.get(`${api}incomes/supplementary/sum`);

        setIncomes(response1.data.content);
        setSumOfFixedIncomes(response2.data);
        setSumOfSupplementaryIncomes(response3.data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchAllIncomes();
  }, [open]);

  const filteredIncomes = incomes.filter((income) => {
    const incomeDate = new Date(income.incomeDate);
    return (
      (!selectedMonth || incomeDate.getMonth() + 1 === selectedMonth) &&
      (!selectedYear || incomeDate.getFullYear() === selectedYear) &&
      (selectedIncome === "all" ||
        income.typeOfIncome.toLowerCase().includes(selectedIncome))
    );
  });

  const handleYearChange = (
    selectedOption: {
      value: number | null;
      label: string;
    } | null
  ) => {
    setSelectedYearOption(selectedOption);
    setSelectedYear(selectedOption?.value || null);
  };

  const handleMonthChange = (selectedOption: MonthsOptions | null) => {
    setSelectedMonthOption(selectedOption);
    setSelectedMonth(selectedOption?.value || null);
  };

  const handleIncomeChange = (
    selectedOption: {
      value: string;
      label: string;
    } | null
  ) => {
    setSelectedIncomeOption(selectedOption);
    setSelectedIncome(selectedOption?.value || "all");
  };

  return (
    <div className="incomes">
      <div className="incomesHeader">
        <div className="title">
          <h1>Incomes</h1>
          <button onClick={() => setOpen(true)}>
            Add new source of income
          </button>

          {selectedIncome === "fixed" && (
            <div className="sumOfIncomes">
              <h3>Sum of all fixed incomes:</h3>
              <p> {sumOfFixedIncomes} zł</p>
            </div>
          )}
          {selectedIncome === "supplementary" && (
            <div className="sumOfIncomes">
              <h3>Sum of all supplementary incomes: </h3>
              <p>{sumOfSupplementaryIncomes} zł</p>
            </div>
          )}
          {selectedIncome === "all" && (
            <div className="sumOfIncomes">
              <h3>Sum of all incomes: </h3>
              <p>{sumOfSupplementaryIncomes + sumOfFixedIncomes} zł</p>
            </div>
          )}
        </div>
        <div className="customSelect">
          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            defaultValue={incomeTypeOptions[0]}
            value={selectedIncomeOption}
            onChange={handleIncomeChange}
            options={incomeTypeOptions}
          />

          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            defaultValue={monthsOptions[0]}
            value={selectedMonthOption}
            onChange={handleMonthChange}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            options={monthsOptions}
            placeholder={monthsOptions[0].label}
          />

          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            defaultValue={yearOptions[0]}
            value={selectedYearOption}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder={yearOptions[0].value}
          />
        </div>
      </div>

      <div className="listOfAllIncomes">
        <div className="incomeBoxes">
          {filteredIncomes.length > 0 ? (
            filteredIncomes.map((income, index) => (
              <Link key={index} to={`/dashboard/income/${income.id}`}>
                <div className="incomeBox">
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
            ))
          ) : (
            <p>No incomes found for the selected filters.</p>
          )}
        </div>
      </div>

      {open && <AddNewIncome setOpen={setOpen} />}
    </div>
  );
};

export default Incomes;
