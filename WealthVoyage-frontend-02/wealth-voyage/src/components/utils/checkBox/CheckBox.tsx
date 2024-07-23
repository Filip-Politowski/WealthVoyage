// Checkbox.tsx
import React, { useState } from "react";
import "./checkBox.scss";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
 
  const [isChecked, setIsChecked] = useState<boolean>(checked);

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {label}
    </label>
  );
};

export default Checkbox;
