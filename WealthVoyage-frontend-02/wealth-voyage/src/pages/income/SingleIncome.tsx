import { useNavigate, useParams } from "react-router-dom";
import "./income.scss";

import { useEffect, useState } from "react";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Income } from "../../models/Income";
import BackButton from "../../components/utils/backButton/BackButton";
import DeleteElement from "../../components/delete/DeleteElement";
import UpdateIncome from "./components/UpdateIncome";


const api = "http://localhost:8080/api/";

const SingleIncome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [income, setIncome] = useState<Income>({
    id:0,
    amount:0,
    incomeDate:"",
    sourceOfIncome:"",
    typeOfIncome:"",
    description:""
  });
  const [deleting, setDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSingleIncome = async () => {
      try {
        const response = await axios.get(`${api}incomes/${id}`);
        if (JSON.stringify(income) !== JSON.stringify(response.data)) {
          setIncome(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchSingleIncome();
  }, [id, income, open]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}incomes/${id}`);
      navigate(-1);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="income">
      <BackButton />
      <div className="topInfo">
        <h1>Income Details</h1>
      </div>
      <hr />
      <div className="incomeDetails">
        {income &&
          Object.entries(income)
            .filter((item) => item[0] !== "id")
            .map((item, index) => (
              <div className="row" key={index}>
                <div className="rowDetails">
                  <p>
                    {item[0][0].toUpperCase() +
                      item[0]
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}
                  </p>
                  <p className="fetchedDataFromIncome">
                    {typeof item[1] === "number"
                      ? `${item[1].toFixed(2)} zł`
                      : item[1]}
                  </p>
                </div>
              </div>
            ))}
      </div>
      <div className="buttonsSection">
        <button onClick={() => setDeleting(true)}>Delete</button>
        <button onClick={() => setOpen(true)}>Update</button>
      </div>
      {deleting && (
        <DeleteElement setDeleting={setDeleting} handleDelete={handleDelete} />
      )}
      {open && <UpdateIncome income={income} setOpen={setOpen}/>}
     
    </div>
  );
};

export default SingleIncome;
