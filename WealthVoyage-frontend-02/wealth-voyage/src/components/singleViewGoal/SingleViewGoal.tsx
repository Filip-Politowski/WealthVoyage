import React from 'react'
import ProgressBar from '../utils/progressBar/ProgressBar';
import  "./singleViewGoal.scss"


type Props = {
  id: number;
  savingGoalName: string;
  savingGoalAmount: number;
  amountSaved: number;
  savingsProgression: number;
  
};


const SingleViewGoal = (props: Props) => {
  return (
    <div className="singleViewGoal">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="/car.svg" alt="" />
            <h1>{props.savingGoalName}</h1>
            <button>Edit</button>
          </div>
          <div className="details">
            <h1>Goal details:</h1>

            <p>Target: {props.savingGoalAmount}</p>
            <p>Amount saved: {props.amountSaved} zł</p>
            <p>Savings progression: {props.savingsProgression}%</p>
          </div>
        </div>
        <hr />
        <div className='progressContainer'>
          <div className="progressDetails">
            <ProgressBar percentage={50} color="rgb(91, 119, 145)" />
            <span>Goal progress</span>
          </div>
        </div>

        <div className="buttonsSection">
          <button>Deposit</button>
          <button>Pay out</button>
        </div>
      </div>
    </div>
  );
}

export default SingleViewGoal
