import React from 'react';

interface SelectFieldProps {
    label: string;
    name: string;
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void;
    value: string;
    disabled?: boolean;
  }

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, onChange, onClick, value, disabled }) => {
  return (
    <div className="select_dropdown">
      <label>{label}</label>
      <select
        name={name}
        onChange={onChange}
        value={value}
        onClick={onClick}
      >
        <option value="" disabled={disabled} selected>
          Select an option
        </option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
