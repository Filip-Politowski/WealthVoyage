import React, { useState } from "react";
import "./currency.scss";

const Currency = (props: { exchangeRate: number; currency: string; date: string ; img:string; code:string}) => {
  const roundToTwoDecimalPlaces = (value: number) => {
    return parseFloat(value.toFixed(2));
  };

  const [plnValue, setPlnValue] = useState<number>(1);
  const [otherCurrency, setOtherCurrency] = useState<number>(
    roundToTwoDecimalPlaces(1 / props.exchangeRate)
  );

  const handlePlnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const roundedPlnValue = roundToTwoDecimalPlaces(value);
    setPlnValue(roundedPlnValue);
    setOtherCurrency(roundToTwoDecimalPlaces(roundedPlnValue / props.exchangeRate));
  };

  const handleEuroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const roundedEuroValue = roundToTwoDecimalPlaces(value);
    setOtherCurrency(roundedEuroValue);
    setPlnValue(roundToTwoDecimalPlaces(roundedEuroValue * props.exchangeRate));
  };

  return (
    <div className="currencyBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.img} alt="" />
          <span>{props.currency} rate</span>
        </div>
        <div className="currency">
          <span>Amount in PLN</span>
          <div className="currencyInput">
            <input
              type="number"
              value={plnValue}
              onChange={handlePlnChange}
              min={0}
              step="0.01"
            />
            <p>PLN</p>
          </div>
        </div>
        <div className="currency">
          <span>Amount in {props.currency}</span>
          <div className="currencyInput">
            <input
              type="number"
              value={otherCurrency}
              onChange={handleEuroChange}
              min={0}
              step="0.01"
            />
            <p>{props.code}</p>
          </div>
          <p style={{ color: "gray" }}>Exchange rates on </p>
          <p style={{ color: "gray" }}>{props.date}</p>
          <p style={{ color: "gray", fontSize:"small", textAlign: "center"}}>
            Rate calculated on the basis of data from the NBP
          </p>
        </div>
      </div>
    </div>
  );
};

export default Currency;
