import React, { useEffect, useState } from "react";
import "./expenses.scss";
import StyledSelect from "../../components/select/StyledSelect";
import {
  ExpenseOptions,
  OrderOptionsSingleExpense,
  SortOptionsSingleExpense,
  expenseOptions,
  sortOptions,
  orderOptions,
} from "../../data";
import { SingleValue } from "react-select";
import { SingleExpense } from "../../models/SingleExpense";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import SingleExpenseComponent from "./components/singleExpense/SingleExpenseComponent";
const api = "http://localhost:8080/api/";

const Expenses = () => {
  const [selectedExpenseOption, setSelectedExpenseOption] =
    useState<ExpenseOptions | null>(
      expenseOptions.find((option) => option.value === "singleExpenses") ||
        expenseOptions[0]
    );
  const [expenseOption, setExpenseOption] = useState<string>("singleExpenses");
  const [singleExpenses, setSingleExpenses] = useState<SingleExpense[]>([]);
  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (expenseOption === "singleExpenses") {
      fetchSingleExpenses(sortField, sortOrder, currentPage);
    } else if (expenseOption === "recurringExpenses") {
      console.log("recurringExpenses");
    } else if (expenseOption === "planedExpenses") {
      console.log("planedExpenses");
    } else {
      console.log("No expense option selected");
    }
  }, [expenseOption, sortField, sortOrder, currentPage]);

  const fetchSingleExpenses = (field: string, order: string, page: number) => {
    axios
      .get(`${api}singleExpenses/all`, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: 10,
        },
      })
      .then((response) => {
        setSingleExpenses(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };

  const handleExpenseSelection = (
    selectedOption: SingleValue<ExpenseOptions>
  ) => {
    if (selectedOption) {
      setSelectedExpenseOption(selectedOption);
      setExpenseOption(selectedOption.value);
    }
  };

  const handleSortFieldChange = (
    selectedOption: SingleValue<SortOptionsSingleExpense>
  ) => {
    if (selectedOption) {
      setSortField(selectedOption.value);
    }
  };

  const handleSortOrderChange = (
    selectedOption: SingleValue<OrderOptionsSingleExpense>
  ) => {
    if (selectedOption) {
      setSortOrder(selectedOption.value);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="expenses">
      <div className="expensesHeader">
        <div className="title">
          <h1>Expenses</h1>
          <button>Add new expense</button>
        </div>
        <div className="customSelect">
          <StyledSelect
            value={selectedExpenseOption}
            onChange={handleExpenseSelection}
            options={expenseOptions}
            defaultValue={expenseOptions[0]}
          />
        </div>
      </div>
      {expenseOption === "singleExpenses" && (
        <SingleExpenseComponent
          singleExpenses={singleExpenses}
          sortField={sortField}
          sortOrder={sortOrder}
          sortOptions={sortOptions}
          orderOptions={orderOptions}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          onSortFieldChange={handleSortFieldChange}
          onSortOrderChange={handleSortOrderChange}
        />
      )}
      {expenseOption === "recurringExpenses" && (
        <div className="recurringExpenses">Welcome recurring expenses</div>
      )}
      {expenseOption === "planedExpenses" && (
        <div className="budget">Welcome planned expenses</div>
      )}
    </div>
  );
};

export default Expenses;
