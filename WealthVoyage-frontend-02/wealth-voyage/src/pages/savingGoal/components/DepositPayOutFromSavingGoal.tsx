import React, { useState, useEffect } from "react";
import "../components/updateSavingGoal.scss";
import { UserSavingGoal } from "../../../models/UserSavingGoal";
import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";
const api = "http://localhost:8080/api/";

type Props = {
  savingGoal: UserSavingGoal;
  setIsDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPayOut: React.Dispatch<React.SetStateAction<boolean>>;
  isDeposit: boolean;
  isPayOut: boolean;
};

const DepositFromSavingGoal = (props: Props) => {
  const [money, setMoney] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedSavingGoal: UserSavingGoal = {
      ...props.savingGoal,
      amountSaved:
        props.savingGoal.amountSaved +
        (props.isDeposit ? money : props.isPayOut ? -money : 0),
    };

    axios
      .put(`${api}savingGoals/update/${props.savingGoal.id}`, updatedSavingGoal)
      .then(() => {
        props.setIsDeposit(false);
        props.setIsPayOut(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <div className="updateSavingGoal">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            props.setIsDeposit(false);
            props.setIsPayOut(false);
          }}
        >
          X
        </span>

        <form onSubmit={handleSubmit}>
          <div className="deposit">
            {props.isDeposit && <h3>Keep it going !!!</h3>}
            {props.isPayOut && <h3>Someday they'll be back 😉</h3>}
            {props.isDeposit && (
              <img src="/more-money.svg" alt="lot of money" />
            )}
            {props.isPayOut && (
              <img src="/money-wings.svg" alt="flaying out money" />
            )}
            {props.isDeposit && <label>Specify amount of deposit</label>}
            {props.isPayOut && <label>Specify amount of pay out</label>}
            <input
              type="number"
              name="money"
              value={money}
              min={0}
              max={
                props.isDeposit
                  ? props.savingGoal.savingGoalAmount -
                    props.savingGoal.amountSaved
                  : props.savingGoal.amountSaved
              }
              onChange={(e) => setMoney(Number(e.target.value))}
            />
          </div>
          {props.isDeposit && <button>Deposit</button>}
          {props.isPayOut && <button>Pay out</button>}
        </form>
      </div>
    </div>
  );
};

export default DepositFromSavingGoal;
