import React, { useEffect, useState } from "react";
import "./recurringExpense.scss";
import { RecurringExpense } from "../../../../models/RecurringExpense";
import ExpenseBoxSection from "./components/expenseBoxSection/ExpenseBoxSection";
import axios from "axios";
import { handleError } from "../../../../helpers/ErrorHandler";
import DeleteElement from "../../../../components/delete/DeleteElement";
import { useNavigate } from "react-router-dom";
import UpdateRecurringExpense from "./components/updateRecurringExpense/UpdateRecurringExpense";

const api = "http://localhost:8080/api/";

const RecurringExpenseComponent = () => {
  const [elementId, setElementId] = useState<number>(0);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [openUpdateWindow, setOpenUpdateWindow] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPageSection1, setCurrentPageSection1] = useState<number>(1);
  const [currentPageSection2, setCurrentPageSection2] = useState<number>(1);
  const [currentPageSection3, setCurrentPageSection3] = useState<number>(1);
  const [currentPageSection4, setCurrentPageSection4] = useState<number>(1);
  const [totalPagesSection1, setTotalPagesSection1] = useState<number>(0);
  const [totalPagesSection2, setTotalPagesSection2] = useState<number>(0);
  const [totalPagesSection3, setTotalPagesSection3] = useState<number>(0);
  const [totalPagesSection4, setTotalPagesSection4] = useState<number>(0);
  const [recurringExpense, setRecurringExpense] = useState<RecurringExpense>({
    amount: 0,
    date: "",
    description: "",
    expenseFrequency: "",
    expenseName: "",
    expenseType: "",
    id: 0,
  });
  const [weeklyRecurringExpenses, setWeeklyRecurringExpenses] = useState<
    RecurringExpense[]
  >([]);
  const [monthlyRecurringExpenses, setMonthlyRecurringExpenses] = useState<
    RecurringExpense[]
  >([]);
  const [bimonthlyRecurringExpenses, setBimonthlyRecurringExpenses] = useState<
    RecurringExpense[]
  >([]);
  const [yearlyRecurringExpenses, setYearlyRecurringExpenses] = useState<
    RecurringExpense[]
  >([]);

  useEffect(() => {
    fetchWeeklyRecurringExpenses(sortField, sortOrder, currentPageSection1);
  }, [sortField, sortOrder, currentPageSection1, deleting, openUpdateWindow]);

  useEffect(() => {
    fetchMonthlyRecurringExpenses(sortField, sortOrder, currentPageSection2);
  }, [sortField, sortOrder, currentPageSection2, deleting, openUpdateWindow]);
  useEffect(() => {
    fetchBimonthlyRecurringExpenses(sortField, sortOrder, currentPageSection3);
  }, [sortField, sortOrder, currentPageSection3, deleting, openUpdateWindow]);

  useEffect(() => {
    fetchYearlyRecurringExpenses(sortField, sortOrder, currentPageSection4);
  }, [sortField, sortOrder, currentPageSection4, deleting, openUpdateWindow]);

  const fetchWeeklyRecurringExpenses = (
    field: string,
    order: string,
    page: number
  ) => {
    const endpoint = `${api}recurringExpenses/all/WEEKLY`;
    axios
      .get(endpoint, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: 3,
        },
      })
      .then((response) => {
        setWeeklyRecurringExpenses(response.data.content);
        setTotalPagesSection1(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };

  const fetchMonthlyRecurringExpenses = (
    field: string,
    order: string,
    page: number
  ) => {
    const endpoint = `${api}recurringExpenses/all/MONTHLY`;
    axios
      .get(endpoint, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: 3,
        },
      })
      .then((response) => {
        setMonthlyRecurringExpenses(response.data.content);
        setTotalPagesSection2(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };
  const fetchBimonthlyRecurringExpenses = (
    field: string,
    order: string,
    page: number
  ) => {
    const endpoint = `${api}recurringExpenses/all/BIMONTHLY`;
    axios
      .get(endpoint, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: 3,
        },
      })
      .then((response) => {
        setBimonthlyRecurringExpenses(response.data.content);
        setTotalPagesSection3(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };

  const fetchYearlyRecurringExpenses = (
    field: string,
    order: string,
    page: number
  ) => {
    const endpoint = `${api}recurringExpenses/all/YEARLY`;
    axios
      .get(endpoint, {
        params: {
          sort: `${field},${order}`,
          page: page - 1,
          size: 3,
        },
      })
      .then((response) => {
        setYearlyRecurringExpenses(response.data.content);
        setTotalPagesSection4(response.data.totalPages);
      })
      .catch((error: any) => handleError(error));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}recurringExpenses/delete/${elementId}`);
      setDeleting(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <ExpenseBoxSection
        currentPage={currentPageSection1}
        setCurrentPage={setCurrentPageSection1}
        recurringExpenses={weeklyRecurringExpenses}
        totalPages={totalPagesSection1}
        recurringExpenseTypeDescription="Weekly Expenses"
        setElementId={setElementId}
        setDeleting={setDeleting}
        setRecurringExpense={setRecurringExpense}
        setOpenUpdateWindow={setOpenUpdateWindow}
      />
      <ExpenseBoxSection
        currentPage={currentPageSection2}
        setCurrentPage={setCurrentPageSection2}
        recurringExpenses={monthlyRecurringExpenses}
        totalPages={totalPagesSection2}
        recurringExpenseTypeDescription="Monthly Expenses"
        setElementId={setElementId}
        setDeleting={setDeleting}
        setRecurringExpense={setRecurringExpense}
        setOpenUpdateWindow={setOpenUpdateWindow}
      />
      <ExpenseBoxSection
        currentPage={currentPageSection3}
        setCurrentPage={setCurrentPageSection3}
        recurringExpenses={bimonthlyRecurringExpenses}
        totalPages={totalPagesSection3}
        recurringExpenseTypeDescription="Bimonthly Expenses"
        setElementId={setElementId}
        setDeleting={setDeleting}
        setRecurringExpense={setRecurringExpense}
        setOpenUpdateWindow={setOpenUpdateWindow}
      />
      <ExpenseBoxSection
        currentPage={currentPageSection4}
        setCurrentPage={setCurrentPageSection4}
        recurringExpenses={yearlyRecurringExpenses}
        totalPages={totalPagesSection4}
        recurringExpenseTypeDescription="Yearly Expenses"
        setElementId={setElementId}
        setDeleting={setDeleting}
        setRecurringExpense={setRecurringExpense}
        setOpenUpdateWindow={setOpenUpdateWindow}
      />
      {deleting && (
        <DeleteElement setDeleting={setDeleting} handleDelete={handleDelete} />
      )}
      {openUpdateWindow && (
        <UpdateRecurringExpense
          setOpenUpdateWindow={setOpenUpdateWindow}
          elementId={elementId}
        />
      )}
    </div>
  );
};

export default RecurringExpenseComponent;
