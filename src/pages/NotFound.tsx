import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section>
      <p>
        The page you are looking for doesn't exist.
      </p>
      <p>
        Feel free to start a new search:
      </p>
      <p>
        <Link to="/">Go to movie search</Link>
      </p>
    </section>
  );
}

export default NotFound;
