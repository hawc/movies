import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from 'pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route index element={<Movies />} />
        <Route path="/movie/:slug" element={<Movie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  </BrowserRouter>
);
