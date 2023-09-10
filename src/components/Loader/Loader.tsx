import { PropsWithChildren } from 'react';
import './Loader.css';

export function Loader({ children }: PropsWithChildren) {
  return (
    <div className='loader'>
      {children} <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}