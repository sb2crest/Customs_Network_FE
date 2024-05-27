import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  value: string;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  disabled,
  onChange,
  onClick,
  value,
  readOnly,
  maxLength,
}) => {
  return (
    <div className="input_field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        readOnly={readOnly}
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputField;
