import './App.css';
import { Button } from 'components/Form/Button/Button';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function App({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='app-title'>
          <Link to="/">MovieFinder.</Link>
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
        You want more movies? Check out your local Cinema®!
      </footer>
    </div>
  );
}

export default App;
