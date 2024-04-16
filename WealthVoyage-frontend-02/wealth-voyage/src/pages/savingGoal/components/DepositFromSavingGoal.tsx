import React, { useState, useEffect } from "react";
import "../components/updateSavingGoal.scss";
import { UserSavingGoal } from "../../../models/UserSavingGoal";
import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  savingGoal: UserSavingGoal;
  setIsDeposit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DepositFromSavingGoal = (props: Props) => {
  const [savingGoal, setSavingGoal] = useState<UserSavingGoal>(
    props.savingGoal
  );
  const [deposit, setDeposit] = useState<number>(0);
  console.log(savingGoal);
  useEffect(() => {
    setSavingGoal((prevData) => ({
      ...prevData,
      amountSaved: props.savingGoal.amountSaved + deposit,
    }));
  }, [deposit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(`${api}savingGoals/update/${savingGoal.id}`, savingGoal)
      .then(() => {
        props.setIsDeposit(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="updateSavingGoal">
      <div className="modal">
        <span className="close" onClick={() => props.setIsDeposit(false)}>
          X
        </span>

        <form onSubmit={handleSubmit}>
          <div className="deposit">
            <h3>Keep it going !!!</h3>
            <img src="/more-money.svg" alt="lot of money" />
            <label>Specify amount of payment</label>
            <input
              type="number"
              name="deposit"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
          </div>
          <button>Deposit</button>
        </form>
      </div>
    </div>
  );
};

export default DepositFromSavingGoal;
