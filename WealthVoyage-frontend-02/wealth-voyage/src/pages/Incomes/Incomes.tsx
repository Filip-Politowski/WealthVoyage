import React, { useEffect, useState } from "react";
import "./incomes.scss";
import { Link, useNavigate } from "react-router-dom";
import AddNewIncome from "../../components/add/AddNewIncome";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Income } from "../../models/Income";
import Select, { SingleValue, ActionMeta } from "react-select";
import { MonthsOptions, monthsOptions } from "../../data";

const api = "http://localhost:8080/api/";

const Incomes = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [typeOfIncome, setTypeOfIncome] = useState<string>("FIXED_INCOME");
  const [incomeStatus, setIncomeStatus] = useState<string>("ACTIVE");
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [endpointType, setEndpointType] = useState<string>("month"); // 'month', 'range', or 'year'
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const getCurrentDateFormatted = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = getCurrentDateFormatted();
      setCurrentDate(formattedDate);
    };
    fetchData();
  }, []);

  const generateEndpoint = () => {
    switch (endpointType) {
      case "month":
        return `${api}incomes/filtered/month/${currentDate}/${typeOfIncome}/${incomeStatus}`;
      case "range":
        return `${api}incomes/filtered/range/${startDate}/${endDate}/${typeOfIncome}/${incomeStatus}`;
      case "year":
        return `${api}incomes/filtered/year/${year}/${typeOfIncome}/${incomeStatus}`;
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchFilteredIncomes = async () => {
      const endpoint = generateEndpoint();
      if (endpoint) {
        try {
          const response = await axios.get(endpoint);
          setIncomes(response.data.content);
        } catch (error) {
          handleError(error);
        }
      }
    };

    fetchFilteredIncomes();
  }, [endpointType, currentDate, startDate, endDate, year, typeOfIncome, incomeStatus]);

  const handleEndpointTypeChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setEndpointType(selectedOption.value);
    }
  };

  const handleTypeOfIncomeChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setTypeOfIncome(selectedOption.value);
    }
  };

  const handleIncomeStatusChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setIncomeStatus(selectedOption.value);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = incomes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomes = incomes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            value={{ value: endpointType, label: endpointType.toUpperCase() }}
            onChange={handleEndpointTypeChange}
            options={[
              { value: "month", label: "Month" },
              { value: "range", label: "Range" },
              { value: "year", label: "Year" },
            ]}
          />
          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            value={{ value: typeOfIncome, label: typeOfIncome }}
            onChange={handleTypeOfIncomeChange}
            options={[
              { value: "FIXED_INCOME", label: "Fixed Income" },
              { value: "SUPPLEMENTARY_INCOME", label: "Supplementary Income" },
            ]}
          />
          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            value={{ value: incomeStatus, label: incomeStatus }}
            onChange={handleIncomeStatusChange}
            options={[
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
              { value: "SINGLE_PAYMENT", label: "Single Payment" },
            ]}
          />
        </div>
      </div>

      <div className="listOfAllIncomes">
        <div className="incomeBoxes">
          {incomes.length > 0 &&
            incomes.map((income) => (
              <Link to={`/dashboard/income/${income.id}`}>
                <div className="incomeBox">
                  <h2>
                    <strong>Amount:</strong> {income.amount} zł
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

      {/* {selectedIncomeStatus === "INACTIVE" && (
        <div className="activities">
          <h2>Inactive incomes</h2>
          <table>
            <thead>
              <tr>
                <th>Type of income</th>
                <th>Source of income</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentIncomes.map((income) => (
                <tr
                  key={income.id}
                  onClick={() => navigate(`/dashboard/income/${income.id}`)}
                >
                  <td>{income.typeOfIncome}</td>
                  <td>{income.sourceOfIncome}</td>
                  <td>{income.amount} zł</td>
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
      )} */}

      {open && <AddNewIncome setOpen={setOpen} />}
    </div>
  );
};

export default Incomes;
