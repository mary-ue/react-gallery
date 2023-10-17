import s from './Like.module.css';
import { ReactComponent as LikeIcon } from './img/like.svg';

export const Like = ({ likes }) => {


  return (
    <button className={s.button}>
      <LikeIcon className={s.likesIcon} />
      <div className={s.likesCount}>{likes}</div>
    </button>
  );
};