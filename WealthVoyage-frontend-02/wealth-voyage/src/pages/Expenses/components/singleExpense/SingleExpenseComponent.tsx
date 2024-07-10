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
import SingleExpenseTable from "./components/SingleExpenseTable";
import Pagination from "../../../../components/utils/springPagination/Pagination";

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
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  itemsPerPage: number;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

const SingleExpenseComponent = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
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
    return matchesSearchTerm;
  });

  const handleCategoryChange = (
    selectedOption: SingleValue<SingleExpenseCategory> | null
  ) => {
    if (selectedOption) {
      props.setSelectedCategory(selectedOption.value);
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
          <label>Date:</label>
          <input
            type="date"
            value={props.selectedDate}
            onChange={(e) => props.setSelectedDate(e.target.value)}
          />
          <label htmlFor="category">Category: </label>
          <StyledSelect
            value={{
              label: selectedCategoryLabel,
              value: props.selectedCategory,
            }}
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
      <SingleExpenseTable
        currentPage={props.currentPage}
        itemsPerPage={props.itemsPerPage}
        singleExpenses={filteredExpenses}
      />
      <Pagination
        currentPage={props.currentPage}
        goToPage={props.goToPage}
        totalPages={props.totalPages}
      />
    </div>
  );
};

export default SingleExpenseComponent;
