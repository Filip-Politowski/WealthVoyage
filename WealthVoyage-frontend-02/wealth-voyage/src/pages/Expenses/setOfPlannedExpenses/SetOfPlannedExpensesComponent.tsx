import React, { useEffect, useState } from "react";
import SetBoxSection from "./components/setBoxSection/SetBoxSection";
import axios from "axios";
import { SetOfPlannedExpenses } from "../../../models/SetOfPlannedExpenses";
import { handleError } from "../../../helpers/ErrorHandler";
import DeleteElement from "../../../components/delete/DeleteElement";
import UpdateSetOfPlannedExpense from "./components/updateSetOfPlannedExpense/UpdateSetOfPlannedExpense";
const api = "http://localhost:8080/api/";

const SetOfPlannedExpensesComponent = () => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [elementId, setElementId] = useState<number>(0);
  const [openUpdateWindow, setOpenUpdateWindow] = useState<boolean>(false);
  const [setOfPlannedExpenses, setSetOfPlannedExpenses] = useState<
    SetOfPlannedExpenses[]
  >([]);

  useEffect(() => {
    fetchSetOfPlannedExpenses();
  }, [openUpdateWindow, deleting])

  const fetchSetOfPlannedExpenses = () => {
    axios
      .get(`${api}setOfPlannedExpenses/all`)
      .then((response) => {
        setSetOfPlannedExpenses(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${api}setOfPlannedExpenses/delete/${elementId}`);
      setDeleting(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="setOfPlannedExpenses">
      <SetBoxSection
        setDeleting={setDeleting}
        setElementId={setElementId}
        setOfPlannedExpenses={setOfPlannedExpenses}
        setOpenUpdateWindow={setOpenUpdateWindow}
      />
      {deleting && (
        <DeleteElement setDeleting={setDeleting} handleDelete={handleDelete} />
      )}
      {openUpdateWindow &&
      <UpdateSetOfPlannedExpense elementId={elementId} setOpenUpdateWindow={setOpenUpdateWindow}/>
      }
     
    </div>
  );
};

export default SetOfPlannedExpensesComponent;
