import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { Root } from './components/Root/Root';
import { Main } from './components/Main/Main';
import { PhotoPage } from './components/PhotoPage/PhotoPage';
import { AuthRequest } from './components/Header/Auth/AuthRequest/AuthRequest';
import { useEffect } from 'react';
import { setTokenFromLS } from './store/token/tokenSlice';
import { userRequestAsync } from './store/user/userAction';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);

  useEffect(() => {
    if (localStorage.getItem('bearer')) {
      dispatch(setTokenFromLS(localStorage.getItem('bearer')));
      dispatch(userRequestAsync(localStorage.getItem('bearer')));
    } else if (token) {
      dispatch(userRequestAsync(token));
    }
  }, [dispatch, token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Main />} />
          <Route path='photo/:id' element={<PhotoPage />} />
          <Route path='auth/*' element={<AuthRequest />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
