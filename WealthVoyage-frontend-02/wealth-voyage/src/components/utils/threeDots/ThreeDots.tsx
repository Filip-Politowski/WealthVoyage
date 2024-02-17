import React, { useState } from "react";
import "./threeDots.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThreeDots = (props: Props) => {
  return (
    <div onClick={() => props.setIsOpen(!props.isOpen)} className="dots">
      <div className="dot1"></div>
      <div className="dot2"></div>
      <div className="dot3"></div>
    </div>
  );
};

export default ThreeDots;
