import React, { ChangeEventHandler } from 'react';

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  type?: string;
  id?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label, value = '', onChange, type = 'text', id,
  } = props;

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const input = <input id={id} type={type} value={value} onChange={onInputChange} />;

  if (label) {
    return (
      <label>
        {label}
        {input}
      </label>
    );
  }

  return input;
};

export default Input;
