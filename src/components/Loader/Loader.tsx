import './Loader.css';
import type { PropsWithChildren } from 'react';

export function Loader({ children }: PropsWithChildren) {
  return (
    <div className='loader'>
      {children} <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}