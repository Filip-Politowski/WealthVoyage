import React from 'react'
import SingleViewGoal from "../../components/singleViewGoal/SingleViewGoal"
import { singleGoalDetails } from "../../data";

const SavingGoal = () => {
  return (
    <div className='savingGoal'>
      <SingleViewGoal {...singleGoalDetails} />
    </div>
  )
}

export default SavingGoal
