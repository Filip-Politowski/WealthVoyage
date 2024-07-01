import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { SingleExpense } from "../../../../models/SingleExpense";
import "./singleExpense.scss";
import StyledSelect from "../../../../components/select/StyledSelect";
import {
  OrderOptionsSingleExpense,
  SingleExpenseCategory,
  SortOptionsSingleExpense,
  singleExpenseCategory,
} from "../../../../data";

type Props = {
  singleExpenses: SingleExpense[];
  sortField: string;
  sortOrder: string;
  sortOptions: SortOptionsSingleExpense[];
  orderOptions: OrderOptionsSingleExpense[];
  onSortFieldChange: (
    selectedOption: SingleValue<SortOptionsSingleExpense>
  ) => void;
  onSortOrderChange: (
    selectedOption: SingleValue<OrderOptionsSingleExpense>
  ) => void;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

const SingleExpenseComponent = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState<string>("All");

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const filteredExpenses = props.singleExpenses.filter((expense) => {
    const matchesSearchTerm = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      expense.expenseCategory === selectedCategory;

    return matchesSearchTerm && matchesCategory;
  });

  const handleCategoryChange = (
    selectedOption: SingleValue<SingleExpenseCategory> | null
  ) => {
    if (selectedOption) {
      setSelectedCategory(selectedOption.value);
      setSelectedCategoryLabel(selectedOption.label);
    }
  };

  return (
    <div className="singleExpenses">
      <div className="sortingControls">
        <div className="searchBar">
          <label htmlFor="search">Search by Description:</label>
          <img src="/search.svg" alt="" />
          <input
            type="text"
            placeholder={"Enter description..."}
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>

        <div className="customSelect">
          <label htmlFor="category">Category: </label>
          <StyledSelect
            value={{ label: selectedCategoryLabel, value: selectedCategory }}
            onChange={handleCategoryChange}
            options={singleExpenseCategory}
          />
          <label htmlFor="sortField">Sort by: </label>
          <StyledSelect
            value={props.sortOptions.find(
              (option) => option.value === props.sortField
            )}
            onChange={props.onSortFieldChange}
            options={props.sortOptions}
          />

          <label htmlFor="sortOrder">Order: </label>

          <StyledSelect
            value={props.orderOptions.find(
              (option) => option.value === props.sortOrder
            )}
            onChange={props.onSortOrderChange}
            options={props.orderOptions}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((singleExpense) => (
            <tr key={singleExpense.id}>
              <td>{singleExpense.expenseCategory}</td>
              <td>{singleExpense.amount}</td>
              <td>{singleExpense.date}</td>
              <td>{singleExpense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {props.currentPage > 1 && (
          <button onClick={() => props.goToPage(props.currentPage - 1)}>
            Previous
          </button>
        )}
        <span>
          Page {props.currentPage} of {props.totalPages}
        </span>
        {props.currentPage < props.totalPages && (
          <button onClick={() => props.goToPage(props.currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleExpenseComponent;
