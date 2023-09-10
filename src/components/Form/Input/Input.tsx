import './Input.css';

interface InputType {
  onChange: (value: string) => void;
  onEnter: () => void;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder: string;
}

function Input({ onChange, onEnter, type = 'text', value = '', placeholder = '' }: InputType) {
  const handleSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  return (
    <input
      className="form-input"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.currentTarget.value)}
      onKeyUp={handleSubmit} />
  )
}

export {
  Input
}