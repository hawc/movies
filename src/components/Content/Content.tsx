import { PropsWithChildren } from 'react';
import './Content.css';

export function Content({ children }: PropsWithChildren) {
  return <div className='content'>{children}</div>;
}