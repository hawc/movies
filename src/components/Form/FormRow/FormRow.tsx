import './FormRow.css';
import type { PropsWithChildren } from 'react';

export function FormRow({ children }: PropsWithChildren) {
  return (
    <div className='form-row'>
      {children}
    </div>
  )
}
