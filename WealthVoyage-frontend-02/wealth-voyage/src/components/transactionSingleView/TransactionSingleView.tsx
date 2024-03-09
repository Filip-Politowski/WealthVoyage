import React from "react";
import "./transactionSingleView.scss";

type Props = {
  transaction: object;
};
//  amount: 6000,
//   transactionType: "income",
//   category: "salary",
//   date: "2022-01-01",
const TransactionSingleView = (props: Props) => {
  return (
    <div className="transactionSingleView">
      <div className="topInfo">
        <h1>Transaction Details</h1>
        <img src="/transaction2.svg" alt="" />
      </div>
      <div className="transactionDetails">
        {props.transaction &&
          Object.entries(props.transaction)
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

                  {item[0] === "amount" ? (
                    <p
                      style={{
                        background:
                          item[1] > 0 ? "#02735e" : "rgba(227, 78, 78, 0.524)",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      {item[1]}
                    </p>
                  ) : (
                    <p>{item[1]}</p>
                  )}
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

export default TransactionSingleView;
