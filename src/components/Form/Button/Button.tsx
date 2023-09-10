import './Button.css';

export function Button({ children, onClick, type = 'button', className = '' }: { onClick: () => void } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`form-button ${className}`} type={type} onClick={onClick}>{children}</button>
  )
}
