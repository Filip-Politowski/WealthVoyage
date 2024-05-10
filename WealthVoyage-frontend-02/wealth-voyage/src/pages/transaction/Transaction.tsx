
import "./transaction.scss";

import { useState } from "react";



const Transaction = () => {

  const [transaction, setTransaction] = useState();

  return (
    <div className="transaction">
      <div className="topInfo">
        <h1>Transaction Details</h1>
        <img src="/transaction2.svg" alt="" />
      </div>
      <div className="transactionDetails">
        {transaction &&
          Object.entries(transaction)
            .filter((item) => item[0] !== "id")
            .map((item) => (
              <div className="row">
                <div className="rowDetails">
                  <p>
                    {item[0][0].toUpperCase() +
                      item[0]
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}
                    :
                  </p>

                
                </div>
                <hr />
              </div>
            ))}
      </div>
      <div className="buttonsSection">
        <button>Delete</button>
        <button>Update</button>
      </div>
    </div>
  );
};

export default Transaction;
