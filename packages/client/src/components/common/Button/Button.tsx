import React from 'react';

type ButtonProps = {
  icon?: string;
  text: string;
  onClick?: () => void;
  type?: 'normal' | 'default' | 'good' | 'error' | 'warning';
  enabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    icon, text, onClick, enabled = true, type = '',
  } = props;

  const onButtonClick = (): void => {
    if (onClick !== undefined) {
      onClick();
    }
  };

  return (
    <button type="button" onClick={onButtonClick} disabled={!enabled} className={type}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
