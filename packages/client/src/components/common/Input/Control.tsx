import React, { ChangeEventHandler } from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';

type FullControlProps= React.PropsWithChildren<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>;

type ControlProps<T extends string | string[] | number = string> =
Omit<FullControlProps, 'value' | 'onChange'> &
{
  value?: T;
  onChange?: (newValue: T) => void;
}

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

const Control: React.FC<ControlProps> = (props) => {
  const { onChange } = props;


  const onControlChange: ChangeEventHandler<FormControlElement> = (event) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  const formProps = props as FullControlProps;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormControl {...formProps} onChange={onControlChange} />;
};

export default Control;
