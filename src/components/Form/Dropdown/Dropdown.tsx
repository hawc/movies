import './Dropdown.css';
import type { KeyboardEvent } from 'react';

interface DropdownType {
  onChange: (value: string) => void;
  onEnter: () => void;
  value: string;
  placeholder?: string;
  options: { key: string, value: string }[];
}

export function Dropdown({ onChange, onEnter, value = '', placeholder = '', options = [] }: DropdownType) {
  const handleSubmit = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  return (
    <select
      className={`form-dropdown ${!value ? 'form-dropdown-placeholder' : ''}`}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.currentTarget.value)}
      onKeyUp={handleSubmit}>
      {placeholder && (
        <option value=''>{placeholder}</option>
      )}
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.key}</option>
      ))}
    </select>
  )
}
