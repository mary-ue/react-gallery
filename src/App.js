import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { Root } from './components/Root/Root';
import { Main } from './components/Main/Main';
import { PhotoPage } from './components/PhotoPage/PhotoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Main />} />
          <Route path='photo/:id' element={<PhotoPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
