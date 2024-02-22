import React from "react";
import SingleView from "../../components/installmentSingleView/InstallmentSingleView";
import { singleTransaction } from "../../data";
import "./transaction.scss";


const transaction = () => {
 
  return (
    <div>
      <SingleView
        id={singleTransaction.id}
        info={singleTransaction}
        title={singleTransaction.category}
      
      />
    </div>
  );
};

export default transaction;
