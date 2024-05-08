import React from 'react';
import "./payButtonWindow.scss";

type Props = {
  setPaying: React.Dispatch<React.SetStateAction<boolean>>;
  handlePay: () => void;
};

const PayButtonWindow = (props:Props) => {
  return (
    <div className="payButtonWindow">
      <div className="modal">
        <span className="close" onClick={() => props.setPaying(false)}>
          X
        </span>
        <h2>
          Do you want to pay instalment ?
        </h2>
        <div className="payingButtons">
          <button
            onClick={() => props.setPaying(false)}
            className="payButton"
          >
            No
          </button>
          <button onClick={props.handlePay}>yes</button>
        </div>
      </div>
    </div>
  );
}

export default PayButtonWindow
