import './Button.css';
import { ButtonHTMLAttributes } from 'react';

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
};

export function Button({ children, onClick, type = 'button', className = '' }: ButtonType) {
  return (
    <button className={`form-button ${className}`} type={type} onClick={onClick}>{children}</button>
  )
}
