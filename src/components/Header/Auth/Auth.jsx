import s from './Auth.module.css';
import { urlAuth } from '../../../api/auth';
import { ReactComponent as Login } from './../img/login.svg';
import { useSelector } from 'react-redux';


// http://localhost:3000/?code=nHj_8ejuG-PPW2whnajpKDSamzCvopO2V5ZfiN7bMe4

export const Auth = () => {
  const token = useSelector(state => state.tokenReducer.token);

  return (
    <div className={s.authWrapper}>
      {
        token ? (
          token
        ) : (
          <a className={s.loginLink} href={urlAuth}>
            <Login className={s.loginSvg} width={32} height={32} />
          </a>
        )
      }
    </div>
  );
};