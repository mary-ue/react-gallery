import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tokenRequestAsync } from "../../../../store/token/tokenAction";

export const AuthRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
      if (window.location.pathname.includes('auth')) {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        console.log(code);
      } else {
        console.log('Параметр "code" не найден в URL.');
        return;
      }
      dispatch(tokenRequestAsync(code));
      navigate('/');
    }

  }, [dispatch, navigate])

  return (
    <h2>Please, wait...</h2>
  );
};