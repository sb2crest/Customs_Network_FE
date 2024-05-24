import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  value: string | number | null;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, disabled, onChange, onClick, value ,readOnly,maxLength}) => {
  return (
    <div className="input_field">
      <label>{label}</label>
      <input type={type} value={value !== null ? value : ''} disabled={disabled} onChange={onChange} onClick={onClick} readOnly={readOnly} maxLength={maxLength}/>
    </div>
  );
}

export default InputField;
