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
import { setUserDataFromLS } from './store/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);

  useEffect(() => {
    if (localStorage.getItem('bearer')) {
      dispatch(setTokenFromLS(localStorage.getItem('bearer')));
    } 

    if (localStorage.getItem('userInfo') && localStorage.getItem('bearer')) {
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      dispatch(setUserDataFromLS(userInfo)); 
    } else {
      dispatch(userRequestAsync(token));
    }
  }, [dispatch, token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Main />} />
          <Route path='photos/:id' element={<PhotoPage />} />
          <Route path='auth/*' element={<AuthRequest />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
