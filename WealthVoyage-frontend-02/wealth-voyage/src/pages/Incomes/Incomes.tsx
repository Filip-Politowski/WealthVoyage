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
import StyledSelect from "../../components/select/StyledSelect";

const api = "http://localhost:8080/api/";

const Incomes = () => {
  const storedTypeOfIncomeValue = sessionStorage.getItem("typeOfIncome");
  const storedIncomeStatusValue = sessionStorage.getItem("incomeStatus");
  const storedEndpointTypeValue = sessionStorage.getItem("endpointType");
  const storedYearValue = sessionStorage.getItem("year");
  const storedMonthValue = sessionStorage.getItem("month");
  const storedStartDateValue = sessionStorage.getItem("startDate");
  const storedEndDateValue = sessionStorage.getItem("endDate");

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [typeOfIncome, setTypeOfIncome] = useState<string>(
    storedTypeOfIncomeValue || "FIXED_INCOME"
  );
  const [incomeStatus, setIncomeStatus] = useState<string>(
    storedIncomeStatusValue || "ACTIVE"
  );
  const [open, setOpen] = useState(false);
  const [endpointType, setEndpointType] = useState<string>(
    storedEndpointTypeValue || "year"
  );
  const [startDate, setStartDate] = useState<string>(
    storedStartDateValue || ""
  );
  const [endDate, setEndDate] = useState<string>(storedEndDateValue || "");
  const [year, setYear] = useState<string>(
    storedYearValue || new Date().getFullYear().toString()
  );
  const [month, setMonth] = useState<string>(
    storedMonthValue || (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [selectedMonthOption, setSelectedMonthOption] =
    useState<MonthsOptions | null>(
      monthsOptions.find((option) => option.value === month) || null
    );
  const [selectedYearOption, setSelectedYearOption] =
    useState<YearsOptions | null>(
      yearsOptions.find((option) => option.value === year) || null
    );

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
    open,
  ]);

  const handleEndpointTypeChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setEndpointType(selectedOption.value);
      sessionStorage.setItem("endpointType", selectedOption.value);
    }
  };

  const handleTypeOfIncomeChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setTypeOfIncome(selectedOption.value);
      sessionStorage.setItem("typeOfIncome", selectedOption.value);
    }
  };

  const handleIncomeStatusChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setIncomeStatus(selectedOption.value);
      sessionStorage.setItem("incomeStatus", selectedOption.value);
    }
  };

  const handleMonthSelection = (selectedOption: SingleValue<MonthsOptions>) => {
    if (selectedOption) {
      setSelectedMonthOption(selectedOption);
      setMonth(selectedOption.value);
      sessionStorage.setItem("month", selectedOption.value);
    }
  };

  const handleYearSelection = (selectedOption: SingleValue<YearsOptions>) => {
    if (selectedOption) {
      setSelectedYearOption(selectedOption);
      setYear(selectedOption.value);
      sessionStorage.setItem("year", selectedOption.value);
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    sessionStorage.setItem("startDate", value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    sessionStorage.setItem("endDate", value);
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
          <StyledSelect
            value={{ value: endpointType, label: endpointType.toUpperCase() }}
            onChange={handleEndpointTypeChange}
            options={[
              { value: "month", label: "Select by month" },
              { value: "range", label: "Select by range" },
              { value: "year", label: "Select by Year" },
            ]}
          />

          {endpointType === "year" && (
            <StyledSelect
              value={selectedYearOption}
              onChange={handleYearSelection}
              options={yearsOptions}
            />
          )}

          {endpointType === "month" && (
            <StyledSelect
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
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
              />
            </>
          )}
          <StyledSelect
            value={{ value: typeOfIncome, label: typeOfIncome }}
            onChange={handleTypeOfIncomeChange}
            options={[
              { value: "FIXED_INCOME", label: "Fixed Income" },
              { value: "SUPPLEMENTARY_INCOME", label: "Supplementary Income" },
              { value: "SINGLE_PAYMENT", label: "Single Payment" },
            ]}
          />

          <StyledSelect
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
