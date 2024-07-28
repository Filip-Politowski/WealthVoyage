import React, { useEffect, useState } from "react";
import "./plannedExpenses.scss";
import Checkbox from "../../../../components/utils/checkBox/CheckBox";
import axios from "axios";
import { PlannedExpense } from "../../../../models/PlannedExpense";
import { handleError } from "../../../../helpers/ErrorHandler";
import DeleteElement from "../../../../components/delete/DeleteElement";
import UpdatePlannedExpense from "./components/updatePlannedExpense/UpdatePlannedExpense";
import { Link } from "react-router-dom";
const api = "http://localhost:8080/api/";

const PlannedExpenses = (props: { addNewElement: boolean }) => {
  const [plannedExpenses, setPlannedExpenses] = useState<PlannedExpense[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [elementId, setElementId] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [checkBoxChange, setCheckBoxChange] = useState<boolean>(false);
  const [plannedExpense, setPlannedExpense] = useState<PlannedExpense>({
    amount: 0,
    description: "",
    id: 0,
    name: "",
    paymentDate: "",
    paymentMethod: "",
    priority: 0,
    status: "",
  });

  useEffect(() => {
    fetchPlannedExpanses();
  }, [deleting, editing, props.addNewElement, checkBoxChange]);

  const fetchPlannedExpanses = () => {
    axios
      .get(`${api}plannedExpenses/all`)
      .then((response) => {
        setPlannedExpenses(response.data.content);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    const newStatus: string = checked ? "PAID" : "PAYABLE";
    console.log(newStatus);
    axios
      .put(`${api}plannedExpenses/${id}/${newStatus}`)
      .then(() => {
        setCheckBoxChange((prevState) => !prevState);
        setPlannedExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === id ? { ...expense, status: newStatus } : expense
          )
        );
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleOnClickDeleteImg = (id: number) => {
    setElementId(id);
    setDeleting((prevState) => !prevState);
  };

  const handleOnClickUpdateImg = (id: number) => {
    const filteredExpense = plannedExpenses.find(
      (plannedExpense) => plannedExpense.id === id
    );
    if (filteredExpense) {
      setPlannedExpense(filteredExpense);
      setEditing(true);
      setElementId(id);
    } else {
      console.error(`Expense with id ${id} not found.`);
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "green";
      case 2:
        return "yellowgreen";
      case 3:
        return "yellow";
      case 4:
        return "orange";
      case 5:
        return "red";
      default:
        return "grey";
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}planedExpenses/${elementId}`);
      setDeleting(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="plannedExpenses">
      <div className="plannedExpensesHeader">
        <h1>Your planned expenses</h1>
      </div>
      <div className="plannedExpensesBody">
        <ul>
          {plannedExpenses.map((plannedExpense) => (
            <li
              key={plannedExpense.id}
              className={plannedExpense.status === "PAID" ? "paidElement" : ""}
            >
              <div className="plannedExpenseRow">
                <div className="checkBoxAndText">
                  <Checkbox
                    checked={plannedExpense.status === "PAID"}
                    label={`${plannedExpense.name}`}
                    id={plannedExpense.id}
                    onChange={handleCheckboxChange}
                  />
                  <p>{plannedExpense.amount} zł</p>
                </div>
                <div className="actionButtons">
                  <Link to={`/dashboard/plannedExpense/${plannedExpense.id}`}>
                    <img src="/details.svg" alt="details" title="details" />
                  </Link>
                  <img
                    onClick={() => handleOnClickUpdateImg(plannedExpense.id)}
                    src="/edit.svg"
                    alt="Edit"
                    title="edit"
                  />
                  <img
                    onClick={() => handleOnClickDeleteImg(plannedExpense.id)}
                    src="/delete-orange.svg"
                    alt="Delete"
                    title="delete"
                  />
                  <div
                    className="expensePriority"
                    style={{
                      backgroundColor: getPriorityColor(
                        plannedExpense.priority
                      ),
                    }}
                    title="Expense priority"
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editing && (
        <UpdatePlannedExpense
          elementId={elementId}
          plannedExpense={plannedExpense}
          setOpenUpdateWindow={setEditing}
          setPlannedExpense={setPlannedExpense}
        />
      )}
      {deleting && (
        <DeleteElement handleDelete={handleDelete} setDeleting={setDeleting} />
      )}
    </div>
  );
};

export default PlannedExpenses;
