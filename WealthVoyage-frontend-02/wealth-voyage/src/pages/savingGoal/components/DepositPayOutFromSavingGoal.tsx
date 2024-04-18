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
  const [money, setMoney] = useState<any>();
  const [error, setError] = useState<string>("");
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

  const handleInvalidInput = (e: any) => {
    if (props.isDeposit) {
      if (props.savingGoal.savingGoalAmount === 0) {
        setError("");
      } else {
        setError(
          e.target.value >
            props.savingGoal.savingGoalAmount - props.savingGoal.amountSaved
            ? `You can't deposit more than your stated savings goal.`
            : ""
        );
      }
    }
    if (props.isPayOut) {
      if (props.savingGoal.amountSaved === 0) {
        setError(`You have 0 saved money, you cannot payout them.`);
      } else if (e.target.value > props.savingGoal.amountSaved) {
        setError(`You have not enough money to pay out.`);
      } else {
        setError("");
      }
    }
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
            {props.isDeposit && (
              <>
                <h3>Keep it going !!!</h3>
                <img src="/more-money.svg" alt="lot of money" />
                <label>Specify amount of deposit</label>
                <input
                  type="number"
                  name="money"
                  value={money}
                  min={0}
                  max={
                    props.savingGoal.savingGoalAmount > 0
                      ? props.savingGoal.savingGoalAmount
                      : Number.MAX_VALUE
                  }
                  onChange={(e) => setMoney(Number(e.target.value))}
                  onInput={handleInvalidInput}
                  onInvalid={(e) => e.preventDefault()}
                />
              </>
            )}
            {props.isPayOut && (
              <>
                <h3>Someday they'll be back 😉</h3>
                <img src="/money-wings.svg" alt="flaying out money" />
                <label>Specify amount of pay out</label>
                <input
                  type="number"
                  name="money"
                  value={money}
                  min={0}
                  max={props.savingGoal.amountSaved}
                  onChange={(e) => setMoney(Number(e.target.value))}
                  onInput={handleInvalidInput}
                  onInvalid={(e) => e.preventDefault()}
                />
              </>
            )}
            {error && <span className="wrongSavingInput">{error}</span>}
          </div>
          {props.isDeposit && <button>Deposit</button>}
          {props.isPayOut && <button>Pay out</button>}
        </form>
      </div>
    </div>
  );
};

export default DepositFromSavingGoal;
