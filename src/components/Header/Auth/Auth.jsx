import s from './Auth.module.css';
import { urlAuth } from '../../../api/auth';
import { ReactComponent as Login } from './../img/login.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NoPhoto } from './img/avatar.svg';
import { useState } from 'react';
import { removeToken } from '../../../store/token/tokenSlice';
import { removeUserData } from '../../../store/user/userSlice';

// http://localhost:3000/?code=nHj_8ejuG-PPW2whnajpKDSamzCvopO2V5ZfiN7bMe4

export const Auth = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const userName = useSelector(state => state.userReducer.data.name);
  const userImg = useSelector(state => state.userReducer.data.img);

  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    setShowLogoutBtn(false);
    localStorage.removeItem('bearer');
    dispatch(removeToken());
    localStorage.removeItem('userInfo');
    dispatch(removeUserData());
  };

  return (
    <div className={s.authWrapper}>
      {
        userName ? (
          <>
            <p className={s.userName}>{userName}</p>
            <button
              className={s.userBtn}
              onClick={() => setShowLogoutBtn(!showLogoutBtn)}
            >
            {
              userImg ? (
                <img 
                className={s.userImg}
                src={userImg}
                alt={userName}
                width={36}
                height={36}
              />
              ) : (
                <NoPhoto className={s.noPhoto} width={36} height={36} />
              )
            }
            </button>
              {showLogoutBtn &&
              <button
                className={s.logoutBtn}
                onClick={handleLogoutBtn}
              >
                Выйти
              </button>
            }
          </>
        ) : (
          <a className={s.loginLink} href={urlAuth}>
            <Login className={s.loginSvg} width={32} height={32} />
          </a>
        )
      }
    </div>
  );
};