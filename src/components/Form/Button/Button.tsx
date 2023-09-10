import './Button.css';
import { ButtonHTMLAttributes } from 'react';

export function Button({ children, onClick, type = 'button', className = '' }: { onClick: () => void } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`form-button ${className}`} type={type} onClick={onClick}>{children}</button>
  )
}
