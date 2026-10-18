import type { FC } from 'react';

import styles from './Button.module.css';

type ButtonType = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  type: ButtonType;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ type, label, disabled, onClick}) => {
  return (
    <button
      className={`${styles.button} ${styles[`button-${type}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
