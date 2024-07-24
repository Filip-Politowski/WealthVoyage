import React, { useEffect, useState } from "react";
import "./checkBox.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  id: number;
  onChange: (id: number, checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  id,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onChange(id, newChecked);
  };

  return (
    <label
      className="checkbox"
      style={isChecked ? { textDecoration: "line-through" } : {}}
    >
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {label}
    </label>
  );
};

export default Checkbox;
