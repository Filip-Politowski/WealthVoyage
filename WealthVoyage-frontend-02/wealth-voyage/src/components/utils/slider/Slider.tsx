import React, { useState } from "react";
import "./slider.scss";

type Props = {
  isChecked: boolean;
  handleToggleChange: () => void;
};

const ToggleButton = (props: Props) => {

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleToggleChange}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleButton;
