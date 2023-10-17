import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { photosRequestAsync } from "../../store/photos/photosAction";
import s from './Main.module.css';

export const Main = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(photosRequestAsync(30));
  }, [dispatch]);

  return (
    <div className={s.photosWrapper}>
      
    </div>
  );
};
