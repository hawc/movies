import './Input.css';
import type { HTMLInputTypeAttribute, KeyboardEvent } from 'react';

interface InputType {
  onChange: (value: string) => void;
  onEnter: () => void;
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder: string;
}

export function Input({ onChange, onEnter, type = 'text', value = '', placeholder = '' }: InputType) {
  const handleSubmit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  return (
    <input
      className='form-input'
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.currentTarget.value)}
      onKeyUp={handleSubmit} />
  )
}
