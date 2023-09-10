import './FormRow.css';
import { PropsWithChildren } from 'react';

export function FormRow({ children }: PropsWithChildren) {
  return (
    <div className='form-row'>
      {children}
    </div>
  )
}
