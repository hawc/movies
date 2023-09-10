import './App.css';
import { PropsWithChildren } from 'react';
import { Button } from 'components/Form/Button/Button';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export function App({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='app-title'>
          <Link to='/'>MovieFinder.</Link>
        </div>
        <div className='app-header-links'>
          {location.pathname.includes('/movie/') && (
            <Button onClick={() => navigate(-1)}>back</Button>
          )}
        </div>
      </header>
      <main className='app-main'>
        {children}
      </main>
      <footer className='app-footer'>
        You want more movies? Check out <Link to='https://www.rottentomatoes.com/browse/movies_in_theaters/' target='_blank' rel='noopener'>your local cinema</Link>!
      </footer>
    </div>
  );
}
