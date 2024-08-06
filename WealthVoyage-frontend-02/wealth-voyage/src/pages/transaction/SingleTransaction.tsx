import { useNavigate, useParams } from "react-router-dom";
import "./transaction.scss";

import { useEffect, useState } from "react";
import { handleError } from "../../helpers/ErrorHandler";
import axios from "axios";
import { Transaction } from "../../models/Transaction";
import BackButton from "../../components/utils/backButton/BackButton";

const api = "http://localhost:8080/api/";

const SingleTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction>({
    amount: 0,
    transactionCategory: "",
    date: "",
    id: 0,
    transactionType: "",
  });


  useEffect(() => {
    const fetchSingleTransaction = async () => {
      try {
        const response = await axios.get(`${api}transactions/${id}`);
        if (JSON.stringify(transaction) !== JSON.stringify(response.data)) {
          setTransaction(response.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchSingleTransaction();
  }, [id, transaction]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}transactions/${id}`);
      navigate(-1);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="transaction">
      <BackButton />
      <div className="topInfo">
        <h1>Transaction Details</h1>
      </div>
      <hr />
      <div className="transactionDetails">
        {transaction &&
          Object.entries(transaction)
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
                  <p className="fetchedDataFromTransaction">
                    {typeof item[1] === "number"
                      ? `${item[1].toFixed(2)} zł`
                      : item[1]}
                  </p>
                </div>
              </div>
            ))}
      </div>
      <div className="buttonsSection">
      
      </div>
    </div>
  );
};

export default SingleTransaction;
