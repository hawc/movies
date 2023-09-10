import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './components/App/App';
import { Movies } from './pages/Movies';
import { Movie } from './pages/Movie';
import { NotFound } from 'pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route index element={<Movies />} />
        <Route path='/movie/:slug' element={<Movie />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </App>
  </BrowserRouter>
);
