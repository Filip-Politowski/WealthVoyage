import { useEffect, useState } from "react";
import "./incomes.scss";
import { Link, useNavigate } from "react-router-dom";
import AddNewIncome from "../../components/add/AddNewIncome";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Income } from "../../models/Income";
import Select, { SingleValue } from "react-select";
import {
  MonthsOptions,
  YearsOptions,
  monthsOptions,
  yearsOptions,
} from "../../data";

const api = "http://localhost:8080/api/";

const Incomes = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [typeOfIncome, setTypeOfIncome] = useState<string>("FIXED_INCOME");
  const [incomeStatus, setIncomeStatus] = useState<string>("ACTIVE");
  const [open, setOpen] = useState(false);
  const [endpointType, setEndpointType] = useState<string>("month");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedMonthOption, setSelectedMonthOption] =
    useState<MonthsOptions | null>(null);
  const [selectedYearOption, setSelectedYearOption] =
    useState<YearsOptions | null>(null);

  const generateEndpoint = () => {
    switch (endpointType) {
      case "month":
        return `${api}incomes/filtered/month/${year}-${month}/${typeOfIncome}/${incomeStatus}`;
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
  }, [
    endpointType,
    startDate,
    endDate,
    year,
    typeOfIncome,
    incomeStatus,
    month,
  ]);

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

  const handleMonthSelection = (selectedOption: SingleValue<MonthsOptions>) => {
    if (selectedOption) {
      setSelectedMonthOption(selectedOption);
      setMonth(selectedOption.value);
    }
  };

  const handleYearSelection = (selectedOption: SingleValue<YearsOptions>) => {
    if (selectedOption) {
      setSelectedYearOption(selectedOption);
      setYear(selectedOption.value);
    }
  };

  const sumOfSelectedIncomes = (): number => {
    let sum: number = 0;
    for (let i = 0; i < incomes.length; i++) {
      sum += incomes[i].amount;
    }
    return sum;
  };

  return (
    <div className="incomes">
      <div className="incomesHeader">
        <div className="title">
          <h1>Incomes</h1>
          <button onClick={() => setOpen(true)}>
            Add new source of income
          </button>

          <h2>Sum of selected incomes: {sumOfSelectedIncomes()} zł</h2>
        </div>
        <div className="customSelect">
          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            value={{ value: endpointType, label: endpointType.toUpperCase() }}
            onChange={handleEndpointTypeChange}
            options={[
              { value: "month", label: "Select by month" },
              { value: "range", label: "Select by range" },
              { value: "year", label: "Select by Year" },
            ]}
          />

          {endpointType === "year" && (
            <Select
              className="my-select-container"
              classNamePrefix="my-select"
              value={selectedYearOption}
              onChange={handleYearSelection}
              options={yearsOptions}
            />
          )}

          {endpointType === "month" && (
            <Select
              className="my-select-container"
              classNamePrefix="my-select"
              value={selectedMonthOption}
              onChange={handleMonthSelection}
              options={monthsOptions}
            />
          )}
          {endpointType === "range" && (
            <>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </>
          )}

          <Select
            className="my-select-container"
            classNamePrefix="my-select"
            value={{ value: typeOfIncome, label: typeOfIncome }}
            onChange={handleTypeOfIncomeChange}
            options={[
              { value: "FIXED_INCOME", label: "Fixed Income" },
              { value: "SUPPLEMENTARY_INCOME", label: "Supplementary Income" },
              { value: "SINGLE_PAYMENT", label: "Single Payment" },
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
      {incomes.length === 0 && (
        <p className="incomesNotFound">
          There are no incomes in selected category 😔
        </p>
      )}

      {open && <AddNewIncome setOpen={setOpen} />}
    </div>
  );
};

export default Incomes;
