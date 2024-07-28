import React, { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { SingleExpense } from "../../../../models/SingleExpense";
import "./singleExpense.scss";
import StyledSelect from "../../../../components/select/StyledSelect";
import {
  OrderOptionsSingleExpense,
  SingleExpenseCategory,
  SortOptionsSingleExpense,
  orderOptions,
  singleExpenseCategory,
  sortOptions,
} from "../../../../data";
import SingleExpenseTable from "./components/SingleExpenseTable";
import Pagination from "../../../../components/utils/springPagination/Pagination";
import DeleteElement from "../../../../components/delete/DeleteElement";
import axios from "axios";
import { handleError } from "../../../../helpers/ErrorHandler";
import UpdateSingleExpense from "./components/updateSingleExpense/UpdateSingleExpense";
const api = "http://localhost:8080/api/";

const SingleExpenseComponent = (props: { openAddWindow: boolean}) => {
  const [singleExpenses, setSingleExpenses] = useState<SingleExpense[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [elementId, setElementId] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState<string>("All");
  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 10;

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchSingleExpenses(sortField, sortOrder, currentPage);
  }, [
    sortField,
    sortOrder,
    currentPage,
    selectedCategory,
    selectedDate,
    deleting,
    editing,
    props.openAddWindow
  ]);

  const fetchSingleExpenses = (field: string, order: string, page: number) => {
    const endpointAll = `${api}singleExpenses/all/${selectedCategory}`;
    const endpointByDate = `${api}singleExpenses/byDate/${selectedCategory}/${selectedDate}`;

    axios
      .get(selectedDate === "" ? endpointAll : endpointByDate, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: itemsPerPage,
        },
      })
      .then((response) => {
        const sortedExpenses = response.data.content;
        setSingleExpenses(sortedExpenses);
        setTotalPages(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };

  const filteredExpenses = singleExpenses.filter((expense) => {
    const matchesSearchTerm = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const handleCategoryChange = (
    selectedOption: SingleValue<SingleExpenseCategory> | null
  ) => {
    if (selectedOption) {
      setSelectedCategory(selectedOption.value);
      setSelectedCategoryLabel(selectedOption.label);
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

  const handleDelete = () => {
    axios
      .delete(`${api}singleExpenses/delete/${elementId}`)
      .then(() => {
        setDeleting(false);
      })
      .catch((error) => {
        handleError(error);
      });
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <label htmlFor="category">Category: </label>
          <StyledSelect
            value={{
              label: selectedCategoryLabel,
              value: selectedCategory,
            }}
            onChange={handleCategoryChange}
            options={singleExpenseCategory}
          />
          <label htmlFor="sortField">Sort by: </label>
          <StyledSelect
            value={sortOptions.find((option) => option.value === sortField)}
            onChange={handleSortFieldChange}
            options={sortOptions}
          />
          <label htmlFor="sortOrder">Order: </label>
          <StyledSelect
            value={orderOptions.find((option) => option.value === sortOrder)}
            onChange={handleSortOrderChange}
            options={orderOptions}
          />
        </div>
      </div>
      <SingleExpenseTable
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        singleExpenses={filteredExpenses}
        setDeleting={setDeleting}
        setElementId={setElementId}
        setEditing={setEditing}
      />
      <Pagination
        currentPage={currentPage}
        goToPage={goToPage}
        totalPages={totalPages}
      />
      {deleting && (
        <DeleteElement setDeleting={setDeleting} handleDelete={handleDelete} />
      )}
      {editing && (
        <UpdateSingleExpense
          elementId={elementId}
          setOpenUpdateWindow={setEditing}
        />
      )}
    </div>
  );
};

export default SingleExpenseComponent;
